'use client'

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { Combobox } from './Combobox';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';

const formSchema = z.object({
  categoryId: z.string().min(1)
})

export default function CategoryForm({initialData, postId, options}) {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || ""
    }
  })

  const {isSubmitting, isValid} = form.formState;

  const router = useRouter()
  const onSubmit = async (values) => {
    // console.log(values)
    try {
      // await axios.patch(`/api/posts/${postId}`, values);
      // toast.success('Post updated');
      console.log(values)
      toggleEdit();
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const selectedOption = options.find((option) => option.value === initialData.categoryId)

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button onClick={toggleEdit} variant='ghost'>
          {
            isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit Category
              </>
            )
          }
        </Button>
      </div>
      {
        !isEditing && (
          <p className={cn('text-sm mt-2', !initialData.categoryId && 'text-slate-500 italic')}>
            {selectedOption?.label|| 'No Category'}
          </p>
        )
      }
      {
        isEditing && (
          <Form {...form}>
            <form className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='categoryId'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Combobox options={options} {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type='submit'>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )
      }
    </div>
  )
}