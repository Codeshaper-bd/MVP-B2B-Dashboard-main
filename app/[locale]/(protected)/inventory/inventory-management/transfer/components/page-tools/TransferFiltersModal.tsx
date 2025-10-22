"use client";

import { memo, useEffect, useMemo, useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllInventoryCategoryQuery } from "@/store/api/inventory-category/inventory-category-api";
import type { TGetAllInventoryItemArgs } from "@/store/api/inventory-item/inventory-item.types";
import SelectInput from "@/components/SelectInput";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";

// Define custom type for our search params
type TTransferSearchParams = Exclude<
  TGetAllInventoryItemArgs,
  void | undefined
> & {
  categories?: string;
};

type TCategoryOption = IOption<
  Exclude<TGetAllInventoryItemArgs, void | undefined>["categories"]
>;

function TransferFiltersModal() {
  const { getAParamValue, updateMultipleParam } =
    useManageSearchParams<TTransferSearchParams>();

  const {
    data: getAllInventoryCategoryRes,
    ...getAllInventoryCategoryApiState
  } = useGetAllInventoryCategoryQuery();

  const categoryOptions: TCategoryOption[] = useMemo(
    () =>
      getAllInventoryCategoryRes?.data?.map((category) => ({
        label: category?.name,
        value: category?.slug || "-1",
      })) ?? [],
    [getAllInventoryCategoryRes?.data],
  );

  const isSomeFilterApplied = getAParamValue("categories");

  const [categoryState, setCategoryState] = useState<TCategoryOption | null>(
    () => {
      const param = getAParamValue("categories");
      return categoryOptions?.find((option) => option.value === param) ?? null;
    },
  );

  // Update category state when options change
  useEffect(() => {
    const param = getAParamValue("categories");
    const categoryOption = categoryOptions?.find(
      (option) => !!option?.value && !!param && option?.value === param,
    );
    setCategoryState(categoryOption ?? null);
  }, [categoryOptions, getAParamValue]);

  const isSomeFilterSelected = !!categoryState?.value;

  const isStateAndUrlSame = useMemo(() => {
    const categoryMatch = getAParamValue("categories") === categoryState?.value;
    return categoryMatch;
  }, [getAParamValue, categoryState]);

  const { setClose: setFilterModalClose } = useBooleanContext();

  return (
    <div>
      <div className="space-y-3">
        <SelectInput
          label="Category"
          htmlFor="category"
          options={categoryOptions}
          placeholder="Select Category"
          onChange={(value) => {
            setCategoryState(value ?? null);
          }}
          value={categoryState}
          isLoading={
            getAllInventoryCategoryApiState.isLoading ||
            getAllInventoryCategoryApiState.isFetching
          }
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
                categories: undefined,
                page: undefined,
              });
              setFilterModalClose();
              return;
            }

            updateMultipleParam({
              categories: categoryState?.value
                ? categoryState?.value?.toString()
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

export default memo(TransferFiltersModal);
