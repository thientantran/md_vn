import ConfettiProvider from "@/components/ConfettiProvider";
import Sidebar from "@/components/Sidebar";
import ToastProvider from "@/components/ToastProvider";
import BlogNavbar from "@/components/blog/BlogNavbar";

export default function layout({ children }) {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 w-full z-50 h-[80px] border-b">
        {/* <div className="fixed inset-y-0 w-full z-50 h-[80px] border-b md:pl-56"> */}
        <BlogNavbar />
      </div>
      <div className="hidden h-full flex-col fixed inset-y-0 z-50 md:flex">
        <Sidebar />
      </div>
      <main className='pt-[80px] md:pl-56 h-full'>
        <ConfettiProvider />
        <ToastProvider />
        {children}
      </main>
    </div>
  )
}
