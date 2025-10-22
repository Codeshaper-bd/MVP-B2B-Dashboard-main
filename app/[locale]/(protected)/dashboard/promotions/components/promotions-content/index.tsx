"use client";
import { type Dayjs } from "dayjs";
import { useState } from "react";

import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import DateTimeFilters, {
  type TTimeRange,
} from "@/components/features/filters/DateTimeFilters";

import PromotionsStatCard from "./promotions-stat-card";
import CreatePromotionModal from "../Modals/CreatePromotionModal";
import TopPromotionsTable from "../promotions-table";
import PromotionsRevenueChart from "./promotions-revenue-chart";

export type TDateRange = {
  from: string | undefined;
  to: string | undefined;
};

function PromotionsContent() {
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
      <div className="my-6 flex w-full flex-col lg:flex-row lg:items-center">
        <div className="flex-none">
          <DynamicBreadcrumb className="lg:mb-0" />
        </div>

        <div className="flex flex-1 flex-wrap gap-3 lg:justify-end">
          <CreatePromotionModal />
        </div>
      </div>

      <div className="my-6">
        <DateTimeFilters onChange={handleDateRangeChange} />
      </div>

      <div className="space-y-6">
        <PromotionsStatCard dateRange={dateRange} activeTime={activeTime} />
        <TopPromotionsTable dateRange={dateRange} />
        <PromotionsRevenueChart dateRange={dateRange} activeTime={activeTime} />
      </div>
    </div>
  );
}

export default PromotionsContent;
