
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

import { redirect } from 'next/navigation'
import { FollowMessageButton } from '@/components/FollowMessageButton'
async function UserProfile({params : {username}} : {params : {username:string}}) {
  const user = await prisma.user.findFirst({
    where : {
      username
    },
    select : {
      username : true,
      followingsCount : true,
      followersCount : true,
      name : true,
      avatar : true,
      about : true,
      postCount : true
    }
  })
  const loggedInUser = headers().get("username")
  if(!loggedInUser)  redirect("/join")
  const isFollowing = await prisma.user.findFirst({
      where : {
        AND : [{username : loggedInUser},{
          followings : {
            some : {
              username : username
            }
          }
        }]
      },
      select : {
        id : true
      }
  }) as unknown as boolean
  return (
    <div className='container grid grid-cols-2 gap-y-4'>
      <Avatar className='size-24 md:col-span-2'>
        <AvatarImage src="https://github.com/shadcsadfasd.png" />
        <AvatarFallback>DP</AvatarFallback>
      </Avatar>
        <div className='space-y-4 md:col-span-2'>
        <p className='font-bold text-2xl'>@{user ? user.username : null}</p>
        <FollowMessageButton isFollowing ={isFollowing} username={username}/>
      </div>
      <div className='col-span-2'>
        <p className='font-bold text-sm'>{user ? user.name : null}</p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{user ? user.about : null}</p>
      </div>
      <div className="flex justify-between col-span-2">
              <div className="text-center">
                <p className="text-xl font-bold">{user ? user.postCount : null}</p>
                <p className="text-gray-500 dark:text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{user ? user.followersCount : null}</p>
                <p className="text-gray-500 dark:text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{user ? user.followingsCount : null}</p>
                <p className="text-gray-500 dark:text-gray-400">Following</p>
              </div>
        </div>
    </div>
  )
}

export default UserProfile