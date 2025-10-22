"use client";

import Link from "next/link";
import { memo } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getActivityLink } from "@/lib/get-activity-link";
import { useGetAnEmployeeActivityQuery } from "@/store/api/employees-logs/employees-log-api";
import { selectAuthUserId } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import RenderData from "@/components/render-data";
import InputSkeleton from "@/components/skeleton/input-skeleton";

function ActivityLogs() {
  const authUserId = useAppSelector(selectAuthUserId);
  const { data: getAnEmployeeActivityRes, ...getAnEmployeeActivityApiState } =
    useGetAnEmployeeActivityQuery({ employeeId: authUserId });
  const getAnEmployeeActivityData = getAnEmployeeActivityRes?.data ?? [];
  return (
    <RenderData
      expectedDataType="array"
      {...getAnEmployeeActivityApiState}
      data={getAnEmployeeActivityData}
      loadingSkeleton={<InputSkeleton />}
      dataNotFoundTitle="No activity found"
      dataNotFoundSubtitle="There is no activity history available for this employee."
    >
      <ol className="space-y-3 pt-5 text-sm text-default-900">
        {getAnEmployeeActivityData?.map((activity, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-default-600">
              •{" "}
              {convertUTCToLocal({
                utcDateTime: activity?.createdAt,
                format: "DD/MM/YYYY HH:MM:A",
              })}
              :
            </span>
            <span
              className={
                activity.event.includes("create")
                  ? "text-success"
                  : activity.event.includes("delete")
                    ? "text-warning"
                    : ""
              }
            >
              {activity?.description}
            </span>
            <span
              className={
                activity.event.includes("create")
                  ? "text-success"
                  : activity.event.includes("delete")
                    ? "text-warning"
                    : ""
              }
            >
              #{activity?.subjectId}
            </span>
            <Link href={getActivityLink(activity)}>
              <ArrowLeftIcon className="size-5 rotate-180 text-primary" />
            </Link>
          </li>
        ))}
      </ol>
    </RenderData>
  );
}

export default memo(ActivityLogs);
