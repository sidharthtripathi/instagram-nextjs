'use client';

import { server } from '@/lib/axios';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function FollowButton({ username }: { username: string }) {
  const router = useRouter();
  return (
    <Button
      className="flex-1"
      onClick={() => {
        server.post(`/api/users/${username}/follow`)
          .then((res) => {
            if (res.status === 200) router.refresh();
          })
          .catch((err) => console.log(err));
      }}
    >
      Follow
    </Button>
  );
}
