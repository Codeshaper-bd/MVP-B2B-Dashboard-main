"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { CheckIcon as CheckIcon } from "@/components/icons";

export type TDataProps = {
  id: string | number;
  checklist: string;
  status: string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "checklist",
    header: "Checklist",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("checklist")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="flex w-fit items-center justify-center gap-0.5 rounded-full border border-[#085D3A] bg-[#053321] px-2 py-0.5 text-sm font-medium leading-5 text-[#75E0A7]">
        <CheckIcon className="size-3" /> <span>{row.getValue("status")}</span>
      </span>
    ),
  },
];
