"use client";
import { type Dayjs } from "dayjs";
import Link from "next/link";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { DateRange } from "react-day-picker";

import useBooleanState from "@/hooks/useBooleanState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DateSwiper from "@/components/ui/date-swiper";

import CalendarModal from "./calendar-modal";

type EventsSectionProps = {
  title?: string;
  seeAllHref?: string;
  children: ReactNode;
  selectedDate: Dayjs | undefined;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | undefined>>;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
};

function DashboardEventsSection({
  title = "Events",
  seeAllHref,
  children,
  selectedDate,
  setSelectedDate,
  dateRange,
  setDateRange,
}: EventsSectionProps) {
  const {
    state: isViewCalendarModalOpen,
    setState: setViewCalendarModalState,
    setOpen: setViewCalendarModalOpen,
  } = useBooleanState();

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center">
          <CardTitle className="flex-1 text-base">{title}</CardTitle>

          {seeAllHref && (
            <div className="flex-none">
              <Button
                color="secondary"
                size="md"
                className="text-[#85888E] hover:text-[#85888E]"
                asChild
              >
                <Link href={seeAllHref}>See All</Link>
              </Button>
            </div>
          )}
        </div>

        <DateSwiper
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dateRange={dateRange}
          setDateRange={setDateRange}
          setViewCalendarModalOpen={setViewCalendarModalOpen}
        />
        <CalendarModal
          open={isViewCalendarModalOpen}
          onOpenChange={setViewCalendarModalState}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </CardHeader>

      <CardContent className="h-[420px] overflow-hidden px-0 py-4">
        {children}
      </CardContent>
    </Card>
  );
}

export default DashboardEventsSection;
