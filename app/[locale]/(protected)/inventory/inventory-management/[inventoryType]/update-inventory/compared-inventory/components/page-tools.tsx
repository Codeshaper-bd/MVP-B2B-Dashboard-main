import React from "react";

import CreateInventoryDialog from "@/app/[locale]/(protected)/inventory/inventory-management/[inventoryType]/update-inventory/components/inventory-form/create-inventory-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import Filters from "./filters";

function PageTools() {
  return (
    <div className="flex">
      <h3 className="flex flex-1 items-center gap-3 text-xl text-default-900">
        <Switch id="non-alcoholic" color="success" />
        <Label htmlFor="non-alcoholic" className="mb-0">
          Non Alcoholic
        </Label>
      </h3>
      <div className="flex gap-3">
        <Filters />
        <CreateInventoryDialog />
      </div>
    </div>
  );
}

export default PageTools;
