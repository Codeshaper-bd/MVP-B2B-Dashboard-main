"use client";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";

import { cn } from "@/lib/utils";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import XIcon from "@/components/icons/X";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StatsCardProps {
  data: {
    type: string;
    lists: { label: string; value: string }[];
    series: { name: string; data: number[] }[];
  };
  onClose: () => void;
  height?: number;
}
function StatsCard({ data, onClose, height = 300 }: StatsCardProps) {
  const [open, setOpen] = useState<boolean>(true);
  const { type, lists, series } = data;
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: false,
        blur: 8,
        left: 1,
        top: 1,
        opacity: 0.5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["#EE46BC", "#B692F6", "#0BA5EC"],
    fill: {
      opacity: [0.2, 0.2, 0.2],
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: ["#CECFD2"],
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: "#CECFD2",
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: 500,
          cssClass: "apexcharts-yaxis-label",
        },
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: "#3C4254",
          strokeWidth: "1",
        },
      },
    },
    stroke: {
      width: 2,
    },
    markers: {
      size: 0,
    },
  };
  return (
    <Card className="absolute end-6 top-6 z-50 w-[360px] bg-[#3C4254]/10 shadow-none backdrop-blur-lg">
      <CardHeader className="pb-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <CardTitle className="whitespace-nowrap text-lg font-medium text-white">
            Table {type} Stats
          </CardTitle>
          <Button size="icon" className="size-7 bg-secondary" onClick={onClose}>
            <XIcon className="size-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <ul className="pb-3">
          {lists.map((item, index) => (
            <li key={`item-${index}`} className="mb-2 flex justify-between">
              <span className="text-sm text-default-900">{item.label}</span>
              <span className="text-sm font-medium text-default-900">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="flex items-center py-3">
          <h3 className="flex-1 text-lg font-medium text-white">
            Table {type} Summary
          </h3>
          <Button
            className="h-7 w-7 flex-none bg-secondary"
            size="icon"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <MinusIcon className="h-4 w-4" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div
          className={cn(
            "invisible h-0 opacity-0 transition-all duration-300 ease-linear",
            {
              "visible h-fit opacity-100": open,
            },
          )}
        >
          <Chart
            options={options}
            series={series}
            type="radar"
            height={height}
            width={"100%"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
