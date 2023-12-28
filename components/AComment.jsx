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
import FormattedDate from "./FormattedDate";
const formSchema = z.object({
  desc: z.string().min(1, {
    message: "Comment is required"
  })
})
export default function AComment({comment}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current)
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

  return (
    <div>
        <div className="flex justify-between items-center mb-1">
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
          <p className="px-8">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <Form {...form}>
            <form className="ml-8 space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
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
      </div>
  )
}
