import { Skeleton } from "@/components/ui/skeleton";

export default function TotalEventRevenueSkeleton() {
  return (
    <div className="w-full rounded-xl border border-border bg-background p-4">
      <Skeleton className="mb-4 h-5 w-40 rounded-md" />
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="size-24 rounded-full" />
        <Skeleton className="h-4 w-24 rounded-md" />
        <div className="flex flex-col gap-2 pt-2">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-3 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
