"use client";

import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import type { TBar } from "@/store/api/bars/bars.types";
import BoxClosedIcon from "@/components/icons/BoxClosedIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  selectVariants,
} from "@/components/ui/select";

interface BarSelectorsProps {
  bars: TBar[];
  sourceBarId: number | null;
  destBarId: number | null;
  onSourceChange: (id: number | null) => void;
  onDestChange: (id: number | null) => void;
  className?: string;
}

// Helper function to get bar image URL from bar data
const getBarImageUrl = (barId: number | null, bars: TBar[]) => {
  if (!barId) {
    return null;
  } // Return null for Stock Room, we'll use BoxClosedIcon instead

  const bar = bars.find((bar) => bar.id === barId);
  return bar?.media?.url || null;
};

// Helper function to get bar name based on bar ID
const getBarName = (barId: number | null, bars: TBar[]) => {
  if (!barId) {
    return "Stock Room";
  }

  const bar = bars.find((bar) => bar.id === barId);
  return bar ? bar.name : "Unknown Bar";
};

function BarSelectors({
  bars,
  sourceBarId,
  destBarId,
  onSourceChange,
  onDestChange,
  className = "",
}: BarSelectorsProps) {
  const sourceBarImageUrl = getBarImageUrl(sourceBarId, bars);
  const destBarImageUrl = getBarImageUrl(destBarId, bars);
  const sourceBarName = getBarName(sourceBarId, bars);

  return (
    <div className={`flex w-full flex-col gap-6 md:flex-row ${className}`}>
      {/* From */}
      <div className="flex-1">
        <div className="mb-2 text-sm font-medium">From</div>
        <div
          className={cn(
            selectVariants({ color: "default", size: "sm", rounded: "lg" }),
            "flex h-10 w-full items-center justify-start gap-2 px-4 text-left text-sm",
          )}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            {sourceBarId === null ? (
              <BoxClosedIcon className="h-4 w-4 text-orange-500" />
            ) : sourceBarImageUrl ? (
              <Image
                src={sourceBarImageUrl}
                alt="Source Bar"
                fill
                className="rounded object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                <span className="text-xs font-medium text-gray-500">
                  {sourceBarName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <span className="truncate">{sourceBarName}</span>
        </div>
      </div>

      {/* To */}
      <div className="flex-1">
        <div className="mb-2 text-sm font-medium">To</div>
        <Select
          value={destBarId?.toString() || undefined}
          onValueChange={(value) =>
            onDestChange(value === "stock-room" ? null : Number(value))
          }
        >
          <SelectTrigger
            id="dest-bar"
            className={cn(
              "flex h-10 w-full items-center justify-start gap-2 px-4 text-left text-sm",
            )}
            size="sm"
          >
            {/* <div className="relative h-5 w-5 flex-shrink-0">
              {destBarId === null ? (
                <BoxClosedIcon className="h-4 w-4 text-orange-500" />
              ) : destBarImageUrl ? (
                <Image
                  src={destBarImageUrl}
                  alt="Destination Bar"
                  fill
                  className="rounded object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                  <span className="text-xs font-medium text-gray-500">
                    {getBarName(destBarId, bars).charAt(0)}
                  </span>
                </div>
              )}
            </div> */}
            {destBarId !== null && (
              <div className="relative h-5 w-5 flex-shrink-0">
                {destBarImageUrl ? (
                  <Image
                    src={destBarImageUrl}
                    alt="Destination Bar"
                    fill
                    className="rounded object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                    <span className="text-xs font-medium text-gray-500">
                      {getBarName(destBarId, bars).charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            )}
            <SelectValue placeholder="Select Destination Bar">
              {getBarName(destBarId, bars)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="stock-room" disabled>
              Stock Room
            </SelectItem> */}
            {bars
              .filter((bar) => bar.id !== sourceBarId)
              .map((bar) => (
                <SelectItem key={bar.id} value={bar.id.toString()}>
                  {bar.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default BarSelectors;
