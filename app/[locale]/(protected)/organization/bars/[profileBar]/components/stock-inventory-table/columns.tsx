"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import ArrowLeftLongIcon from "@/components/icons/ArrowLeftLongIcon";
import ChevronDownFillIcon from "@/components/icons/ChevronDownFillIcon";
import { Badge } from "@/components/ui/badge";

import PageNumber from "./page-number";

type TPageParams = Params & { locale?: string; barSlug?: string };

function Actions({ row: { original } }: { row: Row<TGroupInventoryItemData> }) {
  const { barSlug } = useParams<TPageParams>();

  return (
    <Link
      href={`/en/inventory/inventory-management/bar-inventory/${barSlug}/${original?.children?.[0]?.inventoryItemId}`}
    >
      <ArrowLeftLongIcon className="size-5 rotate-180 cursor-pointer text-default-600 hover:text-primary" />
    </Link>
  );
}

export const columns: ColumnDef<TGroupInventoryItemData>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "No",
    cell: PageNumber,
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

          <div className="h-8 w-[46px] overflow-hidden rounded bg-default-100">
            <Image
              width={46}
              height={32}
              className="size-full rounded object-cover"
              src={mediaUrl || "/assets/all/placeholder.png"}
              alt=""
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
    id: "bottleType",
    accessorKey: "bottleType",
    header: "Sold By",
    cell: ({ row: { original } }) => {
      const bottleType = String(original?.soldBy || "")
        .split("_")
        .join(" ");

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
              className="rounded-lg border-2 border-[#333741] bg-transparent text-xs font-medium text-default-700"
            >
              {convertToNumber({
                value: variant?.volume,
              })}{" "}
              {variant?.unit}
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
    cell: Actions,
  },
];
