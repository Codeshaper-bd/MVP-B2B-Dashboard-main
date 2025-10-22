"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { typeOfPromotionOptions } from "@/app/[locale]/(protected)/dashboard/promotions/components/Forms/CreatePromotionForm/utils";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getChallengeStatusColor } from "@/lib/get-status-colors";
import { type TPromotion } from "@/store/api/promotion/promotion.types";
import { Badge } from "@/components/ui/badge";

import actionCell from "./action-cell";
import descriptionTooltip from "./description-tooltip";

export const columns: ColumnDef<TPromotion>[] = [
  {
    accessorKey: "isPrivate",
    header: "TAG",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        <Badge
          className={
            original?.isPrivate
              ? "border-[#1849A9] bg-[#102A56] text-[#84CAFF]"
              : "mulberryRose"
          }
        >
          {original?.isPrivate ? "Private" : "Public"}
        </Badge>
      </span>
    ),
  },
  {
    accessorKey: "promotionName",
    header: "Promotion Name",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {original?.name}
      </span>
    ),
  },
  {
    accessorKey: "promotionType",
    header: "Promotion Type",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {typeOfPromotionOptions?.find(
          (option) =>
            !!option?.value &&
            !!original?.type &&
            option?.value === original?.type,
        )?.label || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "detail",
    header: "Description",
    cell: descriptionTooltip,
  },
  {
    accessorKey: "promotionDuration",
    header: "Promotion Duration",
    cell: ({ row: { original } }) => (
      <div className="min-w-[184px] whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        <span>{`${convertUTCToLocal({
          format: "hh:mm A, DD MMM YYYY",
          utcDateTime: original?.startDate,
        })} - ${convertUTCToLocal({
          format: "hh:mm A, DD MMM YYYY",
          utcDateTime: original?.endDate,
        })}`}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original } }) => (
      <Badge className={getChallengeStatusColor(original?.status ?? "")}>
        {original?.status}
      </Badge>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="w-full text-center">Action</div>,
    cell: actionCell,
  },
];
