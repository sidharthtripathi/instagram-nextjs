'use client';

import { useState } from 'react';
import { PostReply } from './PostReply';
import { Button } from './ui/button';
import { HeartIcon } from '@radix-ui/react-icons';
export function CommentInteract({ commentId }: { commentId: string }) {
  const [formEnabled, toggleForm] = useState(false);
  return (
    <div>
      <div className="flex">
        <Button variant="ghost" size="icon">
          <HeartIcon className="w-4 h-4" />
          <span className="sr-only">Like</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            toggleForm((p) => !p);
          }}
        >
          <MessageCircleIcon className="w-4 h-4" />
          <span className="sr-only">Reply</span>
        </Button>
      </div>

      <PostReply commentId={commentId} formEnabled={formEnabled} />
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
