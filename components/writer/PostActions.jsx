'use client'

import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PostActions({disabled, postId, isPublished}) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const onDelete = async () => {
    // console.log("Delete")
    try {
      setIsLoading(true)
      // await axios.delete(`/api/courses/${courseId}`);
      toast.success("Post deleted")
      router.refresh()
      router.push(`/writer/posts`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally{
      setIsLoading(false)
    }
  }

  const onClick = async () => {
    try {
      setIsLoading(true)
      if(isPublished){
        // console.log('set unPublish')
        // await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("Chapter unpublished")
      }else{
        // console.log("set publish")
        // await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Chapter published")
      }
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled || isLoading} size='sm' variant='outline' onClick={onClick}>
        {isPublished ? "UnPublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size='sm' disabled={isLoading}>
          <Trash className="h-4 w-4"/>
        </Button>
      </ConfirmModal>
    </div>
  )
}