import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent } from "../ui/card";

function AreaChartSkeleton() {
  return (
    <Card className="h-[250px] p-0">
      <CardContent className="relative h-full p-4">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(18)].map((_, index) => (
            <Skeleton key={index} className="h-6 rounded-md bg-default-50" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AreaChartSkeleton;
