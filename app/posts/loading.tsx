import { Skeleton } from '@/components/ui/skeleton';
export default function Loader() {
  return (
    <div className="container mt-4 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="size-12 rounded-full md:size-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="aspect-square w-full sm:size-72" />
      </div>
      <div className="mt-8 space-y-2">
        <div className="space-y-1">
          <Skeleton className="size-6 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-1 w-10" />
            <Skeleton className="h-1 w-44" />
          </div>
        </div>
        <div className="space-y-1">
          <Skeleton className="size-6 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-1 w-10" />
            <Skeleton className="h-1 w-44" />
          </div>
        </div>
        <div className="space-y-1">
          <Skeleton className="size-6 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-1 w-10" />
            <Skeleton className="h-1 w-44" />
          </div>
        </div>
      </div>
    </div>
  );
}
