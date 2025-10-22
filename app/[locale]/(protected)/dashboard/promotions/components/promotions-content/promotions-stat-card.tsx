import { ArrowUpIcon } from "lucide-react";

import useManageStateParams from "@/hooks/useManageStateParams";
import { getFilterText } from "@/lib/getFilterText";
import { cn } from "@/lib/utils";
import type { TTimeRange } from "@/store/api/common-api-types";
import { useGetTotalEngagementOfPromotionQuery } from "@/store/api/promotion/promotion-api";
import type { TGetTotalEngagementOfPromotionArgs } from "@/store/api/promotion/promotion.types";
import InfoIcon from "@/components/icons/InfoIcon";
import PieChartIcon from "@/components/icons/PieChartIcon";
import RenderData from "@/components/render-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag } from "@/components/ui/tag";
import { TooltipComponent } from "@/components/ui/tooltip";

import type { TDateRange } from ".";
import PromotionsFilter from "./promotions-filter";

function PromotionsStatCard({
  dateRange,
  activeTime,
}: {
  dateRange: TDateRange;
  activeTime: TTimeRange;
}) {
  const queryStateParams =
    useManageStateParams<
      Exclude<TGetTotalEngagementOfPromotionArgs, void | undefined>
    >();
  const { getAllParamValue, updateAParam } = queryStateParams;
  const { status } = getAllParamValue();
  const {
    data: getTotalEngagementOfPromotionRes,
    ...getTotalEngagementOfPromotionApiState
  } = useGetTotalEngagementOfPromotionQuery({
    startDate: activeTime === "all" ? undefined : dateRange.from,
    endDate: activeTime === "all" ? undefined : dateRange.to,
    status: status || undefined,
  });
  const getTotalEngagementOfPromotionData =
    getTotalEngagementOfPromotionRes?.data;
  return (
    <Card>
      <CardHeader className="border-b border-border py-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 items-center gap-1">
            <PieChartIcon className="h-5 w-5 shrink-0 text-default-1000" />

            <div className="flex items-center gap-1">
              <h2 className="text-lg font-semibold text-default-900">
                Total Uses
              </h2>

              <TooltipComponent
                content="Number of promotion which have been attempted"
                isArrow={true}
              >
                <InfoIcon className="h-4 w-4 shrink-0 text-default-600" />
              </TooltipComponent>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center justify-end gap-3 md:flex-row">
            {status && (
              <Tag
                label={status?.split("_").join(" ")}
                onRemove={() => {
                  updateAParam({
                    key: "status",
                    value: undefined,
                  });
                }}
                className="h-7 border-primary/50 text-sm text-primary"
                iconClass="text-primary/70 hover:text-primary"
              />
            )}
            <div className="flex-none">
              <PromotionsFilter queryStateParams={queryStateParams} />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-5">
        <RenderData
          expectedDataType="object"
          data={getTotalEngagementOfPromotionData}
          {...getTotalEngagementOfPromotionApiState}
          loadingSkeleton={
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-12" />
            </div>
          }
        >
          <div className="mb-4 flex items-center gap-3">
            <h3 className="text-[30px] font-semibold text-default-900">
              {getTotalEngagementOfPromotionData?.totalCount}
            </h3>

            <div className="flex items-center gap-1">
              <ArrowUpIcon
                className={cn("h-5 w-5 text-success", {
                  "rotate-180 text-destructive":
                    !getTotalEngagementOfPromotionData?.increase,
                })}
              />
              <span className="text-sm font-medium text-default-600">
                {getTotalEngagementOfPromotionData?.percentage}%
              </span>
              <span className="text-xs font-medium text-[#94969C]">
                {getFilterText(activeTime)}
              </span>
            </div>
          </div>
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default PromotionsStatCard;
