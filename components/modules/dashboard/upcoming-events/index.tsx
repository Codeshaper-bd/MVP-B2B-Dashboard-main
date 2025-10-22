"use client";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { useGetDashboardUpcomingEventsQuery } from "@/store/api/dashboard/dashboard-api";
import RenderData from "@/components/render-data";
import { ScrollArea } from "@/components/ui/scroll-area";

import DashboardEventsSection from "../dashboard-events-section";
import DashboardEventCard from "../dashboard-events-section/dashboard-event-card";
interface IUpcomingEventsProps {
  seeAllHref?: string;
}
function UpcomingEvents({
  seeAllHref = "/en/events/upcoming-events",
}: IUpcomingEventsProps) {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: today.toDate(),
    to: today.endOf("month").toDate(),
  });

  const utcDateForApi = selectedDate && {
    specificDate: convertLocalToUTC({
      localDateTime: selectedDate?.toDate(),
      type: "endOfDay",
    }),
  };

  const utcRangeForApi = dateRange && {
    startDate: convertLocalToUTC({
      localDateTime: dateRange.from,
      type: "startOfDay",
    }),
    endDate: convertLocalToUTC({
      localDateTime: dateRange.to,
      type: "endOfDay",
    }),
  };

  const queryArgs = utcDateForApi ?? utcRangeForApi;

  const {
    data: getDashboardUpcomingEventsRes,
    ...getDashboardUpcomingEventsApiState
  } = useGetDashboardUpcomingEventsQuery(queryArgs ?? {});

  const getDashboardUpcomingEventsData = getDashboardUpcomingEventsRes?.data;

  return (
    <DashboardEventsSection
      title="Upcoming Events"
      seeAllHref={seeAllHref}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      dateRange={dateRange}
      setDateRange={setDateRange}
    >
      <RenderData
        expectedDataType="array"
        data={getDashboardUpcomingEventsData}
        {...getDashboardUpcomingEventsApiState}
        dataNotFoundTitle="No Events found"
        dataNotFoundSubtitle="There are no upcoming events for the selected date."
      >
        <ScrollArea className="h-[388px]">
          <div className="space-y-2.5 px-4">
            {getDashboardUpcomingEventsData?.map((item, index) => (
              <DashboardEventCard key={index} item={item} />
            ))}
          </div>
        </ScrollArea>
      </RenderData>
    </DashboardEventsSection>
  );
}

export default UpcomingEvents;
