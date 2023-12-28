import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await prismadb.comment.update({
      where: {
        id: params.commentId,
        userEmail: session.user.email,
      },
      data: {
        ...body
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log(["CREATE_COMMENT", error]);
    return new NextResponse("Internal Error", { status: 500 });
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
    const comment = await prismadb.comment.findUnique({
      where: {
        id: params.commentId,
        userEmail: session.user?.email
      },
    })
    if(!comment){
      return new NextResponse("Not found", {status:404})
    }

    const deletedComment = await prismadb.comment.delete({
      where: {
        id: params.commentId
      }
    })

    return NextResponse.json(deletedComment)
  } catch (error) {
    console.log("[COMMENT_ID_DELETE]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}