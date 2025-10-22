"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

import PageHeader from "@/components/partials/header/page-header";

import { useInventoryTransfer } from "../hooks/useInventoryTransfer";

interface TransferHeaderProps {
  barName?: string;
  productCount?: number;
}

function TransferHeader({
  barName = "Stock Room",
  productCount = 0,
}: TransferHeaderProps) {
  const searchParams = useSearchParams();
  const sourceParam = searchParams.get("source");

  // Use the hook to get real-time data
  const { sourceBarId, barsData, inventoryItems } = useInventoryTransfer({
    initialSourceBarSlug: sourceParam,
  });

  // Calculate the actual bar name and product count
  const actualBarName =
    barName !== "Stock Room"
      ? barName
      : sourceBarId === null
        ? "Stock Room"
        : barsData.find((bar) => bar.id === sourceBarId)?.name || "Stock Room";

  const actualProductCount =
    productCount > 0 ? productCount : inventoryItems?.length || 0;

  return (
    <div className="space-y-1">
      <PageHeader
        title={actualBarName}
        description={`${actualProductCount} Product${actualProductCount !== 1 ? "s" : ""}`}
      />
    </div>
  );
}

export default TransferHeader;
