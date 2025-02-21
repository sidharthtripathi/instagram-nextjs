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
export function PostCommentReply({
  commentId,
}: {
  commentId: string;
}) {
  const [comment, setComment] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [addedComments, setAddedComments] = useState<ReplyRes[]>([]);
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
                createdAt={new Date()}
                key={comment.id}
                avatar={comment.author.avatar}
                content={comment.comment}
                id={comment.id}
                username={comment.author.username}
                repliesCount={comment.repliesCount}
              />
            );
          })}
        </div>
      </div>
    );

}

