import Image from "next/image";

export default function BlogFeature() {
  return (
    <div className='mt-[30px]'>
      <div className='mt-4 flex gap-x-12 items-center'>
        <div className='h-[400px] hidden md:flex flex-auto relative'>
          <Image fill className="rounded-md object-cover" src="https://img.medscapestatic.com/vim/live/professional_assets/medscape/images/thumbnail_library/is_231213_asthma_cough_800x450.jpg?interpolation=lanczos-none&resize=300:*" alt="" />
        </div>
        <div className='flex flex-[2] flex-col gap-[20px]'>
          <h1 className='text-xl md:text-2xl lg:text-4xl'>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
          <p className='text-sm md:text-xl lg:text-[20px] border-none rounded-md'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button className='px-1 py-2 md:py-4 border bg-gray-300 md:px-5 rounded-md w-max hover:bg-gray-200 transition-all duration-500'>Read More</button>
        </div>
      </div>
      <hr className="mt-[20px]"/>
    </div>
  )
}
