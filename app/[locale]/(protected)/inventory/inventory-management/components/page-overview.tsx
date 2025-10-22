"use client";

import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import TabCard, { type TTabOption } from "@/components/tab-card";

import Notifications from "./notifications";
import StockInventory from "./stock-inventory";
import BarInventoryWrapper from "../bar-inventory/components/bar-inventory-wrapper";

type TTabValue = "stock-room" | "bar-inventory";
type TTabState = {
  tab?: TTabValue;
};
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Stock Room",
    value: "stock-room",
  },
  {
    label: "Bar Inventory",
    value: "bar-inventory",
  },
];

function PageOverview() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "stock-room";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "stock-room" ? undefined : value,
      }),
    [updateAParam],
  );

  return (
    <div className="space-y-6">
      <div className="mb-6 mt-10 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <TabCard tabs={tabs} value={tab} setTab={setTab} />
        </div>
        <div className="flex-none">
          <Notifications />
        </div>
      </div>

      {tab === "stock-room" && <StockInventory />}
      {tab === "bar-inventory" && <BarInventoryWrapper />}
    </div>
  );
}

export default PageOverview;
