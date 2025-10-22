import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface InputSkeletonProps {
  length?: number;
  alignment?: "items-start" | "items-center" | "items-end";
}

export default function InputSkeleton({
  length = 6,
  alignment = "items-start",
}: InputSkeletonProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className={`flex flex-col ${alignment} space-y-4`}>
          {Array.from({ length }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-[40%] rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
