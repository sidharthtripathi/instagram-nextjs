import Link from 'next/link'
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'

function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#"  className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/home" className='w-full' prefetch={false}>
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className='w-full' prefetch={false}>
                  Explore
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className='w-full' prefetch={false}>
                  Reels
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className='w-full' prefetch={false}>
                  Messages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className='w-full' prefetch={false}>
                  Notifications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className='w-full' prefetch={false}>
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
  )
}

export default Navbar


function MountainIcon(props : any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }
  

  function MenuIcon(props : any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }