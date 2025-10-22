import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

function EventInfoSkeleton() {
  return (
    <SkeletonWrapper size={1}>
      <div className="rounded-md border border-border">
        <Skeleton className="h-[254px] w-full rounded-b-none bg-default-50">
          <Skeleton className="h-full w-full bg-default-200" />
        </Skeleton>
      </div>
      <Skeleton className="mt-4 h-8 w-full max-w-56 bg-default-200" />
      <Skeleton className="mt-4 h-5 w-full max-w-28 bg-default-200" />
      <div className="flex gap-4">
        <Skeleton className="mt-4 h-12 w-full bg-default-200" />
        <Skeleton className="mt-4 h-12 w-full bg-default-200" />
      </div>
    </SkeletonWrapper>
  );
}

export default EventInfoSkeleton;
