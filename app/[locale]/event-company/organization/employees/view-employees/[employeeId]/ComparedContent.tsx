import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import {
  useFetchEmployeePerformanceData,
  type TPageParams,
} from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getActivityLink } from "@/lib/get-activity-link";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { NoDataFound } from "@/components/icons/NoDataFound";
import ActivityList from "@/components/modules/employees/ActivityList";
import BartendarCard from "@/components/modules/employees/compared/BartenderCard";
import DrinksSoldChart from "@/components/modules/employees/compared/DrinksSoldChart";
import EmployeeInfo from "@/components/modules/employees/compared/EmployeeInfo";
import GuestlistCard from "@/components/modules/employees/compared/GuestlistCard";
import TicketScanChart from "@/components/modules/employees/compared/TicketScanChart";
import ViewContent, {
  type TSelectedEvent,
} from "@/components/modules/employees/compared/ViewContent";
import type { TCompareIdProps } from "@/components/modules/employees/modals/CompareEmployeeDialog/compare-form";
import RenderData from "@/components/render-data";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import EmployeeDetailsSkeleton from "@/components/skeleton/EmployeeDetailsSkeleton";
import { Separator } from "@/components/ui/separator";

function ComparedContent() {
  const { getAllParamValue } = useManageSearchParams<TCompareIdProps>();
  const { compareEmployeeId } = getAllParamValue();
  const [selectedEvent, setSelectedEvent] = useState<TSelectedEvent>(null);
  const [selectedEvent2, setSelectedEvent2] = useState<TSelectedEvent>(null);
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const [showActivity2, setShowActivity2] = useState<boolean>(false);
  const { employeeId } = useParams<TPageParams>();

  const { getAnEmployeePerformanceData, getAnEmployeePerformanceApiState } =
    useFetchEmployeePerformanceData({
      employeeId,
      eventId: selectedEvent?.value,
    });
  const {
    getAnEmployeePerformanceData: getAnEmployeePerformanceCompareData,
    getAnEmployeePerformanceApiState: getAnEmployeePerformanceCompareApiState,
  } = useFetchEmployeePerformanceData({
    employeeId: compareEmployeeId,
    eventId: selectedEvent2?.value,
  });

  const {
    getAnEmployeeActivityData: getAnEmployeeActivityCompareData,
    getAnEmployeeActivityApiState: getAnEmployeeActivityCompareApiState,
  } = useFetchEmployeePerformanceData({
    employeeId: compareEmployeeId,
    eventId: selectedEvent2?.value,
  });
  return (
    <RenderData
      expectedDataType="object"
      data={getAnEmployeePerformanceCompareData}
      {...{
        ...getAnEmployeePerformanceApiState,
        ...getAnEmployeePerformanceCompareApiState,
        ...getAnEmployeeActivityCompareApiState,
      }}
      loadingSkeleton={<EmployeeDetailsSkeleton columns={2} />}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <EmployeeInfo
            showActivity={showActivity}
            setShowActivity={setShowActivity}
            employeeId={employeeId}
            eventId={selectedEvent?.value}
            employeeData={getAnEmployeePerformanceData}
            isFromCompare={true}
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

              <ActivityList employeeId={employeeId} />
            </ViewContent>
          ) : (
            <ViewContent
              title="View Performance For"
              selectedEvent={selectedEvent ?? null}
              setSelectedEvent={
                setSelectedEvent as React.Dispatch<
                  React.SetStateAction<IOption | null>
                >
              }
            >
              <div className="space-y-6">
                <GuestlistCard
                  employeeId={employeeId}
                  eventId={selectedEvent?.value}
                  employeeData={getAnEmployeePerformanceData}
                />
                <TicketScanChart
                  eventId={selectedEvent?.value}
                  employeeId={employeeId}
                  employeeData={getAnEmployeePerformanceData}
                />
                <BartendarCard
                  employeeId={employeeId}
                  eventId={selectedEvent?.value}
                  employeeData={getAnEmployeePerformanceData}
                />
                <DrinksSoldChart
                  eventId={selectedEvent?.value}
                  employeeId={employeeId}
                  employeeData={getAnEmployeePerformanceData}
                />
              </div>
            </ViewContent>
          )}
        </div>
        <div className="space-y-6">
          <EmployeeInfo
            showActivity={showActivity2}
            setShowActivity={setShowActivity2}
            employeeId={compareEmployeeId}
            eventId={selectedEvent2?.value}
            employeeData={getAnEmployeePerformanceCompareData}
          />
          {showActivity2 ? (
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
                {getAnEmployeeActivityCompareData &&
                getAnEmployeeActivityCompareData.length > 0 ? (
                  getAnEmployeeActivityCompareData.map((activity, index) => (
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
              title="View Performance For"
              selectedEvent={selectedEvent2 ?? null}
              setSelectedEvent={
                setSelectedEvent2 as React.Dispatch<
                  React.SetStateAction<IOption | null>
                >
              }
            >
              <div className="space-y-6">
                <GuestlistCard
                  employeeId={compareEmployeeId}
                  eventId={selectedEvent2?.value}
                  employeeData={getAnEmployeePerformanceCompareData}
                />
                <TicketScanChart
                  eventId={selectedEvent?.value}
                  employeeId={compareEmployeeId}
                  employeeData={getAnEmployeePerformanceCompareData}
                />

                <BartendarCard
                  employeeId={compareEmployeeId}
                  eventId={selectedEvent2?.value}
                  employeeData={getAnEmployeePerformanceCompareData}
                />
                <DrinksSoldChart
                  eventId={selectedEvent2?.value}
                  employeeId={employeeId}
                  employeeData={getAnEmployeePerformanceCompareData}
                />
              </div>
            </ViewContent>
          )}
        </div>
      </div>
    </RenderData>
  );
}

export default ComparedContent;
