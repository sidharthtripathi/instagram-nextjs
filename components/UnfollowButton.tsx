'use client';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
export function UnfollowButton({ username }: { username: string }) {
  const router = useRouter();
  const { toast } = useToast();
  return (
    <Button
      className="flex-1"
      variant={'destructive'}
      onClick={async () => {
        fetch(`/api/users/${username}/unfollow`, {
          method: 'POST'
        }).then((res) => {
          if (res.status !== 200) {
            toast({
              title: 'Oops',
              description: 'Something went wrong',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Sucess',
              description: 'Unfollowed'
            });
            router.refresh();
          }
        });
      }}
    >
      Unfollow
    </Button>
  );
}
