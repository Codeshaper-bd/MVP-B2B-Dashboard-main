"use client";
import { memo, useMemo } from "react";

import { useGetFeedBackOverviewQuery } from "@/store/api/feedback/feedback-api";
import ApexDonutChart from "@/components/charts/apex-donut-chart";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SentimentAnalysis() {
  const { data: getFeedBackOverviewRes, ...getFeedBackOverviewApiState } =
    useGetFeedBackOverviewQuery();
  const getFeedBackOverviewData = getFeedBackOverviewRes?.data;
  const {
    negativePercentage,
    neutralPercentage,
    positivePercentage,
    totalFeedback,
    negativeCount,
    neutralCount,
    positiveCount,
  } = getFeedBackOverviewData || {};

  const chartLabels = useMemo(
    () => [
      `Positive ${positivePercentage}%`,
      `Negative ${negativePercentage}%`,
      `Neutral ${neutralPercentage}%`,
    ],
    [positivePercentage, negativePercentage, neutralPercentage],
  );
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold leading-7 text-default-900">
          Sentiment Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <RenderData
          data={getFeedBackOverviewData}
          {...getFeedBackOverviewApiState}
          expectedDataType="object"
          loadingSkeleton={
            <SkeletonWrapper size={1}>
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="size-36 rounded-full" />
                  <div className="space-y-2.5">
                    <Skeleton className="h-4 w-28 rounded-full" />
                    <Skeleton className="h-4 w-28 rounded-full" />
                    <Skeleton className="h-4 w-28 rounded-full" />
                  </div>
                </div>
              </div>
            </SkeletonWrapper>
          }
        >
          <ApexDonutChart
            labels={chartLabels}
            series={[positiveCount ?? 0, negativeCount ?? 0, neutralCount ?? 0]}
            colors={["#FEC84B", "#FDA29B", "#17B26A"]}
            height={216}
            totalValueFormatterText="$"
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default memo(SentimentAnalysis);
