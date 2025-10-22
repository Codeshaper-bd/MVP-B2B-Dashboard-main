"use client";
import type { Dayjs } from "dayjs";
import { CloudDownload } from "lucide-react";

import { cn } from "@/lib/utils";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import DateTimeFilters, {
  type TTimeRange,
} from "@/components/features/filters/DateTimeFilters";
import EventDropDown from "@/components/modules/sales-revenue/DropDowns/EventDropDown";
import FilterTypeDropDown from "@/components/modules/sales-revenue/DropDowns/FilterTypeDropDown";
import CompareEventsModal from "@/components/modules/sales-revenue/Modals/CompareEventsModal";
import SelectEventModal from "@/components/modules/sales-revenue/Modals/SelectEventModal";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import { Button } from "@/components/ui/button";

function SalesRevenueTopBar() {
  const {
    values: { dateRange, tempFilterType, activeTime: activeTimeState },
  } = useSalesRevenueFilterContext();

  const handleDateRangeChange = ({
    from,
    to,
    activeTime,
  }: {
    from: Dayjs;
    to: Dayjs;
    activeTime: TTimeRange;
  }) => {
    dateRange.set({
      from: from.toDate(),
      to: to.toDate(),
    });
    activeTimeState.set(activeTime);
  };
  const isCompareEvent = tempFilterType?.value?.value === "compareEvents";
  return (
    <div
      className={cn("", {
        "flex flex-col gap-6 lg:flex-row lg:items-center": isCompareEvent,
      })}
    >
      <DynamicBreadcrumb className="mb-0 lg:mb-0" />

      <div
        className={cn("mb-4 mt-6 space-y-6", {
          "m-0": isCompareEvent,
        })}
      >
        <div className="flex gap-3">
          <div className="flex-1">
            {!isCompareEvent && (
              <DateTimeFilters onChange={handleDateRangeChange} />
            )}
          </div>
          <div className="flex flex-none flex-wrap items-center gap-3">
            <FilterTypeDropDown />
            <Button color="secondary" asChild>
              <a href="/files/event.csv" download="event.csv" target="_blank">
                <CloudDownload className="me-1 h-5 w-5" /> Download
              </a>
            </Button>
            <SelectEventModal />
            <CompareEventsModal />
          </div>
        </div>
        <EventDropDown />
      </div>
    </div>
  );
}

export default SalesRevenueTopBar;
