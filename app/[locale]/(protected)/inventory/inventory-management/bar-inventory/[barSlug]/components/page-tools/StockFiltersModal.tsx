"use client";

import { memo, useMemo, useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetAllInventoryCategoryQuery } from "@/store/api/inventory-category/inventory-category-api";
import type {
  TGetAllInventoryItemIncludingBarArgs,
  TRangeTemplate,
} from "@/store/api/inventory-item/inventory-item.types";
import SelectInput from "@/components/SelectInput";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";

const stockOptions: IOption<TRangeTemplate>[] = [
  { value: "<100", label: "100 or less" },
  { value: "<200", label: "200 or less" },
  { value: "<500", label: "500 or less" },
  { value: ">1000", label: "1000  or more" },
];

const priceOptions: IOption<TRangeTemplate>[] = [
  { value: "<10", label: "10 or less" },
  { value: "<20", label: "20 or less" },
  { value: "<50", label: "50 or less" },
  { value: "<100", label: "100 or less" },
  { value: ">100", label: "100 or more" },
];

function StockFiltersModal() {
  const {
    data: getAllInventoryCategoriesRes,
    ...getAllInventoryCategoriesApiState
  } = useGetAllInventoryCategoryQuery();
  const getAllInventoryCategoriesData = getAllInventoryCategoriesRes?.data;
  const categoryOptions: IOption[] = useMemo(
    () =>
      getAllInventoryCategoriesData?.map(
        (bar): IOption => ({
          label: bar?.name?.substring(0, 26) ?? "",
          value: bar?.slug,
        }),
      ) ?? [],
    [getAllInventoryCategoriesData],
  );
  const { getAParamValue, updateMultipleParam } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemIncludingBarArgs, void | undefined>
    >();

  const isSomeFilterApplied =
    getAParamValue("stockRange") ||
    getAParamValue("categories") ||
    getAParamValue("priceRange");

  const [stockState, setStockState] = useState<
    IOption<TRangeTemplate> | TNullish
  >(() => {
    const param = getAParamValue("stockRange");
    return stockOptions?.find((option) => option.value === param) ?? null;
  });

  const [categoryState, setCategoryState] = useState<IOption | TNullish>(() => {
    const param = getAParamValue("categories");
    return categoryOptions?.find((option) => option.value === param) ?? null;
  });

  const [priceState, setPriceState] = useState<IOption | TNullish>(() => {
    const param = getAParamValue("priceRange");
    return priceOptions?.find((option) => option.value === param) ?? null;
  });

  const isSomeFilterSelected =
    !!stockState?.value || !!categoryState?.value || !!priceState?.value;

  const isStateAndUrlSame = useMemo(() => {
    const stockMatch = getAParamValue("stockRange") === stockState?.value;
    const categoryMatch = getAParamValue("categories") === categoryState?.value;
    const priceMatch = getAParamValue("priceRange") === priceState?.value;
    return stockMatch && categoryMatch && priceMatch;
  }, [getAParamValue, stockState, categoryState, priceState]);

  const { setClose: setFilterModalClose } = useBooleanContext();

  return (
    <div>
      <div className="space-y-3">
        <SelectInput
          label="Stock"
          htmlFor="stock"
          options={stockOptions}
          placeholder="Select Stock"
          onChange={setStockState}
          value={stockState}
        />

        <SelectInput
          label="Category"
          htmlFor="category"
          options={categoryOptions}
          placeholder="Select Category"
          onChange={setCategoryState}
          value={categoryState}
          isLoading={
            getAllInventoryCategoriesApiState.isLoading ||
            getAllInventoryCategoriesApiState.isFetching
          }
        />

        <SelectInput
          label="Price"
          htmlFor="price"
          options={priceOptions}
          placeholder="Select Price Range"
          onChange={setPriceState}
          value={priceState}
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button fullWidth type="button" onClick={setFilterModalClose}>
          Cancel
        </Button>

        <Button
          fullWidth
          color="primary"
          type="button"
          disabled={!isSomeFilterSelected}
          onClick={() => {
            if (isSomeFilterApplied && isStateAndUrlSame) {
              updateMultipleParam({
                stockRange: undefined,
                categories: undefined,
                priceRange: undefined,
                page: undefined,
              });
              setFilterModalClose();
              return;
            }

            updateMultipleParam({
              stockRange: stockState?.value
                ? (stockState?.value?.toString() as TRangeTemplate)
                : undefined,
              categories: categoryState?.value
                ? categoryState?.value?.toString()
                : undefined,
              priceRange: priceState?.value
                ? (priceState?.value?.toString() as TRangeTemplate)
                : undefined,
              page: undefined,
            });
            setFilterModalClose();
          }}
        >
          {isSomeFilterApplied && isStateAndUrlSame ? "Clear" : "Apply"}
        </Button>
      </div>
    </div>
  );
}

export default memo(StockFiltersModal);
