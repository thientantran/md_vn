import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/writer/Columns";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = getServerSession(authOptions)
  if (!session) {
    return redirect("/")
  }
  const posts = await prismadb.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
  })
  return (
    <div className="p-6">

      <DataTable columns={columns} data={posts} />
    </div>
  )
}
