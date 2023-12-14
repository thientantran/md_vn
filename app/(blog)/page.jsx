import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeature from "@/components/blog/BlogFeature";
import BlogMenu from "@/components/blog/BlogMenu";
import BlogPostList from "@/components/blog/BlogPostList";

export default function page() {
  const categories = ["All", "Cardiology","Diabetes & Endocrinology", "Neruology", "Psychiatry", "Other"]
  return (
   <div className="p-4">
    <h1 className='mb-[30px] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light'>
        <b>Hey, MedscapeVN here!</b> Read about News about medicine and pharmacy.
      </h1>
      <hr />
    <BlogCategories categories={categories}/>
    <BlogFeature/>
    
    <div className="flex gap-x-10 mt-[30px]">
      <BlogPostList/>
      <BlogMenu/>
    </div>
   </div>
  )
}
