"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Button } from "./ui/button";
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  })
})

export default function TitleForm({
  initialData, postId
}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })
  const { isSubmitting, isValid } = form.formState;

  const router = useRouter()

  const onSubmit =  async (values) => {
    try {
      // console.log(values)
      await axios.patch(`/api/blog/${postId}`, values);
      toast.success("OK")
      toggleEdit()
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Post Title
        <Button variant='ghost' onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2"/>
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.title}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder="e.g Title of the post" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
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