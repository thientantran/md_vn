import BlogCategories from "@/components/blog/BlogCategories"
import BlogPostList from "@/components/blog/BlogPostList"

export default function page() {
  const categories = ["All", "Cardiology", "Diabetes & Endocrinology", "Neruology", "Psychiatry", "Other"]
  return (
    <div className="p-4">

      <BlogCategories categories={categories} />
      <div className="flex gap-x-10 mt-[30px]">
        <BlogPostList />
      </div>
    </div>
  )
}
