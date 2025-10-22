"use client";

import { cn } from "@/lib/utils";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import { Card, CardContent } from "@/components/ui/card";

interface StatisticsBlockProps {
  title?: string;
  icon?: React.ReactNode;
  total?: number | string;
  iconWrapperClass?: string;
  isIncrease?: boolean;
  percentage?: string;
}

function AnalyticsBlock({
  title,
  total,
  icon,
  iconWrapperClass,
  isIncrease = false,
  percentage,
}: StatisticsBlockProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-5 flex items-center">
          {icon && (
            <div className="flex-none">
              <div
                className={cn(
                  "flex h-10 w-10 flex-col items-center justify-center rounded-[8px] border border-border-primary text-2xl",
                  iconWrapperClass,
                )}
              >
                {icon}
              </div>
            </div>
          )}
        </div>

        {title && (
          <h2 className="mb-1 text-base font-normal text-default-700">
            {title}
          </h2>
        )}

        <div className="flex items-center gap-2">
          {total && (
            <div className="text-xl font-semibold text-default-700">
              {total}
            </div>
          )}
          <div className="flex items-center gap-1">
            <ArrowDownIcon
              className={cn("size-4 rotate-180 text-[#47CD89]", {
                "text-[#F97066]": !isIncrease,
              })}
            />
            <div
              className={cn("text-sm font-medium", {
                "text-[#F97066]": !isIncrease,
              })}
            >
              {percentage}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnalyticsBlock;
