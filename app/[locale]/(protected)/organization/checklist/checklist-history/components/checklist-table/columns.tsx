"use client";

import type { ColumnDef, Table } from "@tanstack/react-table";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type TDataProps = {
  id: string | number;
  eventName: string;
  date: string;
  downloadLink: string;
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
  return <div>{title}</div>;
}
export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "select",
    accessorKey: "id",
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

        <HeaderWithSort table={table} title="Event Name" columnId="id" />
      </div>
    ),
    cell: ({
      row: { getIsSelected, toggleSelected, getCanSelect, original },
    }) => (
      <div className="flex items-center gap-3">
        <Checkbox
          checked={getIsSelected()}
          onCheckedChange={(value) => toggleSelected(!!value)}
          disabled={!getCanSelect()}
          aria-label="Select row"
          className="size-5"
        />
        <p className="whitespace-nowrap text-sm font-medium text-default-900">
          {original?.eventName}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex h-[39px] items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("date")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "downloadLink",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button type="button" asChild color="secondary">
          <a
            href={row.getValue("downloadLink")}
            target="_blank"
            download={true}
          >
            <Image
              src="/images/icon/pdf-icon.png"
              alt=""
              width={20}
              height={20}
              className="me-2 size-5"
            />{" "}
            Download Pdf
          </a>
        </Button>
      </div>
    ),
  },
];
