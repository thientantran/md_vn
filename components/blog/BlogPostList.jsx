import { Button } from "../ui/button";
import BlogPost from "./BlogPost";

export default function BlogPostList({posts}) {
  return (
    <div className="md:flex-[5]">
      <div className="text-xl md:text-2xl font-semibold">
        News
      </div>
      {posts.map(post => (
        <BlogPost key={post.id} post={post}/>
      ))
      }
      <div className="mt-6 flex justify-end ml-auto gap-x-3">
          <Button variant='outline'>Previous</Button>
          <Button variant='outline'>Next</Button>
      </div>
    </div>
  )
}
