import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {MessageCircle} from 'lucide-react'
import Link from 'next/link';
import { LikeDislikeButton } from './LikeDislikeButton';
import { BookMarkButton } from './BookMarkButton';

type PostProps = {
  username: string;
  avatar: string;
  postURL: string;
  caption: string;
  postId: string;
  liked : boolean;
  bookmarked : boolean;
};
export function PostCard({
  username,
  avatar,
  postId,
  postURL,
  caption,
  liked,
  bookmarked
}: PostProps) {
  return (
    <div className='space-y-2'>
      <div className="flex items-center justify-center gap-2">
        <Avatar>
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          <AvatarImage src={avatar} />
        </Avatar>
        <span>{username}</span>
      </div>
      <div className="flex justify-center">
        <img src={postURL} className='aspect-square w-full object-contain' />
      </div>
      <div className='space-y-2'>
            <div className='flex items-center justify-center gap-4'>
              <LikeDislikeButton liked = {liked} postId={postId} />
              <MessageCircle className='size-5' />
              <BookMarkButton bookmarked = {bookmarked} postId={postId} />
            </div>
            <div className='space-y-1'>
              <p className='text-center text-sm'>{caption}</p>
              <Link className='text-xs w-full block text-center text-muted-foreground' href={`/posts/${postId}`}>View all Comments</Link>
            </div>
      </div>
    </div>
  );
}

