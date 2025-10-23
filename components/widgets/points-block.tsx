"use client";

import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";
import { Link } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
interface PointsBlockProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  total?: number | string | TNullish;
  iconWrapperClass?: string;
  href?: string;
  filterLabel?: string;
}

function PointsBlock({
  title,
  total,
  className,
  icon,
  iconWrapperClass,
  href,
  filterLabel,
}: PointsBlockProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-5 flex items-center">
          {icon && (
            <div className="flex-none">
              <div
                className={cn(
                  "flex h-10 w-10 flex-col items-center justify-center rounded-full border border-border-primary text-2xl",
                  iconWrapperClass,
                )}
              >
                {icon}
              </div>
            </div>
          )}
        </div>
        {title && (
          <h2 className="mb-1 text-sm font-normal text-default-700">{title}</h2>
        )}

        <div className="mb-6 flex items-center gap-2">
          <span className="text-2xl font-medium text-default-900 lg:text-[32px]">
            {convertToNumber({
              value: total,
              digit: 2,
              fallback: 0,
            })}
          </span>

          {filterLabel && (
            <span className="text-sm font-medium text-default-600">
              {filterLabel}
            </span>
          )}
        </div>
        <Button
          color="secondary"
          fullWidth
          asChild
          className="border-default-100 bg-[#161B26] text-[#85888E]"
        >
          <Link href={href || "#"} className="flex items-center gap-1">
            See Details <RightArrowIcon className="h-4 w-4" />{" "}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { PointsBlock };
