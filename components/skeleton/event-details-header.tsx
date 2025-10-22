import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailsHeaderSkeleton() {
  return (
    <div className="flex-1 space-y-6">
      <Skeleton className="h-10 w-[10%] rounded-md" />
      <Skeleton className="h-10 w-[20%] rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[20%] rounded-md" />
        <Skeleton className="h-10 w-[20%] rounded-md" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[20%] rounded-md" />
        <Skeleton className="h-10 w-[20%] rounded-md" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[20%] rounded-md" />
        <Skeleton className="h-10 w-[20%] rounded-md" />
      </div>
    </div>
  );
}
