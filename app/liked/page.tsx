import { PostCard } from '@/components/PostCard';
import { prisma } from '@/lib/prisma';
import { HeartCrack } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Liked() {
  const username = headers().get('username');
  if (!username) return redirect('/join');
  const posts = await prisma.post.findMany({
    where: {
      likedBy: {
        some: { username }
      }
    },
    select: {
      id: true,
      postURL: true,
      author: {
        select: {
          avatar: true,
          username: true
        }
      },
      bookmarkedBy: {
        where: { username },
        take: 1,
        select: { id: true }
      },
      caption: true
    }
  });
  return (
    <div>
      {posts.length === 0 ? (
        <div className='space-y-4 mt-4'>
            <HeartCrack className='mx-auto' size={60}/>
            <p className='text-center font-bold text-2xl'>Looks like you have not liked any post yet.</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              caption={post.caption!}
              avatar={post.author.avatar!}
              postURL={post.postURL}
              username={post.author.username}
              postId={post.id}
              bookmarked={post.bookmarkedBy.length > 0 ? true : false}
              liked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
