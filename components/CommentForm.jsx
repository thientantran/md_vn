"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
const formSchema = z.object({
  desc: z.string().min(1, {
    message: "Comment is required"
  })
})

export default function CommentForm({ postId, parentId = null, isReply = false, setIsReplying = null }) {
  const { data: user } = useSession()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { desc: "" }
  })
  const { isSubmitting, isValid } = form.formState;
  const queryClient = useQueryClient()

  const commentMutation = useMutation({
    mutationFn: (body) => {
      return axios.post(`/api/blog/${postId}/comments`, body)
    }
  })

  const onSubmit = async (values) => {
    if (isReply) {
      setIsReplying(false);
    }
    // khi bật cái này, nó sẽ mất cái component, đó đo thì unmount, nên nó sẽ ko còn thấy cái form nữa
    const fakePost = {
      id: Date.now(),
      desc: values.desc,
      createdAt: new Date().toISOString(),
      parentId: parentId,
      user: {
        name: user.user.name,
        image: user.user.image
      },
      userEmail: user.user.email
    }
    queryClient.setQueryData(["post", postId], (oldData) => {
      return {
        ...oldData,
        comments: [...oldData.comments, fakePost]
      }
    })

    try {
      await commentMutation.mutateAsync({ ...values, parentId });
      toast.success("OK");
    } catch (error) {
      console.log('error');
      toast.error(error.response.data.message);
    } finally {
      form.reset();
      queryClient.invalidateQueries(["post", postId]);
    }
  };

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
        <form className="space-y-2 mb-1" onSubmit={(form.handleSubmit(onSubmit))}>
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className={cn(isReply && "min-h-[40px]")} disabled={isSubmitting} placeholder="Write your comment" {...field} rows={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            {isReply && (
              <Button onClick={() => setIsReplying(false)}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isReply ? 'Trả lời' : "Bình luận"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}