
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { FollowMessageButton } from '@/components/FollowMessageButton';
import {PostCard} from '@/components/PostCard';
import { Separator } from '@/components/ui/separator';
async function UserProfile({
  params: { username }
}: {
  params: { username: string };
}) {
  const loggedinusername = headers().get("username")
  if(!loggedinusername) return redirect('/join')
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    select: {
      followers : {
        where : {username : loggedinusername},
        select : {id : true},
        take : 1
      },
      username: true,
      followingsCount: true,
      followersCount: true,
      name: true,
      avatar: true,
      about: true,
      postCount: true,
      posts: {
        select: {
          postURL: true,
          id: true,
          caption: true,
          createdAt : true,
          likedBy : {
            where : {username : loggedinusername},
            select : {id:true},
            take : 1,
          },
          bookmarkedBy : {
            where : {
              username : loggedinusername
            },
            select : {id:true},
            take : 1,
          }
        }
      }
    }
  });
  if (!user) return notFound();

  return (
    <div>
      <header className="mt-1">
        <div className="container grid grid-cols-2 gap-y-4">
          <Avatar className="size-24 md:col-span-2">
            <AvatarImage src={user.avatar!} />
            <AvatarFallback>{user.name.slice(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-4 md:col-span-2">
            <p className="text-2xl font-bold">@{user.username}</p>
            {loggedinusername === username ? null : (
              <FollowMessageButton
                isFollowing={user.followers.length>0 ? true : false}
                username={username}
              />
            )}
          </div>
          <div className="col-span-2">
            <p className="text-sm font-bold">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.about}
            </p>
          </div>
          <div className="col-span-2 flex justify-between">
            <div className="text-center">
              <p className="text-xl font-bold">
                {user.postCount}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">
                {user.followersCount}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">
                {user.followingsCount}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Following</p>
            </div>
          </div>
        </div>
      </header>
      <Separator className="my-4" />
      <section>
        <div className="container col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {user.posts.map((post) => {
            return (
            <div>
              <PostCard
                liked = {post.likedBy.length>0 ? true : false}
                bookmarked = {post.bookmarkedBy.length>0 ? true: false}
                postId={post.id.toString()}
                username={user.username}
                avatar={user.avatar!}
                postImageId={post.postURL}
                key={post.id}
                time={post.createdAt}
              />
              <span className='py-3 text-sm'>{post.caption}</span>
            </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
