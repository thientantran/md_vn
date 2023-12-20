import bcrypt from 'bcrypt';

import prismadb from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {

    const { email, name, password } = await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return new NextResponse("Email taken", {status:422})
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log("[CREATE_USER]: ", error)
    return new NextResponse("Internal error", {status:500})
  }
}