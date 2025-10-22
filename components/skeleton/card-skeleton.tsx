import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton({ length = 6 }: { length?: number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32 rounded-md" />
          {Array.from({ length }).map((_, i) => (
            <div key={i} className="flex flex-wrap justify-between gap-4">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
