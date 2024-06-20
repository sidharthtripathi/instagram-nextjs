"use client"

import Link from "next/link"
import { DropdownMenuItem } from "./ui/dropdown-menu"

function ProfileNavigator() {
    const username = localStorage.getItem("username")
  return (
    <DropdownMenuItem asChild>
                {
                  username ? <Link href={`/users/${username}`} className='w-full' prefetch={false}>
                  Profile
                </Link>
                  :
                  <Link href="/join" className='w-full' prefetch={false}>
                  Profile
                </Link>

                }
                
              </DropdownMenuItem>
  )
}

export default ProfileNavigator