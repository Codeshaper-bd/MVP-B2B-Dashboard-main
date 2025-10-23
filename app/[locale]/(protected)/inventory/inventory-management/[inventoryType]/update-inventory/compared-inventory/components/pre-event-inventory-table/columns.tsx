"use client";
import type { ColumnDef, Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { DollarIcon as DollarIcon } from "@/components/icons";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export type TDataProps = {
  id: string | number;
  no: string | number;
  productId: string;
  image: string;
  productName: string;
  currentStock: number;
  category: string;
  price: number;
  parLevel: string;
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
  const column = table.getColumn(columnId);
  const sortedState = column?.getIsSorted();

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-medium uppercase leading-[18px] text-default-600">
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
    accessorKey: "productId",
    header: "Product Id",
    cell: ({ row: { original } }) => (
      <div className="flex h-[39px] items-center">
        <Input
          id="productId"
          size="sm"
          className="min-w-[128px]"
          defaultValue={original?.productId}
        />
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row: { original } }) => (
      <div className="flex items-center">
        <Avatar className="h-[32px] w-[46px] rounded-[4px]">
          <AvatarImage src={original?.image} alt={original?.productName} />
          <AvatarFallback>{original?.productName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    id: "productName",
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <Input
        id="productName"
        size="sm"
        className="min-w-[146px]"
        defaultValue={row.getValue("productName")}
      />
    ),
  },

  {
    id: "currentStock",
    accessorKey: "currentStock",
    header: ({ table }) => (
      <HeaderWithSort
        table={table}
        title="Current Stock"
        columnId="currentStock"
      />
    ),
    cell: ({ row }) => (
      <div>
        <Input
          id="currentStock"
          size="sm"
          className="min-w-[118px]"
          defaultValue={row.getValue("currentStock")}
        />
      </div>
    ),
    enableSorting: true,
  },
  {
    id: "category",
    accessorKey: "category",
    header: ({ table }) => (
      <HeaderWithSort table={table} title="Category" columnId="category" />
    ),
    cell: ({ row }) => (
      <div>
        <Input
          id="category"
          size="sm"
          className="min-w-[154px]"
          defaultValue={row.getValue("category")}
        />
      </div>
    ),
    enableSorting: true,
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="flex min-w-[104px] items-end">
        <div className="group relative w-full">
          <DollarIcon className="absolute start-3.5 top-[50%] z-10 h-3 w-3 -translate-y-1/2 text-default-700" />
          <div className="absolute bottom-0 start-[35px] z-10 h-[44px] border-r transition-all duration-300 group-focus-within:border-primary"></div>
          <Input
            id="price"
            defaultValue={row.getValue("price")}
            className="ps-10 text-base text-default-900"
          />
        </div>
      </div>
    ),
  },
  {
    id: "parLevel",
    accessorKey: "parLevel",
    header: "Par Level",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        <Input
          size="sm"
          className="min-w-[87px]"
          defaultValue={row.getValue("parLevel")}
        />
      </span>
    ),
  },
];
