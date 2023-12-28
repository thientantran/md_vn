import BlogPostComment from "@/components/blog/BlogPostComment";
import BlogPostDetail from "@/components/blog/BlogPostDetail";
import { getPostById } from "@/lib/functions";

import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page({params}) {
  const session = await getServerSession()
  console.log(session)
  const postId = params.slug
  const post = await getPostById(postId)
  return (
    <div>
      <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <BlogPostDetail post={post}/>

            {!session ? (
              <div>
                <Link href="/auth" className="text-sky-700">Đăng nhập </Link> để đọc bình luận
              </div>
            ) : (<BlogPostComment post={post}/>)}
            
          </article>
        </div>
      </div>
    </div>
  )
}
