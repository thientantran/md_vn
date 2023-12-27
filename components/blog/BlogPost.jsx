import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function extractTextFromHTML(htmlString) {
  const dom = new JSDOM(htmlString);
  return dom.window.document.body.textContent || "";
}
export default function BlogPost({post}) {
  const date = new Date(post.createdAt);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const textContent = extractTextFromHTML(post.desc).substring(0, 1000);
  return (
      <div className="px-2 sm:px-4 md:px-6 lg:px=8 my-1 md:my-4 py-3 sm:py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm font-light text-gray-600">{formattedDate}</span>
          <Button variant='ghost'  className="px-2 py-1 border font-bold text-xs md:text-sm">{post.category?.name}</Button>
        </div>
        <div className="mt-2 flex sm:gap-x-3">
          <div className="sm:flex-[3] md:flex-[1] lg:flex-[1] relative">
            <Image src={post.img} alt="postimage" fill className="rounded-md object-cover"/>
          </div>
          <div className="sm:flex-[5]  md:flex-[5] lg:flex-[4]">
            <Link className="text-base md:text-xl font-semibold text-gray-700 hover:text-gray-600" href="/blog">{post.title}</Link>
            <p className="mt-2 text-xs md:text-sm text-gray-600 line-clamp-3">{textContent}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <a className="text-blue-600 hover:underline text-xs md:text-sm" href="#">Read more</a>
          <div className="flex items-center" >
            <div className="h-6 w-6 md:h-10 md:w-10 relative">
              <Image src={post.user?.image ||"https://github.com/shadcn.png"} alt="avatar" fill className="rounded-full object-cover"/>
            </div>

            <h1 className="ml-4 text-xs sm:text-sm md:text-base text-gray-700 font-bold">{post.user?.name}</h1>
          </div>
        </div>
      </div>
  )
}
