'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Comment from '../Comment';
import CommentForm from '../CommentForm';

export default function BlogPostComment({ postId }) {
  const session = useSession()
  const [isClient, setIsClient] = useState(false);
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/blog/${postId}`)
      return data
    },
  })
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  if (!session) {
    return (
      <div>
        Đăng nhập để đọc bình luận
      </div>
    )
  }
  if (isLoading) {
    return (
      <div>
        Loading...
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
      <CommentForm postId={post.id} />
      {/* </div> */}
      {/* <Button>Summit</Button> */}
      {/* </form> */}
      {/* {post.comments.map((comment, index) => ( !comment.parentId ? <CommentDetail comments={post.comments} key={index} comment={comment}/> : null))} */}
      {/* {post.comments.map((comment, index) => ( <Comment key={index} comment={comment}/> ))} */}
      {post.comments.map((comment) => {
        if (!comment.parentId) {
          const childComments = post.comments.filter((c) => c.parentId === comment.id)
          return (
            <div key={comment.id} className="ml-2">
              <Comment comment={comment} />
              {childComments.length !== 0 && (
                <div className="ml-6">
                  {childComments.map((childComment) => (
                    <Comment key={childComment.id} comment={childComment} />
                    // <AComment key={childComment.id} comment={childComment}/>
                  ))}
                </div>
              )}
            </div>
          )
        }

      })}
    </section>
  )
}
