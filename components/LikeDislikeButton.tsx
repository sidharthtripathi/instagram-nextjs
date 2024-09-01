'use client';

import { server } from '@/lib/axios';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export function LikeDislikeButton({
  liked,
  postId
}: {
  liked: boolean;
  postId: string;
}) {
  const [likedPost, toggleLiked] = useState(liked);
  return (
    <>
      {likedPost ? (
        <HeartFilledIcon
          className="h-5 w-5"
          color="red"
          onClick={() => {
            server.post(`/api/posts/${postId}/dislikes`).then(
              (res) => {
                if (res.status === 201) {
                  toggleLiked(false);
                }
              }
            );
          }}
        />
      ) : (
        <HeartIcon
          className="h-5 w-5"
          onClick={() => {
            server.post(`/api/posts/${postId}/likes`).then(
              (res) => {
                if (res.status === 201) {
                  toggleLiked(true);
                }
              }
            );
          }}
        />
      )}
    </>
  );
}
