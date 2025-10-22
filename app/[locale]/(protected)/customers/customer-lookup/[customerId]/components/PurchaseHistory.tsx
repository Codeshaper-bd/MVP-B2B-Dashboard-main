"use client";
import { useCallback } from "react";

import { useGetCustomerId } from "@/hooks/feature/useGetCustomerId";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import CustomerEventList from "@/components/modules/customers/CustomerEventList";
import CustomerProductsContent from "@/components/modules/customers/CustomerProductsContent";
import SpendTable from "@/components/modules/customers/tables/SpendTable";
import TabCard, { type TTabOption } from "@/components/tab-card";

type TTabValue = "tickets" | "product";
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Tickets",
    value: "tickets",
  },
  {
    label: "Product",
    value: "product",
  },
];

function PurchaseHistory() {
  const { userId, isValidUserId } = useGetCustomerId();
  const { getAParamValue, updateAParam } = useManageSearchParams<{
    tab2?: TTabValue;
  }>();
  const tab: TTabValue = getAParamValue("tab2") || "tickets";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab2",
        value,
      }),
    [updateAParam],
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#F5F5F6]">
            Order History
          </h3>
        </div>

        <div className="flex-none">
          <TabCard tabs={tabs} value={tab} setTab={setTab} />
        </div>
      </div>

      {tab === "tickets" && (
        <div className="space-y-6">
          <SpendTable userId={userId} isValidUserId={isValidUserId} />
          <CustomerEventList userId={userId} isValidUserId={isValidUserId} />
        </div>
      )}
      {tab === "product" && (
        <CustomerProductsContent
          userId={userId}
          isValidUserId={isValidUserId}
        />
      )}
    </>
  );
}

export default PurchaseHistory;
