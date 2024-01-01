'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createTitleSchema } from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

export default function CreatePostPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createTitleSchema),
    defaultValues: {
      title: ""
    }
  })
  const onSubmit = async (values) => {
    try {
      // console.log(values)
      const response = await axios.post("/api/blog", values)
      router.push(`/writer/posts/${response.data.id}`)
      toast.success("Post created")
    } catch (error) {
      console.log(error)
    }
  }
  const { isSubmitting, isValid } = form.formState
  return (
    <div className="max-w-5xl mx-auto flex h-full p-6 md:items-center md:justify-center">
      <div>
        <h1 className='text-2xl'>
          Title for your posts
        </h1>
        <p className='text-sm text-slate-600'>
          What would you like to name your post? Don&apos;t worry, you can change this later
        </p>

        <Form {...form}>
          <form className='mt-8 space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Post title
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="Title of the post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Link href='/'>
                <Button variant='ghost' type='button'>
                  Cancel
                </Button>
              </Link>
              <Button type='submit' disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
