import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function BlogPost() {
  return (
      <div className="max-w-5xl px-2 sm:px-4 md:px-6 lg:px=8 my-1 md:my-4 py-3 sm:py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm font-light text-gray-600">December 14, 2023</span>
          <Button variant='ghost'  className="px-2 py-1 border font-bold text-xs md:text-sm">Cardiology</Button>
        </div>
        <div className="mt-2 flex sm:gap-x-3">
          <div className="sm:flex-[3] md:flex-[1] lg:flex-[1] relative">
            <Image src='https://img.medscapestatic.com/vim/live/professional_assets/medscape/images/thumbnail_library/is_231213_asthma_cough_800x450.jpg' alt="postimage" fill className="rounded-md object-cover"/>
          </div>
          <div className="sm:flex-[5]  md:flex-[5] lg:flex-[4]">
            <Link className="text-base md:text-xl font-semibold text-gray-700 hover:text-gray-600" href="/blog">How Should We Treat GERD Associated With a Chronic Cough?</Link>
            <p className="mt-2 text-xs md:text-sm text-gray-600">Sabine Roman, MD, PhD, associate professor of gastroenterology and physiology at Lyon University Hospital in France, took the floor at the United European Gastroenterology Week to discuss the link between a chronic cough and gastroesophageal reflux disease (GERD)...</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <a className="text-blue-600 hover:underline text-xs md:text-sm" href="#">Read more</a>
          <div className="flex items-center" >
            <div className="h-6 w-6 md:h-10 md:w-10 relative">
              <Image src="https://github.com/shadcn.png" alt="avatar" fill className="rounded-full object-cover"/>
            </div>
            

            <h1 className="ml-4 text-xs sm:text-sm md:text-base text-gray-700 font-bold">Thiên Tân Trần</h1>
          </div>
        </div>
      </div>
  )
}
