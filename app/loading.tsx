import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  const arr = Array(5).fill(10);

  return (
    <div className="flex container py-8 justify-between">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {arr.map(() => {
          return (
            <div className="space-y-2">
              <div className="flex gap-2 items-center justify-center">
                <Skeleton className="rounded-full size-8" />
                <Skeleton className="w-32 h-4" />
              </div>
              <Skeleton className="size-52" />
            </div>
          );
        })}
      </div>
      <div className="hidden md:block">
        <div className="space-y-4">
          {arr.map(() => {
            return (
              <div className="flex items-center gap-2">
                <Skeleton className="rounded-full size-12" />
                <div className="space-y-2">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-32 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
