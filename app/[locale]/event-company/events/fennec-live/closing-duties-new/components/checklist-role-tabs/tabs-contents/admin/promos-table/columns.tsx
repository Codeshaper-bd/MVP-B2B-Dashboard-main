"use client";

import type { ColumnDef } from "@tanstack/react-table";

import DeleteIcon from "@/components/icons/DeleteIcon";
import MinusIcon2 from "@/components/icons/MinusIcon2";
import PlusIcon from "@/components/icons/PlusIcon";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { TDataProps } from "./data";

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "product",
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <SelectInput
        options={[{ label: "Etna Rosso Vulka", value: "etnaRossoVulka" }]}
        placeholder="Select Product"
      />
    ),
  },
  {
    id: "volume",
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => (
      <div className="h-11 w-[104px] rounded-[8px] bg-default-50 px-3.5 py-2.5">
        -
      </div>
    ),
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <Input
        leftContent={
          <MinusIcon2 className="size-5 rounded-full bg-[#85888E] text-default" />
        }
        rightContent={
          <PlusIcon className="size-5 rounded-full bg-default-900 text-default" />
        }
        defaultValue={1}
        className="text-center"
      />
    ),
  },
  {
    id: "cost",
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => <span className="whitespace-nowrap">-</span>,
  },
  {
    id: "promoType",
    accessorKey: "promoType",
    header: "Promo Type",
    cell: ({ row }) => (
      <SelectInput
        options={[{ label: "type", value: "type1" }]}
        placeholder="Select type"
      />
    ),
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="h-11 w-[104px] rounded-[8px] bg-default-50 px-3.5 py-2.5">
        -
      </div>
    ),
  },

  {
    id: "action",
    accessorKey: "action",
    header: "action",
    cell: ({ row: { original } }) => (
      <div>
        <Button variant="ghost" color="default" className="gap-1">
          <DeleteIcon className="size-5 text-warning" />
        </Button>
      </div>
    ),
  },
];
