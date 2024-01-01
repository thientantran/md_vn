'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import FormattedDate from "../FormattedDate";
import Preview from "../Preview";

export default function BlogPostDetail({ post }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div>
      <header className="mb-4 lg:mb-6 not-format">
        <address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <div className="h-16 w-16 relative mr-2">
              <Image src={post.user?.image} alt="postimage" fill className="rounded-full object-cover" />
            </div>
            <div>
              <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{post.user?.name}</a>
              <p className="text-base text-gray-500 dark:text-gray-400">{post.userEmail}</p>
              <p className="text-base text-gray-500 dark:text-gray-400"><time pubdate dateTime="2022-02-08" title="February 8th, 2022"><FormattedDate data={post.createdAt} /></time></p>
            </div>
          </div>
        </address>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{post.title}</h1>
      </header>
      <Preview value={post.desc} />
    </div>

  )
}
