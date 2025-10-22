import type { DateRange } from "react-day-picker";

import { getQuickTimeRange } from "@/lib/date-time/get-dayjs-date-selection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IQuickTimeRange {
  label: string;
  value: string;
  startDate?: string;
  endDate?: string;
}

const quickTimeRanges: IQuickTimeRange[] = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This week", value: "thisWeek" },
  { label: "Last week", value: "lastWeek" },
  { label: "This month", value: "thisMonth" },
  { label: "Last month", value: "lastMonth" },
  { label: "This year", value: "thisYear" },
  { label: "Last year", value: "lastYear" },
  { label: "All Time", value: "allTime" },
];

interface QuickTimeProps {
  date: DateRange;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
  setTempDate: React.Dispatch<React.SetStateAction<DateRange>>;
}
function QuickTime({ date, setDate, setTempDate }: QuickTimeProps) {
  return (
    <div className="flex max-w-[192px] flex-col p-4">
      {quickTimeRanges.map((item) => {
        const isSelected =
          JSON.stringify(date) ===
          JSON.stringify(getQuickTimeRange(item.value));

        return (
          <Button
            key={item.value}
            className={cn(
              "h-10 justify-start border-none bg-transparent capitalize",
              { "bg-secondary text-default-1000": isSelected },
            )}
            onClick={() => {
              setDate(getQuickTimeRange(item.value));
              setTempDate(getQuickTimeRange(item.value));
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}

export default QuickTime;
