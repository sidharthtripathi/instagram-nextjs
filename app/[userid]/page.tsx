import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

function UserProfile({params : {userid}} : {params : {userid:string}}) {
  return (
    <div className='container grid grid-cols-2 gap-y-4'>
      <Avatar className='size-24 md:col-span-2'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='space-y-4 md:col-span-2'>
        <p className='font-bold text-2xl'>@{userid}</p>
        <div className='flex gap-2'>
            <Button className="flex-1">Follow</Button>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
        </div>
      </div>
      <div className='col-span-2'>
        <p className='font-bold text-sm'>Diljit Dosanjh</p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>We the Best music</p>
      </div>
      <div className="flex justify-between col-span-2">
              <div className="text-center">
                <p className="text-xl font-bold">23</p>
                <p className="text-gray-500 dark:text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">123</p>
                <p className="text-gray-500 dark:text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">456</p>
                <p className="text-gray-500 dark:text-gray-400">Following</p>
              </div>
        </div>
    </div>
  )
}

export default UserProfile