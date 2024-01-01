import BlogMenuPost from "./BlogMenuPost";

export default function BlogMenuTopic({ posts, title, subtitle }) {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      <h2 className="text-gray-400 text-sm">{subtitle}</h2>
      {posts && posts.map((post) => (
        <BlogMenuPost key={post.id} post={post} />
      ))}
    </div>
  )
}
