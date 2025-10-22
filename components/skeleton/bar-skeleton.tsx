import { Skeleton } from "@/components/ui/skeleton";

export default function BarSalesSkeleton() {
  return (
    <div className="w-full space-y-6 rounded-xl border border-border bg-background p-4">
      <div className="grid grid-cols-3 items-center gap-6">
        <Skeleton className="col-span-1 size-36 rounded-full" />
        <div className="col-span-2 space-y-2">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-32 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
