"use client";
import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import TabCard, { type TTabOption } from "@/components/tab-card";

import CustomerDetails from "./components/CustomerDetails";
import PurchaseHistory from "./components/PurchaseHistory";

type TTabValue = "personalDetails" | "purchaseHistorySummery";
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Personal Details",
    value: "personalDetails",
  },
  {
    label: "Purchase History Summary",
    value: "purchaseHistorySummery",
  },
];
function CustomerDetailsPageContent() {
  const { getAParamValue, updateAParam } = useManageSearchParams<{
    tab?: TTabValue;
  }>();
  const tab: TTabValue = getAParamValue("tab") || "personalDetails";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "personalDetails" ? undefined : value,
      }),
    [updateAParam],
  );
  return (
    <div className="my-6">
      <TabCard tabs={tabs} value={tab} setTab={setTab} />
      <div className="h-6"></div>
      {tab === "personalDetails" && <CustomerDetails />}
      {tab === "purchaseHistorySummery" && <PurchaseHistory />}
    </div>
  );
}

export default CustomerDetailsPageContent;
