
import { extractTextFromHTML } from "@/lib/functions";
import Image from "next/image";
import Link from "next/link";

export default function BlogFeature({latestPost}) {
  const textContent = extractTextFromHTML(latestPost.desc).substring(0, 1000);
  return (
    <div className='mt-[30px]'>
      <div className='mt-4 flex sm:gap-x-12'>
        <div className="md:flex-[1] sm:flex-[2] relative">
            <Image src={latestPost.img} alt="postimage" fill className="rounded-md object-cover"/>
          </div>
        <div className='flex sm:flex-[5] md:flex-[3] flex-col gap-[20px]'>
          <Link href={`/news/${latestPost.id}`}><h1 className='text-base md:text-xl font-semibold'>{latestPost.title}</h1></Link>
          <Link href={`/news/${latestPost.id}`}>
            <p className='text-xs md:text-sm border-none rounded-md line-clamp-2'>
              {textContent}
            </p>
          </Link>
          <Link href={`/news/${latestPost.id}`} className='px-2 py-1 md:py-2 text-xs md:text-sm  border bg-gray-300 md:px-3 rounded-md w-max hover:bg-gray-200 transition-all duration-500'>Read More</Link>
        </div>
      </div>
      <hr className="mt-[20px]"/>
    </div>
  )
}
