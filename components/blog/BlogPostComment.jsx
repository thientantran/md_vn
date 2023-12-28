'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CommentDetail from '../CommentDetail';
import CommentForm from '../CommentForm';

export default  function BlogPostComment({post}) {
  const session = useSession()
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  if(!session){
    return (
      <div>
        Đăng nhập để đọc bình luận
      </div>
    )
  }
  return (
    <section className="mt-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({post.comments.length})</h2>
              </div>
              {/* <form className="mb-2"> */}
                {/* <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"> */}
                  {/* <textarea id="comment" rows={6} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..." required defaultValue={""} /> */}
                  <CommentForm postId={post.id}/>
                {/* </div> */}
                {/* <Button>Summit</Button> */}
              {/* </form> */}
                  {post.comments.map((comment, index) => ( !comment.parentId ? <CommentDetail comments={post.comments} key={index} comment={comment}/> : null))}
            </section>
  )
}
