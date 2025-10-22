"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type TDataProps = {
  id: string | number;
  name: string;
  entryType: string;
  sex: "Male" | "Female" | "Other";
  time: string;
  numberOfTickets: number | string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "entryType",
    header: "Entry Type",
    cell: ({ row }) => <span>{row.getValue("entryType")}</span>,
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => <span>{row.getValue("sex")}</span>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <span>{row.getValue("time")}</span>,
  },
  {
    accessorKey: "numberOfTickets",
    header: "Number of Tickets",
    cell: ({ row }) => <span>{row.getValue("numberOfTickets")}</span>,
  },
];
