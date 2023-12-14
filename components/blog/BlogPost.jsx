import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function BlogPost() {
  return (
      <div className="max-w-5xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">December 14, 2023</span>
          <Button variant='ghost'  className="px-2 py-1 border font-bold">Cardiology</Button>
        </div>
        <div className="mt-2 flex gap-x-3">
          <div className="sm:flex-[3] lg:flex-[1] relative">
            <Image src='https://img.medscapestatic.com/vim/live/professional_assets/medscape/images/thumbnail_library/is_231213_asthma_cough_800x450.jpg' alt="postimage" fill className="rounded-md object-cover"/>
          </div>
          <div className="sm:flex-[5] lg:flex-[4]">
            <Link className="text-md md:text-xl lg:text-2xl text-gray-700 font-bold hover:text-gray-600" href="/blog">How Should We Treat GERD Associated With a Chronic Cough?</Link>
            <p className="mt-2 text-sm md:text-md text-gray-600">Sabine Roman, MD, PhD, associate professor of gastroenterology and physiology at Lyon University Hospital in France, took the floor at the United European Gastroenterology Week to discuss the link between a chronic cough and gastroesophageal reflux disease (GERD)...</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <a className="text-blue-600 hover:underline text-[12px] md:text-[16px]" href="#">Read more</a>
          <div className="flex items-center" >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="ml-4 text-sm md:text-[16px] text-gray-700 font-bold">Thiên Tân Trần</h1>
          </div>
        </div>
      </div>
  )
}
