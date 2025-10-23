"use client";
import { memo } from "react";

import CreateInventoryDialog from "@/app/[locale]/(protected)/inventory/inventory-management/[inventoryType]/update-inventory/components/inventory-form/create-inventory-dialog";
import { SearchIcon as SearchIcon } from "@/components/icons";
import SearchComponent from "@/components/ui/search-component";

import Filters from "./filters";

function PageTools() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <SearchComponent
        searchIcon={<SearchIcon className="size-5 text-default-600" />}
      />
      <div className="flex items-center gap-3">
        <Filters />
        <CreateInventoryDialog />
      </div>
    </div>
  );
}

export default memo(PageTools);
