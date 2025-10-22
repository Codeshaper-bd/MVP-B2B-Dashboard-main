"use client";

import { useSearchParams } from "next/navigation";

import BackButton from "@/components/Buttons/back-button";
import ArrowLeftLongIcon from "@/components/icons/ArrowLeftLongIcon";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import BarSelectors from "./bar-selectors";
import InventoryItemsTable from "./inventory-items-table";
import PageTools from "./page-tools";
import TransferSummaryModal from "./transfer-summary-modal";
import { useInventoryTransfer } from "../hooks/useInventoryTransfer";

function TransferPageContent() {
  const searchParams = useSearchParams();
  const sourceParam = searchParams.get("source");
  const selectedSoldByOption = searchParams.get("soldBy");

  // Use our custom hook for all the inventory transfer logic
  const {
    sourceBarId,
    destBarId,
    transferQuantities,
    isModalOpen,
    barsData,
    inventoryItems,
    itemsToTransfer,
    notes,
    setIsModalOpen,
    setDestBarId,
    handleSourceBarChange,
    handleQuantityChange,
    handleItemRemove,
    handleTransfer,
    resetTransferQuantities,
    setNotesState,
  } = useInventoryTransfer({ initialSourceBarSlug: sourceParam });

  const isShowCases = sourceParam === null && selectedSoldByOption === `"UNIT"`;

  return (
    <div className="mt-6 space-y-6">
      {/* Top section with bar selectors and action buttons in a single container */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          {/* Left: Bar Selectors*/}
          <div className="flex w-full gap-4 md:max-w-[60%]">
            <BarSelectors
              bars={barsData}
              sourceBarId={sourceBarId}
              destBarId={destBarId}
              onSourceChange={handleSourceBarChange}
              onDestChange={setDestBarId}
              className="flex-1"
            />
          </div>

          {/* Right: Buttons */}
          <div className="flex gap-3 md:justify-end">
            <Button
              onClick={() => {
                if (itemsToTransfer.length > 0) {
                  setIsModalOpen(true);
                } else {
                  toast({
                    title: "Error",
                    description: "No items selected for transfer",
                    variant: "destructive",
                  });
                }
              }}
              disabled={itemsToTransfer.length === 0}
              color="primary"
            >
              Transfer
              <ArrowLeftLongIcon className="ms-1 size-4 rotate-180" />
            </Button>
            <BackButton />
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div className="rounded-lg border bg-card p-6">
        <PageTools />
      </div>

      {/* Show inventory items table */}
      <InventoryItemsTable
        items={inventoryItems}
        transferQuantities={transferQuantities}
        onQuantityChange={handleQuantityChange}
        sourceParam={sourceParam}
        selectedSoldByOption={selectedSoldByOption}
        isShowCases={isShowCases}
      />

      <TransferSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={itemsToTransfer}
        sourceBar={
          sourceBarId === null
            ? "Stock Room"
            : barsData.find((bar) => bar.id === sourceBarId)?.name || ""
        }
        destBar={
          destBarId === null
            ? "Stock Room"
            : barsData.find((bar) => bar.id === destBarId)?.name || ""
        }
        onConfirm={handleTransfer}
        onReset={resetTransferQuantities}
        bars={barsData}
        onDestBarChange={setDestBarId}
        onItemRemove={handleItemRemove}
        notes={notes}
        onNotesChange={setNotesState}
        isShowCases={isShowCases}
      />
    </div>
  );
}

export default TransferPageContent;
