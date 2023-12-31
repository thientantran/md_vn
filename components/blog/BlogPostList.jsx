import { BlogPagination } from "./BlogPagination";
import BlogPost from "./BlogPost";

export default function BlogPostList({posts,pageSize}) {
  return (
    <div className="md:flex-[5]">
      <div className="text-xl md:text-2xl font-semibold">
        News
      </div>
      {posts.map(post => (
        <BlogPost key={post.id} post={post}/>
      ))
      }
      <div className="mt-6 flex justify-center ml-auto gap-x-3">
          <BlogPagination pageSize={2}/>
      </div>
    </div>
  )
}
