"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import { calculateSerialNumber } from "@/lib/pagination/calculate-serial-number";
import { cn } from "@/lib/utils";
import type { TNullish, TPagination } from "@/store/api/common-api-types";
import type { TCheckInStatus } from "@/store/api/fennec-live/fennec-live.types";
import type { TGetPastEventGuestListCheckIn } from "@/store/api/past-event/past-event.types";
import FemaleIcon from "@/components/icons/FemaleIcon";
import MaleIcon from "@/components/icons/MaleIcon";
import { Badge } from "@/components/ui/badge";

export const getColumns = (
  props: TPagination | TNullish,
): ColumnDef<TGetPastEventGuestListCheckIn>[] => [
  {
    accessorKey: "id",
    header: "NO",
    cell: ({ row: { index } }) => {
      const serialNo = calculateSerialNumber({
        mode: "page",
        index,
        page: convertToNumber({ value: props?.page, digit: 0 }),
        pageSize: convertToNumber({ value: props?.pageSize, digit: 0 }),
      });

      return (
        <span className="text-sm font-medium leading-5 text-default-1000">
          {serialNo}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "ticketType",
    header: "TICKET TIER",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {row.getValue("ticketType")}
      </span>
    ),
  },
  {
    accessorKey: "subTotal",
    header: "REVENUE",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        $
        {convertToNumber({
          value: row.getValue("subTotal"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "addOnsCount",
    header: "ADDONS PURCHASED",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {convertToNumber({
          value: row.getValue("addOnsCount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "discount",
    header: "DISCOUNT",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {original?.discount?.display ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => {
      const gender = row.getValue("sex");
      return (
        <div className="text-sm font-medium leading-5 text-default-600">
          {gender === "Male" && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#263CFF] text-default-1000">
              <MaleIcon className="h-4 w-4" />
            </div>
          )}
          {gender === "Female" && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D82ADC] text-default-1000">
              <FemaleIcon className="h-4 w-4" />
            </div>
          )}
          {gender === "unisex" && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F79009] text-default-1000">
              N/A
            </div>
          )}
          {gender === "NOT_SPECIFIED" && (
            <div className="whitespace-nowrap text-sm">Not Specified</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "entryTime",
    header: "Entry Time",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {row.getValue("entryTime")}
      </span>
    ),
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
          className={cn(
            cn("statusIndigo", {
              statusGreen: status === "expecting",
            }),
          )}
        >
          {status}
        </Badge>
      );
    },
  },
];
