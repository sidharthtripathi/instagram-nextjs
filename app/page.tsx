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
  let postCount = 0; // this may need to memoize
  user.followings.filter((user) => {
    postCount += user.posts.length;
    return false;
  });
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postCount > 0 ? (
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
            ) : (
              <div className="col-end-[-1] col-start-1 text-center">
                <p className="text-xl font-bold">Your Feed is Empty</p>
                <p className="text-sm text-muted-foreground">
                  People You follow will appear here
                </p>
              </div>
            )}
          </div>
          <SuggestionsCard />
        </div>
      </main>
    </div>
  );
}
