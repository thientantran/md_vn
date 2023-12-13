import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import BlogSidebar from "./BlogSidebar";
export default function BlogMobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu/>
      </SheetTrigger>
      <SheetContent side='left' className="p-0 bg-white">
        <BlogSidebar/>
      </SheetContent>
    </Sheet>
  )
}
