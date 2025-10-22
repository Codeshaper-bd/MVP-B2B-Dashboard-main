"use client";
import { useParams } from "next/navigation";
import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAllInventoryItemArgs } from "@/store/api/inventory-item/inventory-item.types";
import SoldByDropDown from "@/components/features/dropdown/SoldByDropDown";
import SearchIcon from "@/components/icons/SearchIcon";
import TabCard, { type TTabOption } from "@/components/tab-card";
import SearchComponent from "@/components/ui/search-component";

import Filters from "./filters";
import TransferButton from "../../../../transfer/components/transfer-button";

export type TTabValue = "alcohol" | "non-alcoholic";
export type TTabState = {
  tab?: TTabValue;
};
export const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Alcohol",
    value: "alcohol",
  },
  {
    label: "Non Alcoholic",
    value: "non-alcoholic",
  },
];

function PageTools() {
  const params = useParams();
  const barId = Array.isArray(params.barId) ? params.barId[0] : params.barId;
  const barSlug = Array.isArray(params.barSlug)
    ? params.barSlug[0]
    : params.barSlug;
  const barName = barId?.toString().replace(/-/g, " ");
  const { updateMultipleParam, getAParamValue } = useManageSearchParams<
    Exclude<TGetAllInventoryItemArgs, void | undefined> & TTabState
  >();
  const tab: TTabValue = getAParamValue("tab") || "alcohol";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateMultipleParam({
        tab: value === "alcohol" ? undefined : value,
        soldBy: undefined,
      }),
    [updateMultipleParam],
  );

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="flex-1">
        <TabCard tabs={tabs} value={tab} setTab={setTab} />
      </div>
      <div className="flex flex-none flex-col gap-3 md:flex-row md:items-center">
        {tab === "alcohol" && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-default-700">
              Sold by
            </span>
            <SoldByDropDown />
          </div>
        )}

        <SearchComponent
          searchIcon={<SearchIcon className="size-5 text-default-600" />}
        />

        <div className="flex items-center gap-3">
          <Filters />

          <TransferButton
            barSlug={barSlug}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}

export default PageTools;
