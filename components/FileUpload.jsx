
'use client'

import { UploadDropzone } from "@/lib/uploadthing"
import toast from "react-hot-toast"



export default function FileUpload({ onChange, endpoint }) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error) => {
        toast.error(`${error?.message}`)
      }}
    />
  )
}