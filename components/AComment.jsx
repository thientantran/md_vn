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
import FormattedDate from "./FormattedDate";
const formSchema = z.object({
  desc: z.string().min(1, {
    message: "Comment is required"
  })
})
export default function AComment({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: comment
  })
  const { isSubmitting, isValid } = form.formState;
  const queryClient = useQueryClient()
  const editMutation = useMutation({
    mutationFn: (body) => {
      return axios.patch(`/api/blog/${comment.postId}/comments/${comment.id}`, body)
    }
  })
  const deleteMutation = useMutation({
    mutationFn: () => {
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
          return { ...c }
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
  const onDelete = () => {
    queryClient.setQueryData(["post", comment.postId], oldData => {
      // Remove the deleted comment from the comments array
      return {
        ...oldData,
        comments: oldData.comments.filter(c => c.id !== comment.id)
      };
    });
    deleteMutation.mutate(null, {
      onSuccess: () => {
        toast.success("OK");
        // console.log(data)
        //   // Update the cache
        // Invalidate the query
        queryClient.invalidateQueries(["post", comment.postId]);
      },
      onError: (error) => {
        queryClient.invalidateQueries(["post", comment.postId]);
        toast.error(error.response.data);
      },
    });
  }


  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
            <div className="h-6 w-6 relative mr-2">
              <Image src={comment.user.image || "https://github.com/shadcn.png"} alt="postimage" fill className="rounded-full object-cover" />
            </div>{comment.user.name}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400"><FormattedDate data={comment.createdAt} /></p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={toggleEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="h-4 w-4 mr-2" />
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
          <form className="ml-8 space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder="Your Comment" {...field} />
                  </FormControl>
                  <FormMessage />
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
    </div>
  )
}
