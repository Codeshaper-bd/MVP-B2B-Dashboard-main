"use client";

import type { ColumnDef, Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import CloudDownloadIcon from "@/components/icons/CloudDownloadIcon";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import { Checkbox } from "@/components/ui/checkbox";

export type TDataProps = {
  id: string | number;
  invoice: string;
  amount: string;
  date: string;
  status: "Paid" | "Unpaid" | "Pending";
};

function HeaderWithSort<T>({
  table,
  title,
  columnId,
}: {
  table: Table<T>;
  title?: string;
  columnId: string;
}) {
  const column = table.getColumn(columnId);
  const sortedState = column?.getIsSorted();

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-medium leading-[18px] text-default-600">
        {title}
      </p>

      <DownArrowIcon
        className={cn(
          "hidden size-[9.33px]",
          sortedState === "asc" && "block rotate-180 transform",
          sortedState === "desc" && "block rotate-0",
        )}
      />
    </div>
  );
}

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "select",
    accessorKey: "invoice",
    header: ({ table }) => (
      <div className="flex items-center gap-3">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="size-5"
        />

        <HeaderWithSort table={table} title="Invoice" columnId="select" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          disabled={!row.getCanSelect()}
          aria-label="Select row"
          className="size-5"
        />

        <p className="text-sm font-medium leading-5 text-default-900">
          {row?.original?.invoice}
        </p>
      </div>
    ),
    enableSorting: true,
    sortUndefined: "last",
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.invoice;
      const b = rowB.original.invoice;

      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    },
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {row.getValue("amount")}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {row.getValue("date")}
      </span>
    ),
    enableSorting: false,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <div
        className={cn(
          "flex w-fit items-center gap-1 rounded-lg border border-[#333741] px-1.5 py-0.5 text-xs font-medium leading-[18px] text-default-600",
        )}
      >
        <div className="size-1.5 rounded-full bg-[#17B26A]" />
        {row.getValue("status")}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original } }) => (
      <div className={cn("flex w-fit items-center gap-9")}>
        <CloudDownloadIcon className="h-[15px] w-[16.67px] cursor-pointer text-default-600" />
      </div>
    ),
    enableSorting: false,
  },
];
