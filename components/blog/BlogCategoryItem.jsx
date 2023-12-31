'use client'
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

export default function BlogCategoryItem({ category }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get("categoryId")

  const currentTitle = searchParams.get("title")
  const isSelected = currentCategoryId == category.id || currentCategoryId === null && category.name === "All"

  const onClick = () => {
    let newCategoryId = isSelected ? null : category.id;
    if (category.name === "All") {
      newCategoryId = null;
    }
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: newCategoryId,
        page: 1,
      },
    }, { skipNull: true, skipEmptyString: true })
    router.push(url)
  }
  return (
    <button
      type="submit"
      onClick={onClick}
      className={cn('py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition', isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800')}>
      <div className='truncate'>
        {category.name}
      </div>
    </button>
  )
}
