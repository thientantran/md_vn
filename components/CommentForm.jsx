"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
const formSchema = z.object({
  desc: z.string().min(1, {
    message: "Comment is required"
  })
})

export default function CommentForm({ postId}) {
  const [comment, setComment] = useState('')
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:comment
  })
  const { isSubmitting, isValid } = form.formState;

  const router = useRouter()

  const onSubmit =  async (values) => {
    try {
      // console.log(values)
      await axios.post(`/api/blog/${postId}/comments`, values);
      toast.success("OK")
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }finally{
     form.reset()
    }
  }
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div>
        <Form {...form}>
          <form className="space-y-4 my-4"  onSubmit={(form.handleSubmit(onSubmit))}>
            <FormField
              control={form.control}
              name="desc"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder="Write your comment" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Bình Luận
              </Button>
            </div>
          </form>
        </Form>
    </div>
  )
}