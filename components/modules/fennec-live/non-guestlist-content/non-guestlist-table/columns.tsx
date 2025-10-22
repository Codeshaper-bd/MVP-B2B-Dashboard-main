"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TGetFennecLiveNonGuestlistItem } from "@/store/api/fennec-live/fennec-live.types";
import FemaleIcon from "@/components/icons/FemaleIcon";
import MaleIcon from "@/components/icons/MaleIcon";

export const columns: ColumnDef<TGetFennecLiveNonGuestlistItem>[] = [
  {
    accessorKey: "id",
    header: "NO",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("id")}
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
    accessorKey: "totalEntered",
    header: "Total Entered",
    cell: ({ row }) => (
      <div className="truncate text-sm font-medium leading-5 text-default-600">
        {row.getValue("totalEntered")}
      </div>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {String(row.getValue("sex"))?.toLowerCase() === "male" ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#263CFF] text-white">
            <MaleIcon className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D82ADC] text-white">
            <FemaleIcon className="h-4 w-4" />
          </div>
        )}
      </span>
    ),
  },
  {
    accessorKey: "time",
    header: "ENTRY Time",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: row.getValue("time"),
          format: "DD MMM YYYY, h:mm A",
        })}
      </span>
    ),
  },
];
