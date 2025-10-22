import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PointsGivenSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="w-full space-y-6 bg-default-50/20 p-4">
          <Skeleton className="h-6 w-10 bg-default-50" />

          <Skeleton className="h-5 w-full rounded-full bg-default-50" />

          <Skeleton className="h-6 w-6 bg-default-50" />
        </div>
      </CardContent>
    </Card>
  );
}
