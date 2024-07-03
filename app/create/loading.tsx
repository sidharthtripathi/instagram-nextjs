import { Skeleton } from '@/components/ui/skeleton';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Skeleton className="w-1/6 h-4" />
      <Skeleton className="size-40" />
      <Skeleton className="w-8 h-4" />
    </div>
  );
}
