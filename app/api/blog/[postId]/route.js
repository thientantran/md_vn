import prismadb from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function PATCH(req, {params}){
  try {
    const session = await getServerSession(authOptions)

    console.log(session)
    if(!session){
      return new NextResponse("Unauthorized", {status:401})
    }
    const body = await req.json()
    const {postId} = params

    const post = await prismadb.post.update({
      where: {
        id: postId,
        userEmail: session.user.email
      },
      data: {
        ...body
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log("[POST_UPDATE]: ", error)
    return new NextResponse("Internal Error", {status:500})
  }
}