import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeature from "@/components/blog/BlogFeature";
import BlogMenu from "@/components/blog/BlogMenu";
import BlogPostList from "@/components/blog/BlogPostList";
import BlogSearchInput from "@/components/blog/BlogSearchInput";
import { getAllCategories, getAllPublishedPosts, getAllPublishedPostsWithNoParams } from "@/lib/functions";

export default async function page({searchParams}) {
  const posts = await getAllPublishedPosts({...searchParams})
  const allPosts = await getAllPublishedPostsWithNoParams()
  const latestPost = allPosts[0]
  const categories = await getAllCategories()


  return (
   <div className="p-4">
    <h1 className='mb-[30px] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light'>
      <b>Hey, MedscapeVN here!</b> Read News about medicine and pharmacy.
    </h1>
    <hr/>
    <BlogFeature latestPost={latestPost}/>
    <div className="mt-6 w-full flex items-center justify-center">
      <BlogSearchInput/>
    </div>
    <BlogCategories categories={categories}/>
    <div className="flex gap-x-10 mt-6">
      <BlogPostList posts={posts}/>
      <BlogMenu posts={allPosts}/>
    </div>
   </div>
  )
}
