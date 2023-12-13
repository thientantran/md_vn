'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from "next/navigation"
export default function BlogMenuItem({label, href}) {
  const pathname = usePathname()
  const isActive = (pathname === "/" && href==="/") || pathname === href || pathname?.startsWith(`${href}/`)
  const router = useRouter()
  const onClick = () => {
    router.push(href);
  }
  return (

    <button onClick={onClick} className={cn("block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0", isActive && "text-white bg-blue-700 md:bg-transparent md:text-blue-700")} >{label}</button>
  )
}
