import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Replies from './Replies';
import { CommentInteract } from './CommentInteract';
import { timeAgo } from '@/lib/time';

export default function Comment({
  content,
  avatar,
  username,
  repliesCount,
  id,
  createdAt
}: {
  createdAt : Date,
  content: string;
  avatar: string | null;
  username: string;
  repliesCount: number;
  id: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src={avatar!} />
        <AvatarFallback>{username.slice(0,2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">
            <Link href={`/users/${username}`}>{username}</Link>
          </div>
          <time className="text-xs text-muted-foreground">{timeAgo.format(createdAt)}</time>
        </div>
        <p className="text-xs">{content}</p>
        <div>
          <CommentInteract commentId={id} />
          {repliesCount > 0 ? (
            <Collapsible className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">{repliesCount}</div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDownIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle replies</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-4">
                <Replies commentId={id} />
              </CollapsibleContent>
            </Collapsible>
          ) : null}
        </div>
      </div>
    </div>
  );
}

