"use client";

import Image from "next/image";
import React, { useState } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import ChevronDownFillIcon from "@/components/icons/ChevronDownFillIcon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DataNotFound from "@/components/ui/data-not-found";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TransferQuantityControl from "./quantity-control";

interface InventoryItemsTableProps {
  items: TGroupInventoryItemData[];
  transferQuantities: Record<number, number>;
  onQuantityChange: (productId: number, quantity: number) => void;
  sourceParam: string | null;
  selectedSoldByOption: string | null;
  isShowCases: boolean;
}

function InventoryItemsTable({
  items,
  transferQuantities,
  onQuantityChange,
  sourceParam,
  selectedSoldByOption,
  isShowCases,
}: InventoryItemsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (itemId: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <Card>
      <Table>
        <TableHeader className="[&_tr]:border-t-0">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sold By</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Volume Variants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => {
              const isExpanded = expandedRows[item.id] || false;
              const hasChildren = item.children && item.children.length > 0;
              const mediaUrl = item?.media?.filter((m) => m.isFeatured)[0]?.url;
              const volumeVariants = item?.children?.map((child) => ({
                unit: child?.unit,
                volume: child?.volume,
              }));
              const isSoldByUnit = item?.soldBy === "UNIT";

              return (
                <React.Fragment key={item.id}>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        {hasChildren && (
                          <button
                            onClick={() => toggleRow(item.id)}
                            className="p-2"
                          >
                            <ChevronDownFillIcon
                              className={cn(
                                "h-1.5 w-3",
                                isExpanded ? "rotate-0" : "rotate-180",
                              )}
                            />
                          </button>
                        )}
                        <div className="flex h-8 w-[46px] items-center justify-center overflow-hidden rounded bg-default-100">
                          <Image
                            width={32}
                            height={32}
                            className="h-auto max-h-8 w-auto max-w-[46px] rounded object-contain"
                            src={getImageFallback({
                              src: mediaUrl,
                              fallbackImageSize: 100,
                            })}
                            alt=""
                            style={{ objectPosition: "center" }}
                          />
                        </div>
                        <span className="whitespace-nowrap">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.category || item.categoryId || "N/A"}
                    </TableCell>
                    <TableCell>
                      {(item?.soldBy || "")?.split("_")?.join(" ")}
                    </TableCell>
                    <TableCell>
                      {item?.type ? (
                        <Badge
                          className={cn(
                            "whitespace-nowrap border-2 border-[#53389E] bg-[#2C1C5F] text-[#D6BBFB]",
                            {
                              "border-2 border-[#9E165F] bg-[#4E0D30] text-[#FAA7E0]":
                                item.type === "ALCOHOLIC",
                            },
                          )}
                        >
                          {(item?.type || "").split("_").join(" ")}
                        </Badge>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {volumeVariants?.slice(0, 2)?.map((variant, index) => (
                          <Badge
                            key={`variant-${index}`}
                            className="rounded-lg border-2 border-[#333741] bg-transparent text-xs font-medium text-default-700"
                          >
                            {variant.volume} {variant.unit}
                          </Badge>
                        ))}
                        {!!volumeVariants?.length &&
                          volumeVariants?.length > 2 && (
                            <Badge className="rounded-lg border-2 border-[#333741] bg-transparent text-xs font-medium text-default-700">
                              +{volumeVariants?.length - 2}
                            </Badge>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>

                  {isExpanded && hasChildren && (
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <div className="overflow-hidden rounded-md bg-default-50 p-2">
                          <Table>
                            <TableHeader className="border-none bg-secondary [&_tr]:border-t-0">
                              <TableRow>
                                <TableHead className="py-2.5">Volume</TableHead>
                                <TableHead className="py-2.5">
                                  Product ID
                                </TableHead>
                                <TableHead className="py-2.5">
                                  {`Stock${isSoldByUnit ? " (cases)" : ""}`}
                                </TableHead>
                                <TableHead className="py-2.5">
                                  Price Per Item
                                </TableHead>
                                {!sourceParam && (
                                  <TableHead className="py-2.5">
                                    Par Level
                                  </TableHead>
                                )}
                                <TableHead className="py-2.5">
                                  {`Transfer Qty${
                                    isSoldByUnit ? " (cases)" : ""
                                  }`}
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {item.children?.map((child: any) => (
                                <TableRow
                                  key={child?.id || child?.productCode || "N/A"}
                                >
                                  <TableCell className="lowercase">
                                    {child?.volume || 0} {child?.unit}
                                  </TableCell>
                                  <TableCell>
                                    {child?.productCode || "N/A"}
                                  </TableCell>
                                  <TableCell>
                                    {isSoldByUnit
                                      ? child?.currentStockInCases || 0
                                      : child?.currentStock || 0}
                                  </TableCell>
                                  <TableCell>
                                    ${child?.pricePerUnit?.toFixed(2) || "0.00"}
                                  </TableCell>
                                  {!sourceParam && (
                                    <TableCell>
                                      {child?.perLevel || 0}
                                    </TableCell>
                                  )}
                                  <TableCell>
                                    <TransferQuantityControl
                                      productId={child?.id || 0}
                                      currentValue={
                                        transferQuantities[child?.id] || 0
                                      }
                                      maxValue={
                                        isSoldByUnit
                                          ? child?.currentStockInCases || 0
                                          : child?.currentStock || 0
                                      }
                                      onChange={onQuantityChange}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <DataNotFound title="No inventory items found" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

export default InventoryItemsTable;
