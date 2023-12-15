import Image from "next/image";
import Link from "next/link";

export default function BlogMenuPost() {
  return (
    <div className="px-2 my-2 py-3 bg-white">
        <div className="mt-2 flex items-center gap-x-3">
          <div className="hidden lg:block lg:flex-[1] aspect-square relative">
            <Image src='https://img.medscapestatic.com/vim/live/professional_assets/medscape/images/thumbnail_library/is_231213_asthma_cough_800x450.jpg' alt="postimage" fill className="rounded-full object-cover"/>
          </div>
          <div className="flex-[4]">
            <div className="flex items-center mb-1">
              <button className="border px-2 py-2 rounded-full bg-sky-700 text-primary-foreground hover:bg-sky-700/90 text-[6px] md:text-[10px]">Cardiology</button>
            </div>
            <Link className="text-[12px] md:text-sm text-gray-700 font-bold hover:text-gray-600" href="/blog">How Should We Treat GERD Associated With a Chronic Cough?</Link>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center" >
                <span className="font-light text-[6px] md:text-[10px] text-gray-600">December 14, 2023</span>
                <span className="ml-2"> - </span>
                <h1 className="ml-2 text-gray-700 text-[6px] md:text-[10px] font-bold">Thiên Tân Trần</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
