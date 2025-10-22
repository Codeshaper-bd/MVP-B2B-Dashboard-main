"use client";
import { memo } from "react";

import { useGetFeedBackOverviewQuery } from "@/store/api/feedback/feedback-api";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import Rating from "@/components/ui/Rating";
import { Skeleton } from "@/components/ui/skeleton";

function SummaryStatistics() {
  const { data: getFeedBackOverviewRes, ...getFeedBackOverviewApiState } =
    useGetFeedBackOverviewQuery();
  const getFeedBackOverviewData = getFeedBackOverviewRes?.data;
  const { positivePercentage, totalFeedback, averageRating } =
    getFeedBackOverviewData || {};
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold leading-7 text-default-900">
          Summary Statistics
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <RenderData
          data={getFeedBackOverviewData}
          {...getFeedBackOverviewApiState}
          expectedDataType="object"
          loadingSkeleton={
            <SkeletonWrapper size={3}>
              <div className="mb-3">
                <div className="flex justify-between gap-2">
                  <Skeleton className="h-4 w-1/5 rounded-full" />
                  <Skeleton className="h-4 w-1/5 rounded-full" />
                </div>
              </div>
            </SkeletonWrapper>
          }
        >
          <div className="space-y-4">
            <div className="flex justify-between text-base font-normal leading-5 text-default-700">
              <p>Total Feedback</p>
              <div className="flex items-center gap-2">
                <Icon icon="uiw:message" />
                <span>{totalFeedback}</span>
              </div>
            </div>
            <div className="flex justify-between text-base font-normal leading-5 text-default-700">
              <p>Avg.Rating</p>
              <div className="flex flex-wrap-reverse items-end justify-end gap-2 md:items-center">
                <Rating rating={averageRating || 0} className="size-4" />{" "}
                <span>{averageRating} / 5</span>
              </div>
            </div>
            <div className="flex justify-between text-base font-normal leading-5 text-default-700">
              <p>Positive</p>
              <p>{positivePercentage} / 100%</p>
            </div>
          </div>
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default memo(SummaryStatistics);
