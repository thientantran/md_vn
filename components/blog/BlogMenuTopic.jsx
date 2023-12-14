import BlogMenuPost from "./BlogMenuPost";

export default function BlogMenuTopic({title, subtitle}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <h2 className="text-gray-400 text-sm">{subtitle}</h2>
      <BlogMenuPost/>
      <BlogMenuPost/>
      <BlogMenuPost/>
      <BlogMenuPost/>
    </div>
  )
}
