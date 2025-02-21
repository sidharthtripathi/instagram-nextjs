"use client"
import { useState } from 'react';

import { Button } from './ui/button';
import { server } from '@/lib/axios';

export function FollowMessageButton({
  isFollowing,
  username
}: {
  isFollowing: boolean;
  username: string;
}) {
  const [follow,setFollow] = useState(isFollowing)
  return (
    <div className="grid grid-cols-2 gap-2">
      {follow ? (
        <Button
        variant={"destructive"}
        onClick={async()=>{
          setFollow(false)
          try {
            server.post(`/api/users/${username}/unfollow`)
          } catch (error) {
            setFollow(true)
          }
        }}
        >Unfollow</Button>
      ) : (
        <Button
        onClick={async()=>{
          setFollow(true)
          try {
            server.post(`/api/users/${username}/follow`)
          } catch (error) {
            setFollow(false)
          }
        }}
        >Follow</Button>
      )}
      <Button variant="outline" className="flex-1">
        Message
      </Button>
    </div>
  );
}
