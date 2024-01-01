'use client'

import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/useConfetti";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PostActions({ disabled, postId, isPublished }) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const onDelete = async () => {
    // console.log("Delete")
    try {
      setIsLoading(true)
      await axios.delete(`/api/blog/${postId}`);
      toast.success("Post deleted")
      router.push(`/writer/posts`)
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  const confetti = useConfetti();
  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        // console.log('set unPublish')
        await axios.patch(`/api/blog/${postId}/unpublish`)
        toast.success("The Post unpublished")
      } else {
        // console.log("set publish")
        await axios.patch(`/api/blog/${postId}/publish`)
        toast.success("The Post published")
        confetti.onOpen()
      }
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled || isLoading} size='sm' className={isPublished ? 'bg-rose-400' : 'bg-green-400'} variant='outline' onClick={onClick}>
        {isPublished ? "UnPublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size='sm' disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}