import { Skeleton } from "@/components/ui/skeleton";

function EventTitleCardSkeleton() {
  return (
    <div className="flex h-20 flex-wrap items-center rounded-lg border border-default-200 p-4">
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-40" />
      </div>

      <Skeleton className="h-10 w-36 flex-none" />
    </div>
  );
}

export default EventTitleCardSkeleton;
