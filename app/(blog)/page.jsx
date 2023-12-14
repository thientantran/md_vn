import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeature from "@/components/blog/BlogFeature";
import BlogMenu from "@/components/blog/BlogMenu";
import BlogPostList from "@/components/blog/BlogPostList";

export default function page() {
  const categories = ["All", "Cardiology","Diabetes & Endocrinology", "Neruology", "Psychiatry", "Other"]
  return (
   <div className="p-4">
    <BlogFeature/>
    <BlogCategories categories={categories}/>
    <div className="flex gap-x-10">
      <BlogPostList/>
      <BlogMenu/>
    </div>
   </div>
  )
}
