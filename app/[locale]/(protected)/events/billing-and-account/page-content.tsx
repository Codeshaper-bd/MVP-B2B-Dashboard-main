"use client";
import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventPayoutContent from "@/components/modules/billing-account/EventPayoutContent";
import TransactionsContent from "@/components/modules/billing-account/TransactionContent";
import TabCard, { type TTabOption } from "@/components/tab-card";

type TTabValue = "eventPayout" | "transactionHistory";
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Event Payout",
    value: "eventPayout",
  },
  {
    label: "Transaction History",
    value: "transactionHistory",
  },
];
function PageContent() {
  const { getAParamValue, updateAParam } = useManageSearchParams<{
    tab?: TTabValue;
  }>();
  const tab: TTabValue = getAParamValue("tab") || "eventPayout";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "eventPayout" ? undefined : value,
      }),
    [updateAParam],
  );
  return (
    <div className="">
      <TabCard tabs={tabs} value={tab} setTab={setTab} />

      {tab === "eventPayout" && <EventPayoutContent />}
      {tab === "transactionHistory" && <TransactionsContent />}
    </div>
  );
}

export default PageContent;
