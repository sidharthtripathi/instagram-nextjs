export const runtime = "edge";
import { redirect } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import SuggestionsCard from '@/components/SuggestionsCard';

export default async function Component() {
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
            take: 10,
            select: {
              postURL: true,
              caption: true,
              id: true
            }
          }
        }
      }
    }
  });
  if (!user) return redirect('/join');
  return (
    <div className="flex h-full flex-col">
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3 md:px-6">
          <div className="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
              user.followings
                .map((user) => {
                  return user.posts.map((post) => {
                    return (
                      <PostCard
                        postId={post.id.toString()}
                        avatar={user.avatar}
                        postURL={post.postURL}
                        caption={post.caption}
                        key={post.id}
                        username={user.username}
                      />
                    );
                  });
                })
                .flat()
              }
          </div>
          <SuggestionsCard />
        </div>
      </main>
    </div>
  );
}
