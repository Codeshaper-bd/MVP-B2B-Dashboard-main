import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface ITierCardProps {
  iconWrapperClass?: string;
  title: string;
  currency?: string;
  ticketCount: number;
  icon?: React.ReactNode;
}
function TierCard({
  iconWrapperClass,
  icon,
  title,
  ticketCount,
  currency,
}: ITierCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex gap-3">
          {icon && (
            <div className="flex-none">
              <Button
                asChild
                size="icon"
                className={cn("size-12 !bg-[#263CFF]", iconWrapperClass)}
              >
                <span>{icon}</span>
              </Button>
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-base font-normal text-default-600">{title}</h3>
            <p className="text-lg font-medium text-[#CECFD2]">
              {currency}
              {ticketCount}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TierCard;
