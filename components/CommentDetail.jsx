'use state'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import AComment from "./AComment";
import CommentForm from "./CommentForm";
import FormattedDate from "./FormattedDate";
const formSchema = z.object({
  desc: z.string().min(1, {
    message: "Comment is required"
  })
})

export default function CommentDetail({comment,comments}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current)

  const [isReplying, setIsReplying] = useState(false);
  const toggleReply = () => setIsReplying((current) => !current)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: comment
  })
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter()
  const onSubmit =  async (values) => {
    try {
      // console.log(values)
      await axios.patch(`/api/blog/${comment.postId}/comments/${comment.id}`, values);
      toast.success("OK")
      toggleEdit()
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  const onDelete = async () => {
    try {
      await axios.delete(`/api/blog/${comment.postId}/comments/${comment.id}`);
      toast.success("OK")
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const childComments = comments.filter((c) => c.parentId === comment.id)

  return (
    <div className="px-6 py-2 text-base bg-white rounded-lg dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
            <div className="h-6 w-6 relative mr-2">
              <Image src={comment.user.image || "https://github.com/shadcn.png"} alt="postimage" fill className="rounded-full object-cover"/>
            </div>{comment.user.name}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400"><FormattedDate data={comment.createdAt}/></p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleEdit}>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete}>
                <Trash className="h-4 w-4 mr-2"/>
                Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isEditing && (
        <p className="px-8 mb-1">
          {comment.desc}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="desc"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder="Your Comment" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
            <Button type="button" onClick={toggleEdit}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
      <div className="flex items-center mt-1 space-x-4 pl-8">
        <button type="button" onClick={toggleReply} className="flex items-center font-medium text-sm mb-2 text-gray-500 hover:underline dark:text-gray-400">
          <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
          </svg>
          Reply
        </button>
      </div>
      <div>
      {isReplying && (
        <div className="ml-8">
          <CommentForm postId={comment.postId} parentId={comment.id} isReply={true} setIsReplying={setIsReplying}/>
        </div>

        )}
      </div>

      {childComments.length !== 0 && (
        <div className="ml-4">
          {childComments.map((comment, index) => (
            <AComment key={index} comment={comment}/>
          ))}
        </div>
      )}
    </div>
  )
}
