"use client";

import type { ColumnDef } from "@tanstack/react-table";

import CheckIcon from "@/components/icons/CheckIcon";
import { Input } from "@/components/ui/input";

export type TDataProps = {
  id: string | number;
  checklist: string;
  task: string;
  status: string;
  note: string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "checklist",
    header: "CHECKLIST",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-1000">
        {row.getValue("checklist")}
      </span>
    ),
  },
  {
    accessorKey: "task",
    header: "TASK",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-1000">
        {row.getValue("task")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-1000">
        {row.getValue("status") === "done" ? (
          <CheckIcon className="size-5 rounded-full bg-[#17B26A] p-0.5" />
        ) : !row.getValue("status") ? (
          <p className="size-5 rounded-full bg-default-50 p-0.5" />
        ) : row.getValue("status") === "input" ? (
          <Input
            type="text"
            placeholder="Enter value"
            value={52}
            className="rounded border px-2 py-1 text-sm"
          />
        ) : (
          row.getValue("status")
        )}
      </span>
    ),
  },
  {
    accessorKey: "note",
    header: "NOTE",
    cell: ({ row }) => (
      <span className="line-clamp-2 text-sm font-normal leading-5 text-default-1000">
        {row.getValue("note")}
      </span>
    ),
  },
];
