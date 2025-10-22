"use client";
import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import CustomerHistory from "@/components/modules/customers/tables/CustomerHistory";
import CustomerListTable from "@/components/modules/customers/tables/CustomerList";
import TabCard, { type TTabOption } from "@/components/tab-card";

type TTabValue = "customerLookup" | "inviteHistory";

export type TTabCustomerState = { tab?: TTabValue };

const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Customer Lookup",
    value: "customerLookup",
  },
  {
    label: "Invite History",
    value: "inviteHistory",
  },
];
function CustomerPageContent() {
  const { getAParamValue, updateMultipleParam } = useManageSearchParams<
    TTabCustomerState & { page?: number }
  >();
  const tab: TTabValue = getAParamValue("tab") || "customerLookup";
  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateMultipleParam({
        tab: value === "customerLookup" ? undefined : value,
        page: 1,
      }),
    [updateMultipleParam],
  );
  return (
    <div className="mt-6">
      <TabCard tabs={tabs} value={tab} setTab={setTab} />
      <div className="h-6"></div>
      {tab === "customerLookup" && <CustomerListTable />}
      {tab === "inviteHistory" && <CustomerHistory />}
    </div>
  );
}

export default CustomerPageContent;
