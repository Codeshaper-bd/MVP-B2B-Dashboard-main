import { cn } from "@/lib/utils";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface IPostCardSkeleton {
  size?: number;
  className?: string;
  imageWrapperClassName?: string;
}
function PostCardSkeleton({
  size = 12,
  className,
  imageWrapperClassName,
}: IPostCardSkeleton) {
  return (
    <SkeletonWrapper
      size={size}
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      <Card>
        <CardContent className="p-0">
          <Skeleton
            className={cn(
              "h-[220px] w-full rounded-b-none bg-default-50 p-4",
              imageWrapperClassName,
            )}
          >
            <Skeleton className="h-full w-full bg-default-200" />
          </Skeleton>
          <Skeleton className="grid w-full grid-cols-2 gap-2 rounded-none bg-default-50 p-2 py-6">
            <Skeleton className="h-4 w-full rounded-full bg-default-100" />
            <Skeleton className="h-4 w-full rounded-full bg-default-100" />
            <Skeleton className="h-4 w-full rounded-full bg-default-100" />
            <Skeleton className="h-4 w-full rounded-full bg-default-100" />
          </Skeleton>
        </CardContent>
      </Card>
    </SkeletonWrapper>
  );
}

export default PostCardSkeleton;
