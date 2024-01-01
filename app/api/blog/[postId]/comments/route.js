import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prismadb from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const comment = await prismadb.comment.create({
      data: { ...body, userEmail: session.user.email, postId: params.postId },
    })
    return NextResponse.json(comment)
  } catch (error) {
    console.log(["CREATE_COMMENT", error])
    return new NextResponse("Internal Error", { status: 500 })
  }
}