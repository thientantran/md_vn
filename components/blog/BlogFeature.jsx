import Image from "next/image";

export default function BlogFeature() {
  return (
    <div className='mt-[30px]'>
      <div className='mt-4 flex sm:gap-x-12'>
        <div className="md:flex-[1] sm:flex-[2] relative">
            <Image src='https://img.medscapestatic.com/vim/live/professional_assets/medscape/images/thumbnail_library/is_231213_asthma_cough_800x450.jpg' alt="postimage" fill className="rounded-md object-cover"/>
          </div>
        <div className='flex sm:flex-[5] md:flex-[3] flex-col gap-[20px]'>
          <h1 className='text-base md:text-xl font-semibold'>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
          <p className='text-xs md:text-sm border-none rounded-md'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button className='px-2 py-1 md:py-2 text-xs md:text-sm  border bg-gray-300 md:px-3 rounded-md w-max hover:bg-gray-200 transition-all duration-500'>Read More</button>
        </div>
      </div>
      <hr className="mt-[20px]"/>
    </div>
  )
}
