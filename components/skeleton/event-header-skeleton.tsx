import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventHeaderSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 items-center gap-6 rounded-xl border border-border bg-background p-4 xl:gap-10",
        className,
      )}
    >
      <div className="col-span-12 lg:col-span-4">
        <Skeleton className="h-[350px] w-full rounded-lg" />
      </div>

      <div className="col-span-12 lg:col-span-8">
        <div className="flex flex-1 flex-col justify-between space-y-4">
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-36 rounded-md" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
      </div>
    </div>
  );
}
