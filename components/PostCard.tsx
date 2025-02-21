import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { timeAgo } from '@/lib/time';
import {MessageCircle, Send} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { LikeDislikeButton } from './LikeDislikeButton';
import { BookmarkFeatureButton } from './BookmarkFeatureButton';
import { Image } from './ui/Image';
import { Button } from './ui/button';
import Link from 'next/link';
type PostProps = {
  username: string;
  avatar: string;
  time : Date;
  postImageId: string;
  postId: string;
  liked : boolean;
  bookmarked : boolean;
};
export function PostCard({
  username,
  avatar,
  postId,
  postImageId,
  time,
  liked,
  bookmarked
}: PostProps) {
  return (
    <Card className="max-w-md">
        <CardHeader className="flex-row items-center justify-center gap-4 space-y-0 p-4">
          <Avatar>
            <AvatarImage src={avatar!} />
            <AvatarFallback>{username.slice(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <Link href={`/users/${username}`} className="font-medium">{username}</Link>
            <time className="text-xs text-muted-foreground">{timeAgo.format(time)}</time>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Image
            imgId={postImageId}
            className="aspect-square object-cover"
          />
        </CardContent>
        <CardFooter className="grid gap-4 p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <LikeDislikeButton
                liked={liked}
                postId={postId}
              />
              <span className="sr-only">Like</span>
            </Button>
            <Link href={`/posts/${postId}`} className='hover:bg-accent rounded-md'>
              <MessageCircle className="size-6 m-1" />
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto">
              <BookmarkFeatureButton bookmarked = {bookmarked} postId={postId} />
              <span className="sr-only">Save</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
  );
}

