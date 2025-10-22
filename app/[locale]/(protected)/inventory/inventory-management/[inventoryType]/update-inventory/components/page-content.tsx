"use client";
import { memo, useCallback } from "react";

import CreateInventoryDialog from "@/app/[locale]/(protected)/inventory/inventory-management/[inventoryType]/update-inventory/components/inventory-form/create-inventory-dialog";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TSoldBy } from "@/store/api/inventory-item/inventory-item.types";
import TabCard, { type TTabOption } from "@/components/tab-card";

import UpdateInventoryHeader from "./update-inventory-header";
import CurrentInventoryTable from "../../../components/stock-inventory-table";

// export type TTabValue = "hard-liquor" | "bottled-and-canned";
export type TTabValue = TSoldBy;
type TTabState = {
  tab?: TTabValue;
};
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Volume",
    value: "VOLUME",
  },
  {
    label: "Unit",
    value: "UNIT",
  },
];

function PageContent() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "VOLUME";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "VOLUME" ? undefined : value,
      }),
    [updateAParam],
  );

  return (
    <>
      <UpdateInventoryHeader />

      <div className="mt-6 space-y-4">
        <div className="flex">
          <h3 className="flex-1 text-xl text-default-900">Inventory</h3>
          <div className="flex flex-none items-center gap-3">
            <TabCard tabs={tabs} value={tab} setTab={setTab} />
            <CreateInventoryDialog />
          </div>
        </div>

        <CurrentInventoryTable />
      </div>
    </>
  );
}

export default memo(PageContent);
