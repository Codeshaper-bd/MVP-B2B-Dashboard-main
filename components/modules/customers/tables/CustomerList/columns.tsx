"use client";
import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getGendersColor } from "@/lib/get-status-colors";
import type { TGender } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TCustomerLookup } from "@/store/api/customer-lookup/customer-lookup.types";
import TablePageNumber from "@/components/features/TablePageNumber";
import { Badge } from "@/components/ui/badge";

import ActionCell from "./action-cell";

export const columns: ColumnDef<TCustomerLookup>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "No.",
    cell: TablePageNumber,
  },
  {
    accessorKey: "customerId",
    header: "Customer Id",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("customerId")}
      </span>
    ),
  },
  {
    header: "NAME",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {original?.fullName || ` ${original?.firstName} ${original?.lastName}`}
      </span>
    ),
  },
  {
    header: "PHONE NUMBER",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        +{original?.phone || "N/A"}
      </span>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    id: "gender",
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue<TGender>("gender");
      return <Badge className={getGendersColor(gender)}>{gender}</Badge>;
    },
  },
  {
    id: "lastVisit",
    accessorKey: "lastVisit",
    header: "Last VISIT",
    cell: ({ row }) => {
      const lastVisit = row.getValue<string | TNullish>("lastVisit");

      return (
        <span className="whitespace-nowrap text-sm text-default-600">
          {lastVisit
            ? convertUTCToLocal({
                utcDateTime: lastVisit,
                format: "DD-MMM-YYYY",
              })
            : "N/A"}
        </span>
      );
    },
  },

  {
    id: "totalSpent",
    accessorKey: "totalSpent",
    header: "Total Spent",
    cell: ({ row }) => {
      const totalSpent = row.getValue<number | TNullish>("totalSpent");
      return (
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {totalSpent
            ? `${convertToNumber({ value: totalSpent, digit: 2 })}`
            : "N/A"}
        </span>
      );
    },
  },

  {
    accessorKey: crypto.randomUUID(),
    header: "Detail",
    cell: ActionCell,
  },
];
