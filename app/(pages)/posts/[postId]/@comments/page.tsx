import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Comment from '@/components/Comment';
import PostComment from '@/components/PostComment';
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
      likesCount: true,
      comments: {
        select: {
          author: {
            select: {
              name: true,
              avatar: true,
              id: true,
              username: true
            }
          },
          createdAt: true,
          repliesCount: true,
          comment: true,
          id: true
        }
      }
    }
  });
  if (!post) return null;
  return (
    <Collapsible
      className="mt-4 grow space-y-4 px-2 text-xs sm:mt-0"
      defaultOpen
    >
      <div className="flex items-center justify-start gap-4">
        <div className="font-medium">{post.likesCount} likes</div>
        <CollapsibleTrigger>
          <span className="flex items-center space-x-2">
            <span className="font-medium underline underline-offset-4">
              {post.comments.length} Comments
            </span>
            <ChevronDownIcon className="h-4 w-4" />
            <span className="sr-only">Toggle comments</span>
          </span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">
        <PostComment postId={post.id} />
        {post.comments.map((comment) => (
          <Comment
            createdAt={comment.createdAt}
            id={comment.id}
            repliesCount={comment.repliesCount}
            content={comment.comment}
            key={comment.id}
            avatar={comment.author.avatar}
            username={comment.author.username}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
