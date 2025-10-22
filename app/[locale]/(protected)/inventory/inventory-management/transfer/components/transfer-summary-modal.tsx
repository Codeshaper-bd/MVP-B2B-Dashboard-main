"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

import type { TBar } from "@/store/api/bars/bars.types";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import DeleteIcon from "@/components/icons/DeleteIcon";
import SwitchHorizontalIcon from "@/components/icons/SwitchHorizontalIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

import BarSelectors from "./bar-selectors";
import TransferQuantityControl from "./inventory-items-table/quantity-control";

// Group transfer items by product
interface TransferItemVolume {
  id: number;
  productId: number;
  quantity: number;
  volume: string;
  unit: string;
  stock: number;
  stockInCases: number;
  price: number;
}

interface GroupedTransferItem {
  productId: number;
  productName: string;
  productImage?: string;
  volumes: TransferItemVolume[];
}

interface TransferItem {
  productId: number;
  quantity: number;
  productName: string;
  productImage?: string;
  productDetails: {
    id: number; // Changed from optional to required to match useInventoryTransfer
    stock: number;
    stockInCases: number;
    price: number;
    unit?: string;
    volume?: string;
  };
}

interface TransferSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: TransferItem[];
  sourceBar: string;
  destBar: string;
  onConfirm: () => void;
  onReset: () => void;
  onDestBarChange?: (barId: number | null) => void; // Callback for destination bar change
  onItemRemove?: (itemId: number) => void; // Callback for when an item is removed
  bars?: TBar[]; // Optional bars data for dropdown
  notes?: string; // Notes for the transfer
  onNotesChange?: (notes: string) => void; // Callback for when notes change
  isShowCases: boolean;
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

function TransferSummaryModal({
  isOpen,
  onClose,
  items,
  sourceBar,
  destBar,
  onConfirm,
  onReset,
  onDestBarChange,
  onItemRemove,
  bars = [], // Default to empty array if not provided
  notes = "", // Default to empty string if not provided
  onNotesChange,
  isShowCases,
}: TransferSummaryModalProps) {
  // State to track items that will be displayed
  const [displayItems, setDisplayItems] = useState<TransferItem[]>([]);
  const [sourceBarId, setSourceBarId] = useState<number | null>(null);
  const [destBarId, setDestBarId] = useState<number | null>(null);
  const [availableBars, setAvailableBars] = useState<TBar[]>([]);
  const [transferNotes, setTransferNotes] = useState<string>(notes);
  // Initialize bars data only once or when bars prop changes
  useEffect(() => {
    // Use provided bars data or fallback to mock data if empty
    const barsData =
      bars.length > 0
        ? bars
        : ([
            {
              id: 1,
              name: "Main Bar",
              slug: "main-bar",
              media: { url: "/images/bars/main-bar.jpg" },
            },
            {
              id: 2,
              name: "Lower Bar",
              slug: "lower-bar",
              media: { url: "/images/bars/lower-bar.jpg" },
            },
            {
              id: 3,
              name: "VIP Bar",
              slug: "vip-bar",
              media: { url: "/images/bars/vip-bar.jpg" },
            },
          ] as TBar[]);

    setAvailableBars(barsData);
  }, [bars]);

  // Set source and dest bar IDs based on names
  useEffect(() => {
    if (!availableBars.length) {
      return;
    }

    if (sourceBar === "Stock Room") {
      setSourceBarId(null);
    } else {
      const foundBar = availableBars.find((b) => b.name === sourceBar);
      setSourceBarId(foundBar?.id || 1); // Use found ID or default to 1
    }
  }, [sourceBar, availableBars]);

  useEffect(() => {
    if (!availableBars.length) {
      return;
    }

    if (destBar === "Stock Room") {
      setDestBarId(null);
    } else {
      const foundBar = availableBars.find((b) => b.name === destBar);
      setDestBarId(foundBar?.id || 2); // Use found ID or default to 2
    }
  }, [destBar, availableBars]);

  // Update display items when the items prop changes
  useEffect(() => {
    setDisplayItems(items);
  }, [items]);

  // Function to remove an item from the transfer
  const handleRemoveItem = (itemId: number) => {
    setDisplayItems((prev) => prev.filter((item) => item.productId !== itemId));
    // Notify parent component about the item removal
    if (onItemRemove) {
      onItemRemove(itemId);
    }
  };

  // Function to directly update quantity for a volume
  const handleUpdateQuantity = (volumeId: number, newQuantity: number) => {
    // Update the display items directly
    setDisplayItems((prev) =>
      prev.map((item) => {
        // Check if this is the item we want to update
        if (item.productDetails.id === volumeId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      }),
    );
  };

  // Group items by product
  const groupedItems: Record<string, GroupedTransferItem> = {};

  displayItems.forEach((item) => {
    // Extract parent product ID if this is a child item
    const productName = item.productName;
    const productId = item.productId;

    const volumeInfo = {
      id: item.productDetails.id,
      productId,
      quantity: item.quantity,
      volume: item.productDetails.volume || "",
      unit: item.productDetails.unit || "",
      stock: item.productDetails.stock,
      stockInCases: item.productDetails.stockInCases,
      price: item.productDetails.price,
    };

    // Use product name as key to group items
    if (!groupedItems[productName]) {
      groupedItems[productName] = {
        productId,
        productName,
        productImage: item.productImage,
        volumes: [],
      };
    }

    groupedItems[productName].volumes.push(volumeInfo);
  });

  const groupedItemsList = Object.values(groupedItems);

  // Handle confirm with filtered items
  const handleConfirm = () => {
    // Only transfer items that are still in the display list
    onConfirm();
  };

  // Handle destination bar change
  const handleDestBarChange = (id: number | null) => {
    setDestBarId(id);

    // Notify parent component about the destination bar change
    if (onDestBarChange) {
      onDestBarChange(id);
    }
  };

  return (
    <DialogContextProvider open={isOpen} onOpenChange={onClose}>
      <CustomizedDialog
        maxWidth="800px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Transfer Summary"
        icon={<SwitchHorizontalIcon className="size-6 text-default-700" />}
        withCloseButton
        onClose={({ setClose }) => setClose()}
      >
        {/* Use the BarSelectors component for consistent UI */}
        <BarSelectors
          bars={availableBars}
          sourceBarId={sourceBarId}
          destBarId={destBarId}
          onSourceChange={() => {}} // Source bar is non-editable in this context
          onDestChange={handleDestBarChange}
          className="mb-4"
        />

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">PRODUCT & VOLUME</TableHead>
                <TableHead>STOCK</TableHead>
                <TableHead>PRICE PER ITEM</TableHead>
                <TableHead className="w-[160px] text-right">
                  TRANSFER QTY
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedItemsList.length > 0 ? (
                groupedItemsList.map((group) => (
                  <React.Fragment key={group.productName}>
                    <TableRow className="bg-default-50">
                      <TableCell colSpan={4} className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 overflow-hidden rounded">
                            {group.productImage ? (
                              <Image
                                src={group.productImage}
                                alt={group.productName}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                <span className="text-xs font-medium text-gray-500">
                                  {group.productName.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          {group.productName}
                        </div>
                      </TableCell>
                    </TableRow>
                    {group.volumes.map((volume) => (
                      <TableRow key={`${volume.id}-${volume.volume}`}>
                        <TableCell className="flex items-center gap-2">
                          <Badge className="rounded-lg border-2 border-[#333741] bg-transparent text-xs font-medium text-default-700">
                            {volume.volume} {volume.unit}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {isShowCases ? volume.stockInCases : volume.stock}
                        </TableCell>
                        <TableCell>$ {volume.price.toFixed(2)}</TableCell>
                        <TableCell className="flex min-w-[200px] flex-nowrap items-center justify-end gap-2 pr-2">
                          <TransferQuantityControl
                            productId={volume.id}
                            currentValue={volume.quantity}
                            maxValue={
                              isShowCases ? volume.stockInCases : volume.stock
                            }
                            onChange={handleUpdateQuantity}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-8 w-8 flex-shrink-0 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(volume.productId)}
                          >
                            <DeleteIcon className="h-full w-[17px] shrink-0 text-default-1000" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <DataNotFound title="No items selected for transfer" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Notes section */}
        <div className="mt-6">
          <textarea
            className="min-h-[100px] w-full rounded-md border border-default-200 bg-default-50 p-4 text-sm text-default-900 placeholder:text-default-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Notes..."
            value={transferNotes}
            onChange={(e) => {
              const newNotes = e.target.value;
              setTransferNotes(newNotes);
              // Update parent component's notes state if callback provided
              if (onNotesChange) {
                onNotesChange(newNotes);
              }
            }}
          />
        </div>

        <CustomizedDialog.Buttons className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onReset}>
            Reset Transfer Qty
          </Button>

          <div className="flex gap-2">
            <CustomizedDialog.Buttons.SecondaryButton onClick={onClose}>
              Cancel
            </CustomizedDialog.Buttons.SecondaryButton>

            <CustomizedDialog.Buttons.PrimaryButton
              onClick={handleConfirm}
              className="bg-yellow-400 text-black hover:bg-yellow-500"
            >
              Confirm Transfer
            </CustomizedDialog.Buttons.PrimaryButton>
          </div>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default TransferSummaryModal;
