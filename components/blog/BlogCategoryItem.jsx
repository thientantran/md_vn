
export default function BlogCategoryItem({category}) {
  return (
    <button className='py-2 px-3 text-sm md:text-[16px] border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition'>
      <div className='truncate'>
        {category}
      </div>
    </button>
  )
}
