'use client'
import UserMenu from "@/components/UserMenu";
import { routes } from "@/constants/blogMenu";
import Image from "next/image";
import BlogMenuItem from "./BlogMenuItem";
import BlogMobileSidebar from "./BlogMobileSidebar";

export default function BlogNavbar() {
  return (
    <div className="p-4 max-w-screen-xl mx-auto h-full flex justify-between items-center bg-white shadow-sm">
      <BlogMobileSidebar/>
      <div>
        <Image height={130} width={130} alt="logo" src='/logo.svg'/>
      </div>
      <div className="justify-between hidden md:flex md:w-auto" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {
            routes.map((route) => (
              <li key={route.label}>
                <BlogMenuItem label={route.label} href={route.href}/>
              </li>
            ))
          }
          {/* <li>
            <Link href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
          </li>
          <li>
            <Link  href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
          </li>
          <li>
            <Link href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
          </li>
          <li>
            <Link href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
          </li> */}
        </ul>
      </div>
      <div>
      <UserMenu/>
      </div>
    </div>
  )
}
