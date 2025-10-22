import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent } from "../ui/card";

function AverageBarSkeleton() {
  return (
    <Card className="h-[250px] p-0">
      <CardContent className="relative h-full p-4">
        <div className="grid grid-cols-12 gap-4">
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} className="h-44 rounded-md bg-default-50" />
          ))}
        </div>
        <Skeleton className="mt-4 h-6 rounded-md bg-default-50" />
      </CardContent>
    </Card>
  );
}

export default AverageBarSkeleton;
