'use client'
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import Editor from './Editor';
import Preview from './Preview';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';


const formSchema = z.object({
  description: z.string().min(1)
})
export default function DetailEditor({initialData, postId}) {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () =>  setIsEditing((current)=> !current)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ""
    }
  })

  const {isSubmitting, isValid} = form.formState

  const router = useRouter()
  const onSubmit = async (values) => {
    // console.log(values)
    try {
      // await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Chapter updated")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Post detail
        <Button variant='ghost' onClick={toggleEdit}>
            {isEditing ? (<>Cancel</>) : (
              <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit the Post 
              </>
            )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn("text-sm mt-2", !initialData.description && 'text-slate-500 italic')}>
          {!initialData.description && "Please write the Post"}
          {initialData.description && (
            <Preview
              value={initialData.description}
            />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
              <FormField
                control={form.control}
                name='description'
                render={({field})=> (
                  <FormItem>
                    <FormControl>
                      <Editor {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
                <Button disabled={!isValid || isSubmitting} type='submit'>
                  Save
                </Button>
          </form>
        </Form>
      )}
    </div>
  )
}