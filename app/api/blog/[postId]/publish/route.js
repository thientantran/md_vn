import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function PATCH(
  req,
  {params}
){
  try {
    const session = await getServerSession(authOptions)
    if(!session){
      return new NextResponse("Unauthorized", {status:401})
    }

    const post = await prismadb.post.update({
      where:{
        id: params.postId,
        userEmail: session.user?.email
      },
      data: {
        isPublished: true
      }
    })

    if(!post) {
      return new NextResponse("Unauthorized", {status:401 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.log("[POST_UNPUBLISH]", error)
    return new NextResponse("Internal Error", {status:500})
  }
}