"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import { calculateSerialNumber } from "@/lib/pagination/calculate-serial-number";
import type { TNullish, TPagination } from "@/store/api/common-api-types";
import type { TGuestListItem } from "@/store/api/events/events.types";
import { Badge } from "@/components/ui/badge";

import ViewAddonDialog from "./view-addon-dialog";

export const getColumns = (
  props: TPagination | TNullish,
): ColumnDef<TGuestListItem>[] => [
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
    header: "Name",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "ticketType",
    header: "Ticket Tier",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("ticketType")}</div>
    ),
  },
  /* {
    accessorKey: "amount",
    header: "Revenue",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        $
        {convertToNumber({
          value: row.getValue("amount"),
          digit: 2,
          fallback: 0,
        })}
      </div>
    ),
  }, */
  {
    accessorKey: "subTotal",
    header: "Revenue",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        $
        {convertToNumber({
          value: row.getValue("subTotal"),
          digit: 2,
          fallback: 0,
        })}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Addons Purchased",
    cell: ViewAddonDialog,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row: { original } }) => (
      <div className="whitespace-nowrap">
        {original?.discount?.display ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row: { original } }) => {
      const sex = original?.sex;
      return <span>{sex}</span>;
    },
  },
  {
    accessorKey: "entryTime",
    header: "Time",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.getValue("entryTime")}</span>
    ),
  },
  {
    accessorKey: "ticketsPurchased",
    header: "Number of Tickets",
    cell: ({ row }) => <span>{row.getValue("ticketsPurchased")}</span>,
  },
  {
    accessorKey: "promoterName",
    header: "Promoter",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("promoterName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original } }) => {
      const status = original?.status;
      return (
        <Badge className={status === "Entered" ? "statusGreen" : "statusError"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "refund",
    header: "Refund",
    cell: ({ row: { original } }) => <span>-</span>,
  },
  {
    accessorKey: "whoRequest",
    header: "Requested By",
    cell: ({ row: { original } }) => <span>-</span>,
  },
  {
    accessorKey: "reason",
    header: "REASON",
    cell: ({ row: { original } }) => <span>-</span>,
  },
  {
    accessorKey: "action",
    header: "ACTION",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3">
        <button type="button" className="text-sm font-semibold text-[#47CD89]">
          Approve
        </button>
        <button type="button" className="text-sm font-semibold text-[#F97066]">
          Reject
        </button>
      </div>
    ),
  },
];
