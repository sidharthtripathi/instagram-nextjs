import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { ModeToggle } from './ui/darkModeToggle';
import ProfileNavigator from './ProfileNavigator';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { BadgePlus, Menu, Search } from 'lucide-react';

function Navbar() {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          href="/create"
          className="rounded-full p-1 hover:bg-accent"
          prefetch={false}
        >
          <BadgePlus className='size-4' />
        </Link>
        <Link
          href="/explore"
          className="rounded-full p-1 hover:bg-accent"
          prefetch={false}
        >
          <Search className="size-4" />
        </Link>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="size-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/" className="w-full" prefetch={false}>
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/explore" className="w-full" prefetch={false}>
                Explore
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/saved" className="w-full" prefetch={false}>
                Saved
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/liked" className="w-full" prefetch={false}>
                Liked
              </Link>
            </DropdownMenuItem>
            <ProfileNavigator />
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default Navbar;



function MountainIcon(props: any) {
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
  );
}

