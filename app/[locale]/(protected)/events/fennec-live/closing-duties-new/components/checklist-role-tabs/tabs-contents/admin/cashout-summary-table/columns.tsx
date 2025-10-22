"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import ChevronDownFillIcon from "@/components/icons/ChevronDownFillIcon";
import DrawStraightLinePenIcon from "@/components/icons/DrawStraightLinePenIcon";
import { NoDataFound } from "@/components/icons/NoDataFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { TDataProps } from "./data";

const borderColor =
  "border-t border-[#47CD89] bg-gradient-to-t from-[#47CD89]/0 to-[#47CD89]/10";

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "id",
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const mediaUrl = "/images/all-img/product-alcohol.png";
      return (
        <div className={`flex items-center gap-2.5`}>
          {row?.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()} className="p-2">
              <ChevronDownFillIcon
                className={cn(
                  "h-1.5 w-3",
                  row.getIsExpanded() ? "rotate-180" : "rotate-90",
                )}
              />
            </button>
          ) : null}
          <div className="flex h-8 w-[46px] items-center justify-center overflow-hidden rounded bg-default-100">
            <Image
              width={32}
              height={32}
              className="h-auto max-h-8 w-auto max-w-[46px] rounded object-contain"
              src={getImageFallback({ src: mediaUrl, fallbackImageSize: 100 })}
              alt=""
              style={{ objectPosition: "center" }}
            />
          </div>

          <span className="whitespace-nowrap">
            {/* {row.getValue("category")} */} Main Bar
          </span>
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <Badge className="statusOrange">Pending</Badge>
      </div>
    ),
  },
  {
    id: "cashOnHand",
    accessorKey: "cashOnHand",
    header: "Cash On Hand",
    cell: ({ row }) => <span className="whitespace-nowrap">-</span>,
  },
  {
    id: "posReadAmount",
    accessorKey: "posReadAmount",
    header: "POS Read Amount",
    cell: ({ row }) => <span className="whitespace-nowrap">-</span>,
  },
  {
    id: "debitTerminal",
    accessorKey: "debitTerminal",
    header: "POS Read Amount",
    cell: ({ row }) => <span className="whitespace-nowrap">-</span>,
  },
  {
    id: "promos",
    accessorKey: "promos",
    header: "Promos",
    cell: ({ row }) => <span className="whitespace-nowrap">-</span>,
  },
  {
    id: "spillageWastage",
    accessorKey: "spillageWastage",
    header: "spillage / Wastage",
    cell: ({ row }) => <span className="whitespace-nowrap">-</span>,
  },
  {
    id: "overageShortage",
    accessorKey: "overageShortage",
    header: "Overage / Shortage",
    cell: ({ row }) => <span className="whitespace-nowrap">-</span>,
  },

  {
    id: "action",
    accessorKey: "action",
    header: "action",
    cell: ({ row: { original } }) => (
      <div>
        <Button
          variant="ghost"
          color="primary"
          className="gap-1 hover:bg-secondary hover:text-primary"
        >
          <DrawStraightLinePenIcon className="size-5" /> Edit
        </Button>
      </div>
    ),
  },
];

export const handleSubComponent = ({
  row: { original },
}: {
  row: Row<Record<string, TGroupInventoryItemData["children"]>>;
}) => {
  const childData = [
    {
      productCode: "PRO-#283",
      volume: "26",
      unit: "oz",
      predictedOpenedCount: "120",
    },
  ];

  if (!childData?.length) {
    return <NoDataFound />;
  }

  return (
    <div className="overflow-hidden rounded-md">
      <Card className="px-6 py-4">
        <h4 className="text-xs font-semibold uppercase text-default-900">
          Tip Out Summary:
        </h4>
        <div className="mt-2.5 space-y-2">
          <p className="text-sx font-normal text-default-700">
            Total Sales{" "}
            <span className="ms-2 font-medium text-default-900">$1,000</span>
          </p>
          <p>
            Total Tip Out (5%)
            <span className="ms-2 font-medium text-default-900">$50</span>
          </p>

          <div className="space-y-2 rounded-[10px] bg-secondary px-4 py-3">
            <p>
              - Manager on Duty (2%) :
              <span className="ms-2 font-medium text-default-900">$20</span>
            </p>
            <p>
              - Bar Back (2%) :
              <span className="ms-2 font-medium text-default-900">$20</span>
            </p>
            <p>
              - Security (1%) :
              <span className="ms-2 font-medium text-default-900">$10</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
