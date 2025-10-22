"use client";
import type { ColumnDef } from "@tanstack/react-table";

import type {
  TGetSalesReportByItemListArgs,
  TSalesReportByItemList,
} from "@/store/api/sales-report/sales-report.types";

import SortHeader from "../../../../../../../../components/features/column-sort-header";

type TSortingArgs = Exclude<TGetSalesReportByItemListArgs, void | undefined>;

export const columns: ColumnDef<TSalesReportByItemList>[] = [
  {
    accessorKey: "rank",
    header: "rank",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("rank")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <SortHeader<TSortingArgs> headerTitle="Sales By Product" sortBy="name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[210px]">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "barPrice",
    header: () => (
      <SortHeader<TSortingArgs> headerTitle="Bar Price" sortBy="barPrice" />
    ),
    cell: ({ row }) => <span>{row.getValue("barPrice")}</span>,
  },
  {
    accessorKey: "unitsSold",
    header: () => (
      <SortHeader<TSortingArgs> headerTitle="Units Sold" sortBy="unitsSold" />
    ),
    cell: ({ row }) => <span>{row.getValue("unitsSold")}</span>,
  },
  {
    accessorKey: "retailCost",
    header: () => (
      <SortHeader<TSortingArgs> headerTitle="Retail Cost" sortBy="retailCost" />
    ),
    cell: ({ row }) => <span>N/A</span>,
  },
  {
    accessorKey: "lostRevenue",
    header: () => (
      <SortHeader<TSortingArgs>
        headerTitle="Lost Revenue"
        sortBy="lostRevenue"
      />
    ),
    cell: ({ row }) => <span>{row.getValue("lostRevenue")}</span>,
  },
  {
    accessorKey: "wastage",
    header: () => (
      <SortHeader<TSortingArgs> headerTitle="Wastage" sortBy="wastage" />
    ),
    cell: ({ row }) => <span>{row.getValue("wastage")}</span>,
  },

  {
    accessorKey: "totalRevenue",
    header: () => (
      <SortHeader<TSortingArgs>
        headerTitle="Total Revenue"
        sortBy="totalRevenue"
      />
    ),
    cell: ({ row }) => <span>{row.getValue("totalRevenue")}</span>,
  },
];
