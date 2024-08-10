export const runtime = "edge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { BookmarkIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Comment from '@/components/Comment';
import PostComment from '@/components/PostComment';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { LikeDislikeButton } from '@/components/LikeDislikeButton';
export default async function Component({
  params: { postId }
}: {
  params: { postId: string };
}) {
  const username = headers().get('username');
  if (!username) redirect('/join');
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      likesCount: true,
      postURL: true,
      caption: true,
      author: {
        select: {
          avatar: true,
          id: true,
          name: true
        }
      },
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
          repliesCount: true,
          comment: true,
          id: true
        }
      }
    }
  });
  if (!post) return notFound();
  const liked = await prisma.post.findUnique({
    where: { id: postId, likedBy: { some: { username } } },
    select: { id: true }
  });
  return (
    <main className="py-4 md:container md:flex md:items-start md:gap-4">
      <Card className="max-w-md">
        <CardHeader className="flex-row items-center justify-center gap-4 space-y-0 p-4">
          <Avatar>
            {/* @ts-ignore */}
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <div className="font-medium">{post.author.name}</div>
            <time className="text-xs text-muted-foreground">2 hours ago</time>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Image
            src={post.postURL}
            width={460}
            height={460}
            alt="Image"
            className="aspect-square object-cover"
          />
        </CardContent>
        <CardFooter className="grid gap-4 p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <LikeDislikeButton
                liked={liked ? (liked.id as unknown as boolean) : false}
                postId={postId}
              />

              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircleIcon className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="ml-auto">
              <BookmarkIcon className="h-5 w-5" />
              <span className="sr-only">Save</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Collapsible
        className="mt-4 grow space-y-4 px-2 text-xs sm:mt-0"
        defaultOpen
      >
        <div className="flex items-center justify-start gap-4">
          <div className="font-medium">{post.likesCount} likes</div>
          <CollapsibleTrigger>
            <span className="flex items-center space-x-2">
              <span className="font-medium underline underline-offset-4">
                Comments
              </span>
              <ChevronDownIcon className="h-4 w-4" />
              <span className="sr-only">Toggle comments</span>
            </span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-4">
          {/* posting form */}
          <PostComment />

          {/* comments */}
          {post.comments.map((comment) => (
            <Comment
              id={comment.id}
              repliesCount={comment.repliesCount}
              content={comment.comment}
              key={comment.id}
              avatar={comment.author.avatar}
              name={comment.author.name}
              username={comment.author.username}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </main>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
