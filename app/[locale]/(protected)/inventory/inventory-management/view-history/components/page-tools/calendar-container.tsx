import React from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { Button } from "@/components/ui/button";

interface ICalendarContainerProps {
  children: React.ReactNode;
  dateRangeStart: Date | null;
  dateRangeEnd: Date | null;
  handleCancelApply: () => void;
  handleApply: () => void;
}

function RenderCalendarContainer({
  children,
  dateRangeStart,
  dateRangeEnd,
  handleCancelApply,
  handleApply,
}: ICalendarContainerProps) {
  return (
    <div className="custom-calendar-container flex !flex-col">
      <div>{children}</div>
      <div className="mt-2 flex flex-col items-center justify-between gap-3 border-t border-secondary pb-3 pt-3">
        {dateRangeStart && dateRangeEnd ? (
          <div className="flex items-center gap-2">
            <span className="inline-block rounded-lg border border-secondary !py-5 px-3">
              {dateRangeStart
                ? convertUTCToLocal({
                    utcDateTime: dateRangeStart.toUTCString(),
                    format: "MMM D, YYYY",
                  })
                : "MMM D, YYYY"}
            </span>{" "}
            -{" "}
            <span className="inline-block rounded-lg border border-secondary !py-5 px-3">
              {dateRangeEnd
                ? convertUTCToLocal({
                    utcDateTime: dateRangeEnd.toUTCString(),
                    format: "MMM D, YYYY",
                  })
                : "MMM D, YYYY"}
            </span>
          </div>
        ) : (
          <div className="text-secondary">Select a date range</div>
        )}
        <div>
          <Button
            onClick={handleCancelApply}
            className="mr-3"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            color="primary"
            className="mr-3"
            disabled={!dateRangeStart || !dateRangeEnd}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RenderCalendarContainer;
