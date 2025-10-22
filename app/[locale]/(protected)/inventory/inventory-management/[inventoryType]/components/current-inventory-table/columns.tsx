"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { convertToNumber } from "@/lib/data-types/number";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import TablePageNumber from "@/components/features/TablePageNumber";
import ArrowLeftLongIcon from "@/components/icons/ArrowLeftLongIcon";
import ChevronDownFillIcon from "@/components/icons/ChevronDownFillIcon";
import { NoDataFound } from "@/components/icons/NoDataFound";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const columns: ColumnDef<TGroupInventoryItemData>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "No",
    cell: TablePageNumber,
  },

  {
    id: "name",
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const mediaUrl = row.original?.media?.filter((m) => m.isFeatured)[0]?.url;
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

          <span className="whitespace-nowrap">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    id: "category",
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
  },
  {
    id: "soldBy",
    accessorKey: "soldBy",
    header: "Sold By",
    cell: ({ row: { original } }) => {
      const bottleType = (original?.soldBy || "")?.split("_")?.join(" ");

      return <span className="whitespace-nowrap">{bottleType}</span>;
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row: { original } }) => {
      const type = original?.type || "";
      const splittedType = type.split("_").join(" ");
      return (
        <span className="text-sm font-normal leading-5 text-default-600">
          <Badge
            className={cn(
              "whitespace-nowrap border-2 border-[#53389E] bg-[#2C1C5F] text-[#D6BBFB]",
              {
                "border-2 border-[#9E165F] bg-[#4E0D30] text-[#FAA7E0]":
                  type === "ALCOHOLIC",
              },
            )}
          >
            {splittedType}
          </Badge>
        </span>
      );
    },
  },

  {
    id: "children",
    accessorKey: "children",
    header: "Volume Variants",

    cell: ({ row: { original } }) => {
      const volumeVariants = original?.children?.map((child) => ({
        unit: child?.unit,
        volume: child?.volume,
      }));

      return (
        <div className="flex items-center gap-1">
          {volumeVariants?.slice(0, 2)?.map((variant, index) => (
            <Badge
              key={`variant-${index}`}
              className="rounded-lg border-2 border-[#333741] bg-transparent text-xs font-medium lowercase text-default-700"
            >
              {variant?.volume} {variant?.unit}
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
    id: "slug",
    accessorKey: "slug",
    header: "",
    cell: ({ row: { original } }) => {
      const productType = original?.type?.toLocaleLowerCase();
      const productSlug = original?.slug?.toLocaleLowerCase();
      return (
        <Link href={`${productType}/${productSlug}`}>
          <ArrowLeftLongIcon className="size-5 rotate-180 cursor-pointer text-default-600 hover:text-primary" />
        </Link>
      );
    },
  },
];

export function HandleSubComponent({
  row: { original },
}: {
  row: Row<Record<string, TGroupInventoryItemData["children"]>>;
}) {
  const childData = original?.children;
  if (!childData?.length) {
    return <NoDataFound />;
  }
  const isSoldByUnit = childData[0]?.soldBy === "UNIT";

  return (
    <div className="overflow-hidden rounded-md">
      <Table>
        <TableHeader className="border-none bg-secondary [&_tr]:border-t-0">
          <TableRow>
            <TableHead className="py-2.5">Volume</TableHead>
            <TableHead className="py-2.5">Product Code</TableHead>
            {!isSoldByUnit && (
              <TableHead className="py-2.5">Weight of Full Bottle</TableHead>
            )}
            {!isSoldByUnit && (
              <TableHead className="py-2.5">Weight of Empty Bottle</TableHead>
            )}
            <TableHead className="py-2.5">
              Stock {isSoldByUnit ? "(Cases)" : ""}
            </TableHead>
            {isSoldByUnit && (
              <TableHead className="py-2.5">Avg Price per Case</TableHead>
            )}

            <TableHead className="py-2.5">Avg Price per Item</TableHead>
            <TableHead className="py-2.5">Par Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {childData?.map((item) => (
            <TableRow key={item?.productCode || "N/A"}>
              <TableCell className="lowercase">
                {item?.volume || 0} {item?.unit}
              </TableCell>
              <TableCell>{item?.productCode || "N/A"} </TableCell>
              {!isSoldByUnit && (
                <TableCell className="lowercase">
                  {item?.netWeight && item?.netWeightUnit
                    ? `${item?.netWeight} ${item?.netWeightUnit}`
                    : "N/A"}
                </TableCell>
              )}
              {!isSoldByUnit && (
                <TableCell className="lowercase">
                  {item?.weightOfEmptyBottle || 0} {item?.netWeightUnit}{" "}
                </TableCell>
              )}
              <TableCell>
                {isSoldByUnit
                  ? item?.currentStockInCases || 0
                  : item?.currentStock || 0}{" "}
              </TableCell>
              {isSoldByUnit && (
                <TableCell>
                  {convertToNumber({
                    value: item?.pricePerCase,
                    digit: 2,
                  })}
                </TableCell>
              )}
              <TableCell>
                {convertToNumber({
                  value: item?.pricePerUnit,
                  digit: 2,
                })}
              </TableCell>

              <TableCell>{item?.perLevel || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
