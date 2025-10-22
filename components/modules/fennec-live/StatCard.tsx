import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export type TStatCard = {
  name: string;
  value: number;
  icon: React.ReactNode;
  iconWrapperClass?: string;
};
function StatCard({ icon, name, value, iconWrapperClass }: TStatCard) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg bg-[#263CFF]",
              iconWrapperClass,
            )}
          >
            {icon}
          </div>
          <p className="text-sm font-normal text-default-600">{name}</p>
          <p className="font-semibold text-[#CECFD2]">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
