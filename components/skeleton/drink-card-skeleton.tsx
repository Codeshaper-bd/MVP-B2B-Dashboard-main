import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export interface IDrinkCardSkeleton {
  size?: number;
  className?: string;
}
function DrinkCardSkeleton({
  size = 12,
  className = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
}: IDrinkCardSkeleton) {
  return (
    <SkeletonWrapper size={size} className={className}>
      <div className="space-y-2 rounded-xl bg-muted/10 p-2">
        <div className="relative h-16 w-full overflow-hidden rounded-lg">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="space-y-1 px-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-2/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>

        <div className="flex items-center justify-between px-1 pt-1">
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </SkeletonWrapper>
  );
}

export default DrinkCardSkeleton;
