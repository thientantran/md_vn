import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeature from "@/components/blog/BlogFeature";
import BlogMenu from "@/components/blog/BlogMenu";
import BlogPostList from "@/components/blog/BlogPostList";
import { getAllPublishedPosts } from "@/lib/functions";

export default async function page() {
  const posts = await getAllPublishedPosts()
  const categories = ["All", "Cardiology","Diabetes & Endocrinology", "Neruology", "Psychiatry", "Other"]
  return (
   <div className="p-4">
    <h1 className='mb-[30px] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light'>
        <b>Hey, MedscapeVN here!</b> Read News about medicine and pharmacy.
      </h1>
      <hr />
    <BlogCategories categories={categories}/>
    <BlogFeature/>
    <div className="flex gap-x-10 mt-[30px]">
      <BlogPostList posts={posts}/>
      <BlogMenu/>
    </div>
   </div>
  )
}
