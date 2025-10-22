"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { typeOfChallengeOptions } from "@/app/[locale]/(protected)/dashboard/challenges/components/Forms/CreateChallengeForm/utils";
import DescriptionTooltip from "@/app/[locale]/(protected)/events/host-event/form-stepper/steps/step-four/components/challenges-table/description-tooltip";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getChallengeStatusColor } from "@/lib/get-status-colors";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import { Badge } from "@/components/ui/badge";

import actionCell from "./action-cell";

export const columns: ColumnDef<TChallenge>[] = [
  {
    accessorKey: "challengeName",
    header: "Challenge Name",
    cell: ({ row: { original } }) => (
      <div className="min-w-[184px] whitespace-nowrap text-sm font-medium leading-5 text-default-900">
        <span>{original?.name}</span>
      </div>
    ),
  },

  {
    accessorKey: "description",
    header: () => <div className="">Description</div>,
    cell: DescriptionTooltip,
  },

  {
    accessorKey: "typeOfChallenge",
    header: "Type Of Challenge",
    cell: ({ row: { original } }) => (
      <div className="min-w-[144px] whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        <span>
          {typeOfChallengeOptions?.find(
            (option) =>
              !!option?.value &&
              !!original?.type &&
              option?.value === original?.type,
          )?.label || "N/A"}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "pointsEarned",
    header: "Points Earned",
    cell: ({ row: { original } }) => (
      <div className="min-w-[97px] text-sm font-normal leading-5 text-default-600">
        <span>{original?.pointsEarned ?? 0}</span>
      </div>
    ),
  },

  {
    accessorKey: "dateRange",
    header: "Date Range",
    cell: ({ row: { original }, row }) => (
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
