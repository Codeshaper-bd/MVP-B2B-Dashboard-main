import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
function EmployeeCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Top Row with Image + Status */}
        <div className="flex items-start justify-between">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Name */}
        <Skeleton className="h-4 w-3/4 rounded-md" />

        {/* Email Row */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>

        {/* Role Button */}
        <Skeleton className="h-6 w-20 rounded-full" />

        {/* Icons Row (Edit/Delete) */}
        <div className="flex justify-end gap-3 pt-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export default EmployeeCardSkeleton;
