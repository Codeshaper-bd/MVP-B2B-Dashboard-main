import { Skeleton } from "@/components/ui/skeleton";

function VenueCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-background p-4 md:flex-row xl:gap-10">
      <div>
        <Skeleton className="h-[214px] w-[214px] rounded-lg" />
      </div>

      <div>
        <div className="flex flex-1 flex-col justify-between space-y-4">
          <Skeleton className="h-6 w-1/2 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueCardSkeleton;
