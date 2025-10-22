import { Skeleton } from "@/components/ui/skeleton";

export default function RevenueStatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 rounded-xl border border-border bg-background p-4">
      <div className="flex flex-col items-center">
        <Skeleton className="mb-2 h-4 w-24 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
      <div className="flex flex-col items-center">
        <Skeleton className="mb-2 h-4 w-24 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
      <div className="flex flex-col items-center">
        <Skeleton className="mb-2 h-4 w-24 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
    </div>
  );
}
