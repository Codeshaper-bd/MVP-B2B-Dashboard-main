"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TTopChallenges } from "@/store/api/challenges/challenges.types";

import PageNumber from "./page-number";

export const columns: ColumnDef<TTopChallenges>[] = [
  {
    accessorKey: "id",
    header: "NO",
    cell: PageNumber,
  },
  {
    accessorKey: "name",
    header: "Challenge",
    cell: ({ row }) => (
      <span className="block min-w-[220px] text-sm font-medium leading-5 text-default-1000">
        {row.getValue("name")}
      </span>
    ),
    minSize: 700,
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("points")}
      </span>
    ),
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("completed")}
      </span>
    ),
  },
  {
    accessorKey: "pointsGivenOut",
    header: "Points Given Out",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("pointsGivenOut")}
      </span>
    ),
  },
];
