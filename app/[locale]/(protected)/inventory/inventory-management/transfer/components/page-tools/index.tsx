"use client";
import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAllInventoryItemArgs } from "@/store/api/inventory-item/inventory-item.types";
import SearchIcon from "@/components/icons/SearchIcon";
import SelectInput from "@/components/SelectInput";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import TabCard, { type TTabOption } from "@/components/tab-card";
import SearchComponent from "@/components/ui/search-component";

import Filters from "./filters";
import { type TTabState, type TTabValue, tabs, soldByOptions } from "./utils";

function PageTools() {
  const { updateAParam, updateMultipleParam, getAllParamValue } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemArgs, void | undefined> & TTabState
    >();

  const { tab = "alcohol", soldBy } = getAllParamValue();

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateMultipleParam({
        tab: value === "alcohol" ? undefined : value,
        soldBy: undefined,
      }),
    [updateMultipleParam],
  );

  const handleSoldByChange = useCallback(
    (option: IOption | undefined) => {
      updateAParam({
        key: "soldBy",
        value: option?.value === "ALL" ? undefined : option?.value,
      });
    },
    [updateAParam],
  );

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Zona izquierda: Tabs */}
      <div className="flex items-center">
        <TabCard
          tabs={tabs}
          value={tab}
          setTab={setTab}
          className="flex-shrink-0"
        />
      </div>

      {/* Zona derecha: SoldBy, Search y Filtro */}
      <div className="flex items-center gap-4">
        {/* Sold By */}
        {tab === "alcohol" && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-default-600">
              Sold By
            </span>
            <div className="w-36">
              <SelectInput
                htmlFor="soldBy"
                options={soldByOptions}
                placeholder="Select Sold By"
                onChange={handleSoldByChange}
                value={soldBy}
              />
            </div>
          </div>
        )}

        <SearchComponent
          searchIcon={<SearchIcon className="size-5 text-default-600" />}
          className="w-56"
        />

        <Filters />
      </div>
    </div>
  );
}

export default PageTools;
