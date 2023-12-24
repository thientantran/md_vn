import IconBadge from '@/components/IconBadge'
import TitleForm from '@/components/TitleForm'
import prismadb from '@/lib/prisma'
import { LayoutDashboard } from "lucide-react"
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
export default async function page({params}) {
  const  session = await getServerSession()
  if(!session){
    return redirect("/")
  }
  const post = await prismadb.post.findUnique({
    where: {
      id: params.postId
    }
  })
  if(!post){
    return redirect("/")
  }

  const requiredFields = [
    post.title,
    post.desc,
    post.img,
    post.categoryId
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Post setup
          </h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-8 gap-x-2">
        <IconBadge variant='success' icon={LayoutDashboard}/>
        <h2 className="text-xl">
          Customize your Post
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <TitleForm initialData={post} postId={post.id}/>
        </div>
      </div>
    </div>
  )
}
