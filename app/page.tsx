import { redirect } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import SuggestionsCard from '@/components/SuggestionsCard';
import Link from 'next/link';
import { CameraIcon, PodcastIcon, TvIcon } from 'lucide-react';

// no pagination as of now
export default async function Homepage() {
  const username = headers().get('username');
  if (!username) return redirect('/join');
  const user = await prisma.user.findFirst({
    where: {
      username
    },

    select: {
      followings: {
        select: {
          avatar: true,
          username: true,
          posts: {
            orderBy: { createdAt: 'asc' },

            select: {
              bookmarkedBy: {
                where: {
                  username
                },
                take: 1,
                select: { id: true }
              },
              postURL: true,
              caption: true,
              id: true,
              likedBy: {
                where: {
                  username
                },
                take: 1,
                select: { id: true }
              }
            }
          }
        }
      }
    }
  });
  if (!user) return redirect('/join');
  let postCount = 0;
  user.followings.forEach((user) => {
    postCount += user.posts.length;
  });
  return (
    <main className="container mt-4 flex gap-4">
      {postCount == 0 ? (
        <div className='flex-grow h-full space-y-4 mt-4'>
          <TvIcon size={60} className='mx-auto'/>
          <p className='text-3xl text-center font-bold'>No Posts yet.</p>
          <p className=' text-center'>Looks like no one posted any content yet. <br/>Be the first one <Link href="/create" className='underline'>Here</Link></p>
        </div>
      ) : (
        <section className="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user.followings
            .map((user) => {
              return user.posts.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    avatar={user.avatar!}
                    caption={post.caption!}
                    postId={post.id}
                    postURL={post.postURL}
                    username={user.username}
                    liked={post.likedBy.length > 0 ? true : false}
                    bookmarked={post.bookmarkedBy.length > 0 ? true : false}
                  />
                );
              });
            })
            .flat()}
        </section>
      )}

      <section>
        <SuggestionsCard />
      </section>
    </main>
  );
}
