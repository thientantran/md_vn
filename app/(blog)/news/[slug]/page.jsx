import BlogPostComment from "@/components/blog/BlogPostComment";
import BlogPostDetail from "@/components/blog/BlogPostDetail";
import { getPostById } from "@/lib/functions";

export default async function page({params}) {
  const postId = params.slug
  const post = await getPostById(postId)
  console.log(post)
  return (
    <div>
      <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <BlogPostDetail post={post}/>
            <BlogPostComment post={post}/>
          </article>
        </div>
      </div>
    </div>
  )
}
