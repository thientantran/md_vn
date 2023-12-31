'use client'
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

export default function BlogSearchInput() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  const router = useRouter()
  const pathname = usePathname()

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
        page: 1,
      }
    }, { skipEmptyString: true, skipNull: true })
    router.push(url)
  }, [debouncedValue, currentCategoryId, router, pathname])
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full md:w-[50%] mx-auto">
        <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
        <Input onChange={(e) => setValue(e.target.value)} value={value} placeholder="Type the news that you want to find..." className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" />
      </div>
    </div>
  )
}