"use client";

import { useParams } from "next/navigation";

import CreateInventoryDialog from "@/app/[locale]/(protected)/inventory/inventory-management/[inventoryType]/update-inventory/components/inventory-form/create-inventory-dialog";
import TransferButton from "@/app/[locale]/(protected)/inventory/inventory-management/transfer/components/transfer-button";
import SearchComponent from "@/components/ui/search-component";

import FiltersCard from "./filters-card";
import InventoryManagementFilter from "./InventoryManagementFilter";
import AddShipmentDialog from "../modals/add-shipment-dialog";

function InventoryHeader() {
  const { inventoryType } = useParams();
  const isNonAlcoholic = inventoryType === "alcoholic";
  return (
    <div className="mt-4 flex flex-col flex-wrap gap-2 lg:flex-row lg:items-center">
      <div className="flex-1">
        <SearchComponent className="max-w-[312px]" placeholder="Search" />
      </div>

      <div className="flex flex-none flex-wrap items-center gap-3">
        {isNonAlcoholic && (
          <>
            <span className="text-sm font-semibold text-default-700">
              Sold by The
            </span>
            <FiltersCard />
          </>
        )}

        <InventoryManagementFilter />
        <AddShipmentDialog />
        <TransferButton barSlug={undefined} />
        <CreateInventoryDialog />
      </div>
    </div>
  );
}

export default InventoryHeader;
