"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import ChevronDownFillIcon from "@/components/icons/ChevronDownFillIcon";
import { NoDataFound } from "@/components/icons/NoDataFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { TDataProps } from "./data";
import RecountDrawer from "./drawer";

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "No",
  },

  {
    id: "name",
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const mediaUrl = "/images/all-img/product-alcohol.png";
      return (
        <div className="flex items-center gap-2.5">
          {row?.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()} className="p-2">
              <ChevronDownFillIcon
                className={cn(
                  "h-1.5 w-3",
                  row.getIsExpanded() ? "rotate-0" : "rotate-180",
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
            {/* {row.getValue("name")} */} ETNA ROSSO VULKA
          </span>
        </div>
      );
    },
  },
  {
    id: "category",
    accessorKey: "category",
    header: "",
    cell: ({ row }) => <span>Wines</span>,
  },
  {
    id: "soldBy",
    accessorKey: "soldBy",
    header: "Sold By",
    cell: ({ row }) => <span className="whitespace-nowrap">Volume</span>,
  },
  {
    id: "predictedCount",
    accessorKey: "predictedCount",
    header: "Predicted Count",
    cell: ({ row: { original } }) => {
      const type = "Alchohol";
      return (
        <span className="text-sm font-normal leading-5 text-default-600">
          <Badge
            className={cn(
              "whitespace-nowrap border-2 border-[#53389E] bg-[#2C1C5F] text-[#D6BBFB]",
              {
                "border-2 border-[#9E165F] bg-[#4E0D30] text-[#FAA7E0]":
                  type === "Alchohol",
              },
            )}
          >
            {type}
          </Badge>
        </span>
      );
    },
  },

  {
    id: "barbackCount",
    accessorKey: "barbackCount",
    header: "Barback Count",

    cell: ({ row: { original } }) => {
      const volumeVariants = [
        {
          unit: "oz",
          volume: 26,
        },
        {
          unit: "oz",
          volume: 40,
        },
      ];

      return (
        <div className="flex items-center gap-1">
          {volumeVariants?.slice(0, 2)?.map((variant, index) => (
            <Badge
              key={`variant-${index}`}
              className="rounded-lg border-2 border-[#333741] bg-transparent text-xs font-medium text-default-700"
            >
              {variant.volume} {variant.unit}
            </Badge>
          ))}

          {!!volumeVariants?.length && volumeVariants?.length > 2 && (
            <Badge className="rounded-lg border-2 border-[#333741] bg-transparent text-xs font-medium text-default-700">
              +{volumeVariants?.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    id: "action",
    accessorKey: "action",
    header: "action",
    cell: ({ row: { original } }) => (
      <div>
        <RecountDrawer id="1" />
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
      <Table>
        <TableHeader className="border-none bg-secondary [&_tr]:border-t-0">
          <TableRow>
            <TableHead className="min-w-[394px] rounded-l-[6px] py-2.5">
              Volume
            </TableHead>
            <TableHead className="py-2.5">Product ID</TableHead>
            <TableHead className="py-2.5">Opened Counted</TableHead>
            <TableHead className="py-2.5">Predictive Closed Count</TableHead>
            <TableHead className="rounded-r-[6px] py-2.5">
              Actual Closed Count
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="lowercase">375 Oz</TableCell>
            <TableCell>PRO-#283</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                color="default"
                size="sm"
                className="rounded-[4px] border-[#085D3A] bg-[#053321] !px-2 !py-0.5 text-xs font-medium text-success hover:bg-[#053321] hover:text-success"
              >
                View Count
              </Button>
            </TableCell>
            <TableCell className="flex gap-1">120</TableCell>
            <TableCell>120</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
