import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import React from 'react'

function page() {
  return (
    <div className='container mx-auto'>
        <h3 className='font-bold text-2xl'>Find Users</h3>
        <div className='space-y-2'>
            <label className='text-accent-foreground text-sm' htmlFor="search">Search</label>
            <Input type="text" id='search' className=' border-2' placeholder='Search for users...' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-4'>
            <SearchList/>
            <SearchList/>
            <SearchList/>
            <SearchList/>
        </div>

        
    </div>
  )
}

function SearchList(){
    return (
        <div className='flex justify-start gap-4 hover:bg-accent p-2 rounded-md transition-colors'>
            <Avatar>
                <AvatarFallback>DP</AvatarFallback>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex-1">
                <p className="text-sm font-medium">Acme Inc</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">@acmeinc</p>
            </div>

        </div>
    )
}


export default page