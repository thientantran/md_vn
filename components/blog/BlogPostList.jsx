import BlogPost from "./BlogPost";

export default function BlogPostList() {
  return (
    <div className="flex-[5]">
      <div className="text-xl md:text-4xl font-semibold">
        News
      </div>
      <BlogPost/>
      <BlogPost/>
      <BlogPost/>
      <BlogPost/>
    </div>
  )
}
