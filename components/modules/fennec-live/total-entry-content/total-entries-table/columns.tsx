"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type {
  TCheckInStatus,
  TGetFennecLiveGuestlistItem,
} from "@/store/api/fennec-live/fennec-live.types";
import { UserIcon as FemaleIcon } from "@/components/icons";
import { UserIcon as MaleIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TGetFennecLiveGuestlistItem>[] = [
  {
    accessorKey: "no",
    header: "NO",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("no")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="w-[100px] truncate text-sm font-medium leading-5 text-default-600 md:w-[150px]">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "ticketType",
    header: "TICKET TYPE",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {row.getValue("ticketType")}
      </span>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {String(row.getValue("sex"))?.toLowerCase() === "male" ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#263CFF] text-default-1000">
            <MaleIcon className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D82ADC] text-default-1000">
            <FemaleIcon className="h-4 w-4" />
          </div>
        )}
      </span>
    ),
  },
  {
    accessorKey: "entryTime",
    header: "Entry Time",
    cell: ({ row: { original } }) => {
      const entryTime = original.entryTime;
      const isNAEntryTime = entryTime === "N/A";
      return (
        <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
          {!isNAEntryTime
            ? convertUTCToLocal({
                utcDateTime: entryTime,
                format: "DD MMM YYYY, h:mm A",
              })
            : "expecting"}
        </span>
      );
    },
  },
  {
    accessorKey: "ticketsPurchased",
    header: "Tickets Purchased",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {row.getValue("ticketsPurchased")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = (row.getValue("status") as TCheckInStatus) || "N/A";

      return (
        <Badge
          className={status === "expecting" ? "statusIndigo" : "statusGreen"}
        >
          {status}
        </Badge>
      );
    },
  },
];
