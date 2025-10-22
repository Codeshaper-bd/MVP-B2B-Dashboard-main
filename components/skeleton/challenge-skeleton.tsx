import { Skeleton } from "@/components/ui/skeleton";

function ChallengeSkeleton() {
  return (
    <div className="w-full space-y-4 rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-6" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-9 w-1/3 rounded-md" />
        <Skeleton className="h-9 w-3/5 rounded-md" />
      </div>
    </div>
  );
}

export default ChallengeSkeleton;
