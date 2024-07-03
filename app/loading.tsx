import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  const arr = Array(5).fill(10);

  return (
    <div className="container flex justify-center py-8 md:justify-between">
      <div className="grid grow grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {arr.map(() => {
          return (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
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
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
