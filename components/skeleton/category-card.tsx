import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryCardSkeleton() {
  return (
    <div className="flex w-28 flex-col items-center gap-2">
      <Skeleton className="h-20 w-20 rounded-md" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
