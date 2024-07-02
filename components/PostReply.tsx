'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Comment from './Comment';
type ReplyRes = {
  comment: string;
  id: string;
  repliesCount: number;
  author: {
    username: string;
    avatar: string | null;
    name: string;
  };
};
export function PostReply({
  commentId,
  formEnabled
}: {
  commentId: string;
  formEnabled: boolean;
}) {
  const [comment, setComment] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [addedComments, setAddedComments] = useState<ReplyRes[]>([]);
  if (formEnabled)
    return (
      <div>
        <form>
          <fieldset disabled={formDisabled} className="flex gap-2">
            <Input
              type="text"
              placeholder="enter your reply"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <Button
              size={'sm'}
              disabled={!comment}
              onClick={(e) => {
                e.preventDefault();
                setFormDisabled(true);
                fetch(`/api/comments/${commentId}/replies`, {
                  method: 'POST',
                  body: JSON.stringify({ reply: comment })
                })
                  .then((res) => {
                    if (res.status === 201) return res.json();
                  })
                  .then((res: ReplyRes) => {
                    setAddedComments((p) => [...p, res]);
                  })
                  .finally(() => {
                    setComment('');
                    setFormDisabled(false);
                  });
              }}
            >
              submit
            </Button>
          </fieldset>
        </form>
        <div className="mt-2 space-y-2">
          {addedComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                avatar={comment.author.avatar}
                content={comment.comment}
                id={comment.id}
                name={comment.author.name}
                username={comment.author.username}
                repliesCount={comment.repliesCount}
              />
            );
          })}
        </div>
      </div>
    );
  else return null;
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
