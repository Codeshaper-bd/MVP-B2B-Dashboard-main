import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function RevenueCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="w-full space-y-4 rounded-lg bg-default-50/20 p-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-6 rounded-full bg-default-50" />
          </div>

          <Skeleton className="h-4 w-32 bg-default-50" />

          <Skeleton className="h-8 w-24 bg-default-50" />
          <Skeleton className="h-4 w-full bg-default-50" />
        </div>
      </CardContent>
    </Card>
  );
}

export default RevenueCardSkeleton;
