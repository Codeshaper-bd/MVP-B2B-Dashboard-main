"use client";
import type { ColumnDef, Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import { Badge } from "@/components/ui/badge";

import ActionCell from "./action-cell";

export type TDataProps = {
  id: string | number;
  no: string | number;
  customerId: string;
  name: string;
  email: string;
  gender: string;
  lastPurchase: string;
};

function CellStyle<T>({ title, gender }: { title: string; gender?: boolean }) {
  const getStatusColor = (status: string) => {
    const statusText = status?.toLowerCase();

    switch (statusText) {
      case "male":
        return "!border-[#1849A9] !bg-[#102A56] !text-[#84CAFF]";
      case "female":
        return "statusPink";
      default:
        return "statusDefault";
    }
  };

  return (
    <div>
      {gender ? (
        <Badge
          className={`whitespace-nowrap border px-2 py-0.5 font-medium ${getStatusColor(title)}`}
        >
          {title}
        </Badge>
      ) : (
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {title}
        </span>
      )}
    </div>
  );
}

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
      <p className="text-xs font-medium capitalize leading-[18px] text-default-600">
        {title}
      </p>

      <DownArrowIcon
        className={cn(
          "hidden size-[9.33px]",
          sortedState === "asc" && "block rotate-180 transform",
          sortedState === "desc" && "block rotate-0",
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
    id: "no",
    accessorKey: "no",
    header: ({ table }) => (
      <div className="flex items-center gap-3">
        <HeaderWithSort table={table} title="NO" columnId="no" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex h-[39px] items-center">
        <span className="text-sm font-normal leading-5 text-default-600">
          {row.original?.no}
        </span>
      </div>
    ),
    enableSorting: true,
    sortUndefined: "last",
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.id;
      const b = rowB.original.id;

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
    accessorKey: "customerId",
    header: "ID CUSTOMER",
    cell: ({ row: { original } }) => (
      <div className="flex h-[39px] items-center">
        <span className="text-sm font-normal leading-5 text-default-600">
          {original?.customerId}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="flex h-[39px] items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("email")}
      </span>
    ),
  },

  {
    id: "gender",
    accessorKey: "gender",
    header: ({ table }) => (
      <HeaderWithSort table={table} title="GENDER" columnId="gender" />
    ),
    cell: ({ row }) => <CellStyle gender title={row.getValue("gender")} />,
    enableSorting: true,
  },
  {
    id: "lastPurchase",
    accessorKey: "lastPurchase",
    header: ({ table }) => (
      <HeaderWithSort
        table={table}
        title="LAST PURCHASE"
        columnId="lastPurchase"
      />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("lastPurchase")}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "id",
    header: () => <div className="w-full text-center">VIEW DETAILS</div>,
    cell: ActionCell,
  },
];
