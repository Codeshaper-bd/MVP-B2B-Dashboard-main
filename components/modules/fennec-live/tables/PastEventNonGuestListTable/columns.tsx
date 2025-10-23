"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TNullish, TPagination } from "@/store/api/common-api-types";
import type { TGetPastEventGuestListCheckIn } from "@/store/api/past-event/past-event.types";
import { UserIcon as FemaleIcon } from "@/components/icons";
import { UserIcon as MaleIcon } from "@/components/icons";

export const getColumns = (
  props: TPagination | TNullish,
): ColumnDef<TGetPastEventGuestListCheckIn>[] => [
  {
    accessorKey: "id",
    header: "NO",
    cell: ({ row: { index } }) => {
      const { page, pageSize } = props || {};
      const currentPage = page ? Number(page) : 1;
      const currentPageSize = pageSize ? Number(pageSize) : 6;
      const currentNo = (currentPage - 1) * currentPageSize + index + 1;
      return (
        <span className="text-sm font-medium leading-5 text-default-1000">
          {currentNo}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="w-[100px] truncate text-sm font-medium leading-5 text-default-600 md:w-[150px]">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => {
      const gender = row.getValue("sex");
      return (
        <div className="text-sm font-medium leading-5 text-default-600">
          {gender === "Male" && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#263CFF] text-default-1000">
              <MaleIcon className="h-4 w-4" />
            </div>
          )}
          {gender === "Female" && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D82ADC] text-default-1000">
              <FemaleIcon className="h-4 w-4" />
            </div>
          )}
          {gender === "unisex" && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F79009] text-default-1000">
              N/A
            </div>
          )}
          {gender === "NOT_SPECIFIED" && (
            <div className="whitespace-nowrap text-sm">Not Specified</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "entryTime",
    header: "ENTRY Time",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {row.getValue("entryTime")}
      </span>
    ),
  },
];
