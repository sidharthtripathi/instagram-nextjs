'use client';
import { useState } from 'react';
import { PostCommentReply } from './PostReply';
import { Button } from './ui/button';
import { HeartIcon } from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';
export function CommentInteract({ commentId }: { commentId: string }) {
  const [formEnabled, toggleForm] = useState(false);
  return (
    <div>
      <div className="flex">
        <Button variant="ghost" size="icon">
          <HeartIcon className="size-4" />
          <span className="sr-only">Like</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            toggleForm((p) => !p);
          }}
        >
          <MessageCircle className="size-4" />
          <span className="sr-only">Reply</span>
        </Button>
      </div>
      {
        formEnabled && <PostCommentReply commentId={commentId} />
      }
    </div>
  );
}


