"use client";

import { cn } from "@/lib/utils";
import type { TTimeRange } from "@/store/api/dashboard/dashboard.types";
import { selectFilter, setFilter } from "@/store/features/dashboard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import HostEventButton from "../Buttons/HostEventButton";

type TEventTimeOption = {
  label: string;
  value: TTimeRange;
};
const options: TEventTimeOption[] = [
  {
    label: "12 hours",
    value: "12h",
  },
  {
    label: "24 hours",
    value: "24h",
  },
  {
    label: "7 days",
    value: "7d",
  },
  {
    label: "30 days",
    value: "30d",
  },
  {
    label: "6 months",
    value: "6m",
  },
  {
    label: "1 year",
    value: "1y",
  },
  {
    label: "All Time",
    value: "all",
  },
];
function EventTime({ hostEventLink }: { hostEventLink: string }) {
  const activeTime = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const handleClick = (value: TEventTimeOption["value"]) => {
    dispatch(setFilter(value));
  };
  return (
    <div className="mt-1 flex flex-col gap-6 lg:flex-row lg:items-center">
      <div className="flex-1">
        <Card className="hidden max-w-min rounded-md lg:block">
          <CardContent className="p-0">
            <div className="flex items-center">
              {options?.map((item, index) => (
                <Button
                  key={index}
                  className={cn(
                    "h-10 w-full rounded-none border-r first:rounded-s-md last:rounded-e-md",
                    {
                      "bg-[#1F242F]": activeTime === item.value,
                    },
                  )}
                  onClick={() => handleClick?.(item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-wrap items-center gap-3 lg:hidden">
          {options?.map((item, index) => (
            <Button
              key={index}
              className={cn("h-10", {
                "bg-[#1F242F]": activeTime === item.value,
              })}
              onClick={() => handleClick?.(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <HostEventButton />
    </div>
  );
}

export default EventTime;
