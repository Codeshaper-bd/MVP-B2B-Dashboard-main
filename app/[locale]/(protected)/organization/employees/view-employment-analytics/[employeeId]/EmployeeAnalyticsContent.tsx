"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import {
  useFetchEmployeePerformanceData,
  type TPageParams,
} from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getActivityLink } from "@/lib/get-activity-link";
import { ArrowLeftIcon as ArrowLeftIcon } from "@/components/icons";
import { NoDataFound } from "@/components/icons/NoDataFound";
import AnalyticsEmployeeInfo from "@/components/modules/employees/analytics/AnalyticsEmployeeInfo";
import GuestListCard from "@/components/modules/employees/analytics/GuestListCard";
import TicketScanChart from "@/components/modules/employees/compared/TicketScanChart";
import ViewContent, {
  type TSelectedEvent,
} from "@/components/modules/employees/compared/ViewContent";
import RenderData from "@/components/render-data";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import EmployeeDetailsSkeleton from "@/components/skeleton/EmployeeDetailsSkeleton";
import { Separator } from "@/components/ui/separator";

function EmployeeAnalyticsContent() {
  const [selectedEvent, setSelectedEvent] = useState<TSelectedEvent>(null);
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const { employeeId } = useParams<TPageParams>();
  const { getAnEmployeePerformanceData, getAnEmployeePerformanceApiState } =
    useFetchEmployeePerformanceData({
      employeeId,
      eventId: selectedEvent?.value,
    });
  const { getAnEmployeeActivityData, getAnEmployeeActivityApiState } =
    useFetchEmployeePerformanceData({
      employeeId,
      eventId: selectedEvent?.value,
    });
  return (
    <RenderData
      expectedDataType="object"
      data={getAnEmployeePerformanceData}
      {...{
        ...getAnEmployeePerformanceApiState,
        ...getAnEmployeeActivityApiState,
      }}
      loadingSkeleton={<EmployeeDetailsSkeleton columns={1} />}
    >
      <div className="space-y-6">
        <AnalyticsEmployeeInfo
          showActivity={showActivity}
          setShowActivity={setShowActivity}
          eventId={selectedEvent?.value}
          employeeId={employeeId}
          employeeData={getAnEmployeePerformanceData}
        />

        {showActivity ? (
          <ViewContent
            title="Activity History"
            selectedEvent={selectedEvent ?? null}
            setSelectedEvent={
              setSelectedEvent as React.Dispatch<
                React.SetStateAction<IOption | null>
              >
            }
          >
            <Separator className="mb-5" />

            <ol className="space-y-3 text-sm text-default-900">
              {getAnEmployeeActivityData &&
              getAnEmployeeActivityData.length > 0 ? (
                getAnEmployeeActivityData.map((activity, index) => (
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
                      className={`${activity.event.includes("create") ? "text-success" : ""}`}
                    >
                      {activity?.description}
                    </span>
                    <span
                      className={`${activity.event.includes("create") ? "text-success" : ""}`}
                    >
                      #{activity?.subjectId}
                    </span>
                    <Link href={getActivityLink(activity)}>
                      <ArrowLeftIcon className="size-5 rotate-180 text-primary" />
                    </Link>
                  </li>
                ))
              ) : (
                <div className="flex flex-col items-center gap-2 text-sm text-default-500">
                  <NoDataFound className="size-16" />
                  No activity found
                </div>
              )}
            </ol>
          </ViewContent>
        ) : (
          <ViewContent
            title="Analytics Overview"
            selectedEvent={selectedEvent ?? null}
            setSelectedEvent={
              setSelectedEvent as React.Dispatch<
                React.SetStateAction<IOption | null>
              >
            }
          >
            <div className="space-y-6">
              <GuestListCard
                eventId={selectedEvent?.value}
                employeeId={employeeId}
                employeeData={getAnEmployeePerformanceData}
              />
              <TicketScanChart
                eventId={selectedEvent?.value}
                employeeId={employeeId}
                employeeData={getAnEmployeePerformanceData}
              />
            </div>
          </ViewContent>
        )}
      </div>
    </RenderData>
  );
}

export default EmployeeAnalyticsContent;
