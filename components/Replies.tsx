'use client';

import { useEffect, useState } from 'react';
import Comment from './Comment';

type Reply = {
  author: {
    username: string;
    name: string;
    avatar: string | null;
  };
  comment: string;
  repliesCount: number;
  id: string;
  createdAt : string
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
        <span>Loading...</span>
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
