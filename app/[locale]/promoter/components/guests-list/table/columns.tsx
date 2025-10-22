"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TPromotersTicketSoldListData } from "@/store/api/promoter/promoter.types";
import TablePageNumber from "@/components/features/TablePageNumber";

import ViewAddonDialog from "./view-addon-dialog";

export const columns: ColumnDef<TPromotersTicketSoldListData>[] = [
  {
    id: "id",
    header: "NO",
    cell: TablePageNumber,
    size: 50,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "subTotal",
    header: "Revenue",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {convertToNumber({
            value: row.getValue("subTotal"),
            digit: 2,
            fallback: 0,
          })}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "ticketTier",
    header: "Ticket Tier",
    cell: ({ row }) => (
      <div className="flex h-[39px] items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("ticketTier")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "numberOfTickets",
    header: "Number Of Tickets",
    cell: ({ row }) => (
      <div className="flex h-[39px] items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("numberOfTickets")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "addOnsCount",
    header: "Addons Purchased",
    cell: ViewAddonDialog,
  },
  {
    accessorKey: "display",
    header: "Discount",
    cell: ({ row: { original } }) => (
      <div className="flex h-[39px] items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {original?.discount?.display ?? "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Transaction Date",
    cell: ({ row }) => (
      <div className="flex h-[39px] items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {convertUTCToLocal({
            utcDateTime: row.getValue("createdAt"),
            format: "MMM DD, YYYY hh:mm A",
          })}
        </span>
      </div>
    ),
  },
];
