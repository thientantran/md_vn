'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const { data } = useSession()
  const router = useRouter()
  if (!data) {
    return (
      <Button onClick={() => (router.push("/auth"))} variant='outline'>
        Login
      </Button>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data.user?.image || "https://github.com/shadcn.png"} alt="@shadcn" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>{data.user?.role}</DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
