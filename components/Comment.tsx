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

export default function Comment({
  content,
  avatar,
  name,
  username,
  repliesCount,
  id
}: {
  content: string;
  avatar: string | null;
  name: string | null;
  username: string;
  repliesCount: number;
  id: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Avatar>
        {/* @ts-ignore */}
        <AvatarImage src={avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">
            <Link href={`/users/${username}`}>{name}</Link>
          </div>
          <time className="text-xs text-muted-foreground">2 hours ago</time>
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
