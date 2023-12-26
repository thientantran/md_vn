
import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";


// tutorial: https://docs.uploadthing.com/nextjs/appdir
const f = createUploadthing();

const handleAuth = () => {
  const session = getServerSession(authOptions)
  if(!session) throw new Error("Unauthorized")
  return session.user
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage : f({image: {maxFileSize:'4MB', maxFileCount:1}})
    .middleware(()=> handleAuth())
    .onUploadComplete(()=>{}),
  courseAttachment: f(['text','image','video','audio','pdf']).middleware(()=>handleAuth()).onUploadComplete(()=>{}),
  chapterVideo: f({video: {maxFileCount:1, maxFileSize:'512GB'}}).middleware(()=>handleAuth()).onUploadComplete(()=> {})
} ;
