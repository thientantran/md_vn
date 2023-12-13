import BlogNavbar from "@/components/blog/BlogNavbar";
import BlogSidebar from "@/components/blog/BlogSidebar";

export default function layout({children}) {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 w-full z-50 h-[80px] border-b ">
        <BlogNavbar/>
      </div>
      <div className="hidden h-full flex-col fixed inset-y-0 z-50">
        <BlogSidebar/>
      </div>
      <main className='pt-[80px] max-w-screen-2xl mx-auto h-full'>
        {children}
      </main>
    </div>
  )
}
