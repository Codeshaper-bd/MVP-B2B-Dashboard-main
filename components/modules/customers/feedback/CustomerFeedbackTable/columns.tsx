"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import type { TFeedback } from "@/store/api/feedback/feedback.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Rating from "@/components/ui/Rating";

import FeedBackCell from "./feed-back-cell";
import PageNumber from "./page-number";
import ReplayComponent from "./reply-component";

export const columns: ColumnDef<TFeedback>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "No.",
    cell: PageNumber,
  },
  {
    accessorKey: "reviewerName",
    accessorFn: (row) => row.reviewer?.name,
    header: "Name",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={original?.reviewer?.media?.url || ""} />
          <AvatarFallback>
            {original?.reviewer?.name?.slice(0, 2)}{" "}
          </AvatarFallback>
        </Avatar>

        <p className="whitespace-nowrap text-sm font-medium leading-5 text-default-900">
          {original?.reviewer?.name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "reviewerEmail",
    accessorFn: (row) => row.reviewer?.email,
    header: "Email",
    cell: ({ row: { original } }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {original?.reviewer?.email}
      </span>
    ),
  },
  {
    accessorKey: "event",
    header: "Event Name",
    cell: ({ row: { original } }) => (
      <span className="max-w-[300px] whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {original?.event?.name}
      </span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => <span>{row.getValue("source")}</span>,
  },

  {
    accessorKey: "feedback",
    header: "Feedback",
    cell: FeedBackCell,
  },
  {
    accessorKey: "rating",
    accessorFn: (row) => row?.rating,
    header: "Rating",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        <div className="flex items-center gap-1.5">
          <Rating rating={row.getValue("rating") || 0} />
          <p>{row.getValue("rating")}</p>
        </div>
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "reply",
    header: "Reply",
    cell: ReplayComponent,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: row.getValue("createdAt"),
          format: "DD-MM-YYYY",
        })}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    accessorFn: (row) => row?.rating,
    cell: ({ row: { original } }) => {
      const sentiment = original?.rating;
      const getSentimentData = () => {
        if (sentiment < 3) {
          return {
            classes: "bg-[#55160C] border-[#912018] text-[#FDA29B]",
            text: "Negative",
          };
        }
        if (sentiment === 3) {
          return {
            classes: "bg-[#161B26] border-[#333741] text-default-700",
            text: "Neutral",
          };
        }
        return {
          classes: "bg-[#053321] border-[#085D3A] text-[#75E0A7]",
          text: "Positive",
        };
      };
      const { classes, text } = getSentimentData();

      return (
        <Badge className={cn("text-xs font-medium", classes)}>{text}</Badge>
      );
    },
  },
];
