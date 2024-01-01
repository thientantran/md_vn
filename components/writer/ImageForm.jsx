'use client'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import axios from 'axios'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import FileUpload from '../FileUpload'
import { Button } from '../ui/button'

export default function ImageForm({ initialData, postId }) {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()
  const onSubmit = async (values) => {
    try {
      // console.log(values)
      await axios.patch(`/api/blog/${postId}`, values);
      console.log(values)
      toast.success("Course updated")
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
        Post Image
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.img && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add an image
            </>
          )}
          {!isEditing && initialData.img && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit image
            </>
          )}
        </Button>
      </div>
      {
        !isEditing && (
          !initialData.img ? (
            <div className="flex items-center justify-center h-full bg-slate-100 rounded-sm">
              <ImageIcon className='h-7 w-7 text-slate-500' />
            </div>
          ) : (
            <div className='cursor-pointer'>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="relative mt-2 h-5">
                    <Image alt='upload' fill className='object-cover rounded-sm' src={initialData.img} />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="relative mt-2 aspect-video">
                    <Image alt='upload' fill className='object-cover rounded-sm' src={initialData.img} />
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          )
        )
      }
      {isEditing && (
        <div>
          <FileUpload
            endpoint='courseImage'
            onChange={(url) => {
              if (url) {
                onSubmit({ img: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect data recommended
          </div>
        </div>
      )}
    </div>
  )
}