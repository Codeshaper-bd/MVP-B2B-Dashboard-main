"use client";
import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

export type TDataProps = {
  id?: string | number;
  status?: string;
  numberOfTransactions?: string | number;
  totalPercentage?: string | number;
};

function CellStyle<T>({ title }: { title: string }) {
  const getStatusColor = (status: string) => {
    const statusText = status?.toLowerCase();

    switch (statusText) {
      case "successful":
        return "statusGreen";
      case "failed":
        return "statusError";
      default:
        return "statusDefault";
    }
  };
  return (
    <div>
      <Badge
        className={`whitespace-nowrap border px-2 py-0.5 font-medium capitalize ${getStatusColor(title)}`}
      >
        {title}
      </Badge>
    </div>
  );
}

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "status",
    header: () => <span className="normal-case">Status</span>,
    cell: ({ row }) => (
      <div className="flex items-center">
        <CellStyle title={row.getValue("status")} />
      </div>
    ),
  },
  {
    accessorKey: "numberOfTransactions",
    header: () => <span className="normal-case">Number of Transactions</span>,
    cell: ({ row }) => <span>{row.getValue("numberOfTransactions")}</span>,
  },
  {
    accessorKey: "totalPercentage",
    header: "% of Total",
    cell: ({ row }) => <span>{row.getValue("totalPercentage")}</span>,
  },
];
