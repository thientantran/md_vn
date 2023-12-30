'use state'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import CommentForm from "./CommentForm";
import FormattedDate from "./FormattedDate";
const formSchema = z.object({
  desc: z.string().min(1, {
    message: "Comment is required"
  })
})

export default function Comment({comment}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current)

  const [isReplying, setIsReplying] = useState(false);
  const toggleReply = () => setIsReplying((current) => !current)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: comment
  })
  const { isSubmitting, isValid } = form.formState;
  const queryClient = useQueryClient()
  const editMutation = useMutation({
    mutationFn: (body) =>{
      return axios.patch(`/api/blog/${comment.postId}/comments/${comment.id}`, body)
    }
  })
  const deleteMutation = useMutation({
    mutationFn: () =>{
      // console.log(`/api/blog/${postId}/comments/${values.id}`)
      return axios.delete(`/api/blog/${comment.postId}/comments/${comment.id}`)
    }
  })

  const onSubmit = (values) => {
    queryClient.setQueryData(["post", comment.postId], (oldData) => {
      const updatedComments = oldData.comments.map((c) => {
        if (c.id === comment.id) {
          // return {...c,...data.data}
          c.desc = values.desc
          return {...c}
        }
        return c;
      });

      return {
        ...oldData,
        comments: updatedComments,
      };
    });
    toggleEdit();
    editMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success("OK");
        // toggleEdit();
        // // Update the query data
        // // chú ý: data trả về chỉ có post, ko có chứa user, trong khi data trong querydata để biding ra là user, hình,
        // queryClient.setQueryData(["post", comment.postId], (oldData) => {
        //   const updatedComments = oldData.comments.map((c) => {
        //     if (c.id === comment.id) {
        //       // return {...c,...data.data}
        //       c.desc = values.desc
        //       return {...c}
        //     }
        //     return c;
        //   });
        //   return {
        //     ...oldData,
        //     comments: updatedComments,
        //   };
        // });
        queryClient.invalidateQueries(["post", comment.postId]);
      },
      onError: (error) => {
        console.log(error);
        queryClient.invalidateQueries(["post", comment.postId]);
        toast.error(error.response.data);
      }
    });
  };
  const onDelete = async  () => {
    queryClient.setQueryData(["post", comment.postId], oldData => {
      // Remove the deleted comment from the comments array
      return {
        ...oldData,
        comments: oldData.comments.filter(c => c.id !== comment.id)
      };
    });
    try {
      await deleteMutation.mutateAsync(null)
      toast.success("OK");
      console.log('delete OK')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }finally{
      queryClient.invalidateQueries(["post", comment.postId]);
    }
  }
  // const onDelete = () => {
  //   queryClient.setQueryData(["post", comment.postId], oldData => {
  //     // Remove the deleted comment from the comments array
  //     return {
  //       ...oldData,
  //       comments: oldData.comments.filter(c => c.id !== comment.id)
  //     };
  //   });
  //   deleteMutation.mutate(null, {
  //     onSuccess: () => {
  //       toast.success("OK");
  //       // console.log(data)
  //       // Update the cache
  //       // Invalidate the query
  //       queryClient.invalidateQueries(["post", comment.postId]);
  //     },
  //     onError: (error) => {
  //       toast.error(error.response.data);
  //       queryClient.invalidateQueries(["post", comment.postId]);
  //     },
  //   });
  // }
  // const childComments = comments.filter((c) => c.parentId === comment.id)

  return (
    <div className="px-2 py-2 text-base bg-white rounded-lg dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
            <div className="h-6 w-6 relative mr-2">
              <Image src={comment.user?.image || "https://github.com/shadcn.png"} alt="postimage" fill className="rounded-full object-cover"/>
            </div>{comment.user?.name}</div>
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
      {!comment.parentId && (<div className="flex items-center mt-1 space-x-4 pl-8">
        <button type="button" onClick={toggleReply} className="flex items-center font-medium text-sm mb-2 text-gray-500 hover:underline dark:text-gray-400">
          <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
          </svg>
          Reply
        </button>
      </div>)}
      <div>
      {isReplying && !comment.parentId && (
        <div className="ml-8">
          <CommentForm postId={comment.postId} parentId={comment.id} isReply={true} setIsReplying={setIsReplying}/>
        </div>

        )}
      </div>
    </div>
  )
}
