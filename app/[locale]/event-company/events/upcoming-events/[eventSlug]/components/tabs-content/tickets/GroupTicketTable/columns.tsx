"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { UserIcon as FemaleIcon } from "@/components/icons";
import { UserIcon as MaleIcon } from "@/components/icons";

export type TDataProps = {
  id: string | number;
  serialNo: number | string;
  tierList: string;
  ratio: {
    male: number;
    female: number;
  };
  ticketSold: number;
  type: string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "serialNo",
    header: "NO",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-white">
        {row.getValue("serialNo")}
      </span>
    ),
  },
  {
    accessorKey: "tierList",
    header: "Group Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-white">
        {row.getValue("tierList")}
      </span>
    ),
  },
  {
    accessorKey: "ratio",
    header: "Ratio",
    cell: ({ row }) => {
      const ratio = row.getValue("ratio") as { male: number; female: number };
      return (
        <span className="flex items-center gap-3 text-sm font-medium leading-5 text-white">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#263CFF] text-white">
            <MaleIcon className="h-4 w-4" />
          </div>
          {ratio.male}
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#D82ADC] text-white">
            <FemaleIcon className="h-4 w-4" />
          </div>
          {ratio.female}
        </span>
      );
    },
  },
  {
    accessorKey: "ticketSold",
    header: "Ticket Sold",
    cell: ({ row }) => (
      <p className="text-sm font-medium leading-5 text-white">
        {row.getValue("ticketSold")}{" "}
        <span className="text-default-500">/30</span>
      </p>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span
        className={cn(
          "flex w-fit items-center justify-center text-xs font-medium leading-[18px] text-default-600",
          {
            "rounded-full border border-[#085D3A] bg-[#053321] px-2 py-0.5 text-[#75E0A7]":
              row.getValue("type") === "Public",
            "rounded-full border border-[#93370D] bg-[#4E1D09] px-2 py-0.5 text-[#FEC84B]":
              row.getValue("type") === "Private",
          },
        )}
      >
        {row.getValue("type")}
      </span>
    ),
    size: 150,
  },
];
