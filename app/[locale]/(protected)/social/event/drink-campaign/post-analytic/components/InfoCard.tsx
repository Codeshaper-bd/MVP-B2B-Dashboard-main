"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { cn } from "@/lib/utils";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowUpDownIcon from "@/components/icons/ArrowUpDownIcon";
const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
});

interface InfoCardProps {
  icon?: React.ReactNode;
  iconBgColor?: "blue" | "purple" | "yellow";
  label?: string | number;
  value?: number | null;
  progress?: number | null;
  progressLabel?: string;
}

const getBgColor = (
  color: InfoCardProps["iconBgColor"],
): React.CSSProperties => {
  let backgroundColor: string | undefined;

  switch (color) {
    case "blue":
      backgroundColor = "#1570EF";
      break;
    case "purple":
      backgroundColor = "#DD2590";
      break;
    case "yellow":
      backgroundColor = "#CA8504";
      break;
    default:
      backgroundColor = undefined;
      break;
  }

  return { backgroundColor };
};

const getProgressType = (progress: number | null | undefined) => {
  if (progress && progress > 0) {
    return "up";
  } else if (progress && progress < 0) {
    return "down";
  } else {
    return "same";
  }
};

function InfoCard({
  icon,
  label,
  value,
  iconBgColor,
  progress,
  progressLabel = "vs last month",
}: InfoCardProps) {
  const progressType = getProgressType(progress);

  return (
    <div className="flex flex-[1_0_0] flex-col items-start rounded-xl border border-solid border-[#1F242F] bg-[#0C111D] px-6 py-5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex size-8 items-center justify-center rounded-full p-2 text-white"
          style={getBgColor(iconBgColor)}
        >
          {icon}
        </div>

        <p className="text-base font-semibold leading-none text-[#F5F5F6]">
          {label}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="leading-[38px]# text-3xl font-semibold not-italic leading-none text-[#F5F5F6]">
          <Suspense fallback={0}>
            <CountUp end={Math.abs(Number(value ?? 0))} />
          </Suspense>
        </h3>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          <ArrowDownIcon
            className={cn(
              "hidden size-3 shrink-0",
              progressType === "up" && "block rotate-180 text-[#47CD89]",
              progressType === "down" && "block text-destructive",
            )}
          />

          {progressType === "same" && (
            <ArrowUpDownIcon className="size-4 shrink-0 text-[#CA8504]" />
          )}

          <p
            className={cn(
              "text-center text-sm font-medium leading-5",
              progressType === "up" && "text-[#47CD89]",
              progressType === "down" && "text-destructive",
              progressType === "same" && "text-[#CA8504]",
            )}
          >
            <CountUp end={Math.abs(Number(progress ?? 0))} suffix="%" />
          </p>
        </div>

        <p className="overflow-hidden text-ellipsis text-sm font-medium not-italic leading-5 text-default-600">
          {progressLabel}
        </p>
      </div>
    </div>
  );
}

export default InfoCard;
