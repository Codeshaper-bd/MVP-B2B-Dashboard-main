import { Skeleton } from "@/components/ui/skeleton";

function PromoterCardSkeleton() {
  return (
    <div className="space-y-6 rounded-xl border border-border bg-background p-4 xl:gap-10">
      <div className="flex justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-5 w-1/2 rounded" />
        </div>
        <Skeleton className="size-10 rounded-full" />
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-4">
        <Skeleton className="h-16 w-full rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default PromoterCardSkeleton;
