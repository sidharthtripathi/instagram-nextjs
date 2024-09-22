export const runtime = 'edge';
import { redirect } from 'next/navigation';
import {PostCard} from '@/components/PostCard';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import SuggestionsCard from '@/components/SuggestionsCard';

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
            orderBy : {createdAt : "asc"},

            select: {
              bookmarkedBy : {
                where : {
                  username
                },
                take : 1,
                select : {id:true}
              },
              postURL: true,
              caption: true,
              id: true,
              likedBy : {
                where : {
                  username,
                },
                take : 1,
                select : {id : true}
              }
            }
          }
        }
      }
    }
  });
  if (!user) return redirect('/join');
  return (
    <main className='flex container mt-4 gap-4'>
      <section className='flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
                  liked = {post.likedBy.length > 0 ? true : false}
                  bookmarked = {post.bookmarkedBy.length > 0 ? true : false}
                />
              );
            });
          })
          .flat()}
      </section>
      <section>
        <SuggestionsCard />
      </section>
    </main>
  );
}
