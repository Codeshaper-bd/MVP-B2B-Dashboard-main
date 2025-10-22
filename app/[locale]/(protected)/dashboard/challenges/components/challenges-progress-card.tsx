"use client";

import { ArrowUpIcon } from "lucide-react";
import { memo } from "react";

import useManageStateParams from "@/hooks/useManageStateParams";
import { getFilterText } from "@/lib/getFilterText";
import { cn } from "@/lib/utils";
import { useGetTotalEngagementOfChallengeQuery } from "@/store/api/challenges/challenges-api";
import type { TGetTotalEngagementOfChallengeArgs } from "@/store/api/challenges/challenges.types";
import type { TTimeRange } from "@/store/api/common-api-types";
import InfoIcon from "@/components/icons/InfoIcon";
import PieChartIcon from "@/components/icons/PieChartIcon";
import RenderData from "@/components/render-data";
import PointsGivenSkeleton from "@/components/skeleton/points-given-skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProgressBar from "@/components/ui/ProgressBar";
import ProgressInfo from "@/components/ui/ProgressBar/ProgressArea/Progress/ProgressInfo";
import { Tag } from "@/components/ui/tag";
import { TooltipComponent } from "@/components/ui/tooltip";

import Filters from "./Filters";
import type { TDateRange } from "./overview-content";

function ChallengesProgressCard({
  dateRange,
  activeTime,
}: {
  dateRange: TDateRange;
  activeTime: TTimeRange;
}) {
  const manageStateParamsProps =
    useManageStateParams<Exclude<TGetTotalEngagementOfChallengeArgs, void>>();
  const { getAllParamValue, updateAParam } = manageStateParamsProps;
  const queryParams = getAllParamValue();

  const { type } = queryParams;

  const {
    data: getTotalEngagementOfChallengesRes,
    ...getTotalEngagementOfChallengesApiState
  } = useGetTotalEngagementOfChallengeQuery({
    type,
    startDate: dateRange.from,
    endDate: dateRange.to,
  });

  const getTotalEngagementOfChallengesData =
    getTotalEngagementOfChallengesRes?.data;

  return (
    <Card className="mb-6">
      <CardHeader className="mx-6 border-b border-border px-0 py-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 items-center gap-1.5">
            <PieChartIcon className="h-5 w-5 shrink-0 text-default-1000" />

            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-semibold text-default-900 md:text-lg">
                Total Number of Points Given Out
              </h2>

              <TooltipComponent
                content="Number of points which customers have gained."
                isArrow={true}
              >
                <InfoIcon className="h-4 w-4 shrink-0 text-default-600" />
              </TooltipComponent>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center justify-end gap-3 md:flex-row">
            {type && (
              <Tag
                label={type?.split("_").join(" ")}
                onRemove={() => {
                  updateAParam({
                    key: "type",
                    value: undefined,
                  });
                }}
                className="h-7 border-primary/50 text-sm text-primary"
                iconClass="text-primary/70 hover:text-primary"
              />
            )}
            <div className="flex-none">
              <Filters manageStateParamsProps={manageStateParamsProps} />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-5">
        <RenderData
          expectedDataType="object"
          {...getTotalEngagementOfChallengesApiState}
          data={getTotalEngagementOfChallengesData}
          loadingSkeleton={<PointsGivenSkeleton />}
        >
          <div className="mb-4 flex items-center gap-3">
            <h3 className="text-[30px] font-semibold text-default-900">
              {getTotalEngagementOfChallengesData?.totalPoints}
            </h3>

            <div className="flex items-center gap-1">
              <ArrowUpIcon
                className={cn("h-5 w-5 text-success", {
                  "rotate-180 text-destructive":
                    !getTotalEngagementOfChallengesData?.increase,
                })}
              />
              <span className="text-sm font-medium text-default-600">
                {getTotalEngagementOfChallengesData?.percentage}%
              </span>
              <span className="text-xs font-medium text-[#94969C]">
                {getFilterText(activeTime)}
              </span>
            </div>
          </div>

          <ProgressBar
            value={getTotalEngagementOfChallengesData?.redemptionPercent ?? 0}
          >
            <ProgressBar.ProgressArea>
              <ProgressBar.ProgressArea.Progress
                className={cn("bg-success", {
                  "bg-destructive":
                    !getTotalEngagementOfChallengesData?.increase,
                })}
              >
                <ProgressInfo />
              </ProgressBar.ProgressArea.Progress>
            </ProgressBar.ProgressArea>

            <ProgressBar.ProgressLabel />

            <ProgressBar.ProgressTooltipContent>
              Total Percentage of Points Redeemed
            </ProgressBar.ProgressTooltipContent>
          </ProgressBar>
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default memo(ChallengesProgressCard);
