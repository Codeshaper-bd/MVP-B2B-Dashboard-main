"use client";
import dynamic from "next/dynamic";

import CrossIcon from "@/components/icons/CrossIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StatsCardProps {
  data: {
    id: string;
    title: string;
    status: string;
    totalPos: number;
  };
  onClose: () => void;
  height?: number;
}
function StatsCard({ data, onClose, height = 300 }: StatsCardProps) {
  const { id, title, status, totalPos } = data;

  return (
    <Card className="absolute left-1/2 top-1/2 z-50 w-[340px] translate-x-[-50%] translate-y-[-50%] bg-[#3C4254]/10 shadow-none backdrop-blur-lg">
      <CardHeader className="pb-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <CardTitle className="whitespace-nowrap text-lg font-medium text-white">
            Table {id}
          </CardTitle>
          <Button
            size="icon"
            className="h-7 w-7 bg-secondary"
            onClick={onClose}
          >
            <CrossIcon className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <ul className="pb-3 text-white">
          <li className="flex pb-2 text-sm font-normal">
            <span className="w-6/12">Name</span>{" "}
            <span className="w-1/12">:</span> {title}
          </li>
          <li className="flex pb-2 text-sm font-normal">
            <span className="w-6/12">Status</span>{" "}
            <span className="w-1/12">:</span>
            <Badge
              color={status === "Checked In" ? "success" : "warning"}
              className="border !py-[1px] text-[12px]"
            >
              {status}
            </Badge>
          </li>
          <li className="flex pb-2 text-sm font-normal">
            <span className="w-6/12">Total Pos Revenue</span>{" "}
            <span className="w-1/12">:</span> ${totalPos}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
