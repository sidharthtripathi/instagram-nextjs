import { Skeleton } from '@/components/ui/skeleton';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="size-40" />
      <Skeleton className="h-4 w-8" />
    </div>
  );
}
