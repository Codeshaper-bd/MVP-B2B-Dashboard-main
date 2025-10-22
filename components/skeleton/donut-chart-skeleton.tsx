import { cn } from "@/lib/utils";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

function DonutChartSkeleton({
  size = 1,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <SkeletonWrapper size={size}>
      <div className="mb-3">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className={cn("size-36 rounded-full", className)} />
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </SkeletonWrapper>
  );
}

export default DonutChartSkeleton;
