import { Skeleton } from '@/components/ui/skeleton';

export default function Loader() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
