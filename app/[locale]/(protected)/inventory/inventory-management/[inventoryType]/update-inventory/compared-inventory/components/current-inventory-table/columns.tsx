"use client";

import type { ColumnDef, Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  inventoryLastUpdate: string;
  productSize: string;
  type: "alcoholic" | "non-alcoholic";
};

function StockStyle<T>({ stock }: { stock: number }) {
  return (
    <div>
      {stock > 100 ? (
        <div className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {stock}
        </div>
      ) : (
        <div className="it flex flex-col whitespace-nowrap text-sm font-normal leading-5 text-[#F97066]">
          <span>{stock}</span>
          <span className="whitespace-nowrap">Stock is running low</span>
        </div>
      )}
    </div>
  );
}

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
        <span className="text-sm font-normal leading-5 text-default-600">
          {original?.productId}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Images",
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
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("productName")}
      </span>
    ),
  },
  {
    id: "inventoryLastUpdate",
    accessorKey: "inventoryLastUpdate",
    header: " INVENTORY last updated",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("inventoryLastUpdate")}
      </span>
    ),
  },
  {
    id: "productSize",
    accessorKey: "productSize",
    header: "Product Size",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("productSize")}
      </span>
    ),
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("type") === "alcoholic" ? (
          <Badge className="border-2 border-[#9E165F] bg-[#4E0D30] text-[#FAA7E0]">
            Alcohol
          </Badge>
        ) : (
          <Badge className="whitespace-nowrap border-2 border-[#53389E] bg-[#2C1C5F] text-[#D6BBFB]">
            Non alcoholic
          </Badge>
        )}
      </span>
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
    cell: ({ row }) => <StockStyle stock={row.getValue("currentStock")} />,
    enableSorting: true,
  },
  {
    id: "category",
    accessorKey: "category",
    header: ({ table }) => (
      <HeaderWithSort table={table} title="Category" columnId="category" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("category")}
      </span>
    ),
    enableSorting: true,
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("price")}
      </span>
    ),
  },
  {
    id: "parLevel",
    accessorKey: "parLevel",
    header: "Par Level",
    cell: ({ row }) => (
      <Input
        className="max-w-[152px]"
        defaultValue={row.getValue("parLevel")}
      />
    ),
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => (
      <div className="me-3 flex justify-end">
        <RightArrowIcon className="size-5 cursor-pointer text-primary" />
      </div>
    ),
  },
];
