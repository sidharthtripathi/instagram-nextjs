import { Skeleton } from '@/components/ui/skeleton';
export default function Loader() {
  return (
    <div className="mt-4 container grid grid-cols-1 md:grid-cols-2">
      <div className="flex justify-center flex-col items-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <Skeleton className="size-12 md:size-16 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>
        <Skeleton className="sm:size-72 w-full aspect-square" />
      </div>
      <div className="mt-8 space-y-2">
        <div className="space-y-1">
          <Skeleton className="rounded-full size-6" />
          <div className="space-y-1">
            <Skeleton className="w-10 h-1" />
            <Skeleton className="w-44 h-1" />
          </div>
        </div>
        <div className="space-y-1">
          <Skeleton className="rounded-full size-6" />
          <div className="space-y-1">
            <Skeleton className="w-10 h-1" />
            <Skeleton className="w-44 h-1" />
          </div>
        </div>
        <div className="space-y-1">
          <Skeleton className="rounded-full size-6" />
          <div className="space-y-1">
            <Skeleton className="w-10 h-1" />
            <Skeleton className="w-44 h-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
