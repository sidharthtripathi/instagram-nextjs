import { PostCard } from '@/components/PostCard';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export default async function Page({
  params: { postId }
}: {
  params: { postId: string };
}) {
  const username = headers().get('username') as string;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      createdAt: true,
      likesCount: true,
      postURL: true,
      caption: true,
      likedBy: {
        where: { username },
        select: { id: true },
        take: 1
      },
      bookmarkedBy: {
        where: { username },
        select: { id: true },
        take: 1
      },
      author: {
        select: {
          avatar: true,
          id: true,
          username: true
        }
      }
    }
  });
  if (!post) return null;
  return (
    <PostCard
      avatar={post.author.avatar!}
      bookmarked={Boolean(post.likedBy.length)}
      liked={Boolean(post.likedBy.length)}
      postId={post.id}
      postImageId={post.postURL}
      time={post.createdAt}
      username={post.author.username}
      key={post.id}
    />
  );
}
