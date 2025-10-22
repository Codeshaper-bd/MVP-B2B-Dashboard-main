"use client";
import { type Dayjs } from "dayjs";
import { memo, useState } from "react";

import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import DateTimeFilters, {
  type TTimeRange,
} from "@/components/features/filters/DateTimeFilters";

import ChallengesProgressCard from "./challenges-progress-card";
import ChallengesRevenueChart from "./challenges-revenue-chart";
import CreateChallengeModal from "./Modals/CreateChallengeModal";
import TopChallengesTable from "./TopChallengesTable";

export type TDateRange = {
  from: string | undefined;
  to: string | undefined;
};
function Overview() {
  const [dateRange, setDateRange] = useState<TDateRange>({
    from: undefined,
    to: undefined,
  });
  const [activeTime, setActiveTime] = useState<TTimeRange>("all");

  const handleDateRangeChange = ({
    from,
    to,
    activeTime,
  }: {
    from: Dayjs;
    to: Dayjs;
    activeTime: TTimeRange;
  }) => {
    setDateRange({
      from: convertLocalToUTC({
        localDateTime: from.toDate(),
        type: "startOfDay",
      }),
      to: convertLocalToUTC({
        localDateTime: to.toDate(),
        type: "endOfDay",
      }),
    });
    setActiveTime(activeTime);
  };

  return (
    <div>
      <div className="my-6 flex w-full flex-col items-start md:flex-row">
        <div className="flex-none">
          <DynamicBreadcrumb className="lg:mb-0" />
        </div>

        <div className="flex flex-1 flex-wrap gap-3 md:justify-end">
          <CreateChallengeModal triggerButtonWithoutIcon mode="server-create" />
        </div>
      </div>
      <div className="my-6">
        <DateTimeFilters onChange={handleDateRangeChange} />
      </div>

      <ChallengesProgressCard dateRange={dateRange} activeTime={activeTime} />

      <TopChallengesTable dateRange={dateRange} />
      <div className="h-6"></div>
      <ChallengesRevenueChart dateRange={dateRange} activeTime={activeTime} />
    </div>
  );
}

export default memo(Overview);
