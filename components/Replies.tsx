'use client';

import { useEffect, useState } from 'react';
import Comment from './Comment';
import { Skeleton } from './ui/skeleton';

type Reply = {
  author: {
    username: string;
    name: string;
    avatar: string | null;
  };
  comment: string;
  repliesCount: number;
  id: string;
  createdAt: string;
};
export default function Replies({ commentId }: { commentId: string }) {
  const [loading, setLoading] = useState(true);
  const [repliesArr, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    fetch(`/api/comments/${commentId}/replies`)
      .then((res) => {
        if (res.status == 200) return res.json();
      })
      .then((res: Reply[]) => {
        console.log(res);
        setLoading(false);
        setReplies(res);
      });
  }, [commentId]);
  return (
    <>
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          {repliesArr.map((reply) => {
            return (
              <Comment
                createdAt={new Date(reply.createdAt)}
                content={reply.comment}
                key={reply.id}
                avatar={reply.author.avatar}
                id={reply.id}
                name={reply.author.name}
                repliesCount={reply.repliesCount}
                username={reply.author.username}
              />
            );
          })}
        </>
      )}
    </>
  );
}
