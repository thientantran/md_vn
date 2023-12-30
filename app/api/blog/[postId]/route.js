import prismadb from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req,{params}) {
  try {
    const session = await getServerSession(authOptions)
    if(!session){
      return new NextResponse("Unauthorized", {status:401})
    }
    const post = await prismadb.post.findUnique({
      where: {
        id: params.postId
      },
      include: {
        category: true,
        user: true,
        comments: {
          include: {
            user: true
          }
        }
      }
    });
    return NextResponse.json(post)
  } catch (error) {
    console.log(["GET_POSTS", error])
    return new NextResponse("Internal Error", {status:500})
  }
}

export async function DELETE(
  req,
  {params}
){
  try {
    const session = await getServerSession(authOptions)
    if(!session) {
      return new NextResponse("Unauthorized", {status:401})
    }
    const post = await prismadb.post.findUnique({
      where: {
        id: params.postId,
        userEmail: session.user?.email
      },
    })
    if(!post){
      return new NextResponse("Not found", {status:404})
    }

    const deletedPost = await prismadb.post.delete({
      where: {
        id: params.postId
      }
    })

    return NextResponse.json(deletedPost)
  } catch (error) {
    console.log("[POST_ID_DELETE]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}

export async function PATCH(req, {params}){
  try {
    const session = await getServerSession(authOptions)

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