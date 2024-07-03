import { Skeleton } from '@/components/ui/skeleton';

export default function Loader() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-1/2 h-8" />
      <Skeleton className="w-1/3 h-10" />
      <Skeleton className="w-full h-12" />
    </div>
  );
}
