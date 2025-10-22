import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImageSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn(
        "size-full rounded-md border border-default-200 bg-default-50",
        className,
      )}
    />
  );
}
