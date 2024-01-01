import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const post = await prismadb.post.create({
      data: {
        ...body,
        userEmail: session.user.email
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(["CREATE_POST", error])
    return new NextResponse("Internal Error", { status: 500 })
  }
}