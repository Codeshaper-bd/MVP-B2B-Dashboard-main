"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = React.memo(
  ({
    className,
    classNames,
    showOutsideDays = true,
    ...props
  }: CalendarProps) => (
    <DayPicker
      {...props}
      showOutsideDays={showOutsideDays}
      className={cn(
        "border-default-200 p-0 dark:border-default-300 md:p-3",
        className,
      )}
      classNames={{
        nav_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-0 !text-default-700 hover:!text-default-800",
        ),
        months:
          "w-full  space-y-4 sm:gap-x-4 sm:space-y-0 !bg-primary-foreground flex items-start justify-between",
        month: "space-y-4",
        caption:
          "flex justify-center py-1 relative items-center bg-transparent",

        caption_label: "text-base font-medium text-default-700",
        nav: "gap-x-1 flex items-center",
        nav_button_previous: "absolute start-2",
        nav_button_next: "absolute end-2",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "flex-1 text-muted-foreground min-w-9 font-normal text-[0.8rem] !text-default-700 !text-sm !leading-5 !font-medium !px-2 !py-2.5",
        row: "flex w-full mt-[1px]",
        cell: "flex-1 text-center text-sm  relative   focus-within:relative focus-within:z-20",
        day: "!min-h-10 !min-w-10  -mx-[1px] font-normal aria-selected:bg-secondary  aria-selected:text-default-700   text-default-700 text-current hover:text-default-600",
        day_selected:
          "bg-red-500 text-default-700 hover:bg-default hover:text-default-foreground focus:bg-primary focus:text-default-foreground",
        day_today: "",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:text-default-700 aria-selected:bg-secondary !area-selected:rounded-none",
        day_hidden: "invisible",
        day_range_start: "!bg-primary rounded-full  !text-black relative",
        day_range_end: "!bg-primary rounded-full !text-black",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
    />
  ),
);

Calendar.displayName = "Calendar";

export { Calendar };
