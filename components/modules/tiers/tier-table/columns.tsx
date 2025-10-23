"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import type { TTicketTierItem } from "@/store/api/ticket-tier/ticket-tier.types";
import { UserIcon as FemaleIcon } from "@/components/icons";
import { UserIcon as MaleIcon } from "@/components/icons";

export const columns: ColumnDef<TTicketTierItem>[] = [
  {
    accessorKey: "name",
    header: "NO",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.index + 1}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Tier List",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "male",
    header: "Ratio",
    cell: ({ row: { original } }) => {
      const maleCount = convertToNumber({ value: original?.male }) || 0;
      const femaleCount = convertToNumber({ value: original?.female }) || 0;
      const notSpecified =
        convertToNumber({ value: original?.notSpecified }) || 0;

      return (
        <span className="flex items-center gap-3 text-sm font-medium leading-5 text-default-1000">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#263CFF] text-default-1000">
            <MaleIcon className="h-4 w-4" />
          </div>
          {maleCount}
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#D82ADC] text-default-1000">
            <FemaleIcon className="h-4 w-4" />
          </div>
          {femaleCount}
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F79009] text-[11px] text-default-1000">
            N/A
          </div>
          {notSpecified}
        </span>
      );
    },
  },
  {
    accessorKey: "totalSold",
    header: "Ticket Sold",
    cell: ({ row }) => (
      <p className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("totalSold")}
      </p>
    ),
  },
];
