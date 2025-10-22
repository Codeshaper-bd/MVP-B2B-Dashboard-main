"use client";

import { memo, useEffect, useMemo, useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllInventoryCategoryQuery } from "@/store/api/inventory-category/inventory-category-api";
import { type TGetAllInventoryItemArgs } from "@/store/api/inventory-item/inventory-item.types";
import SelectInput from "@/components/SelectInput";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";

export type TStockRangeOption = IOption<
  Exclude<TGetAllInventoryItemArgs, void | undefined>["stockRange"]
>;

const stockRangeOptions: TStockRangeOption[] = [
  {
    label: "1 - 100",
    value: "1-100",
  },
  {
    label: "< 200",
    value: "<200",
  },
  {
    label: "< 500",
    value: "<500",
  },
  {
    label: "> 1000",
    value: ">1000",
  },
];

type TPriceRangeOption = IOption<
  Exclude<TGetAllInventoryItemArgs, void | undefined>["priceRange"]
>;

const priceRangeOptions: TPriceRangeOption[] = [
  {
    label: "$0 - $10",
    value: "0-10",
  },
  {
    label: "$11 - $20",
    value: "11-20",
  },
  {
    label: "$21 - $50",
    value: "21-50",
  },
  {
    label: "$51 - $100",
    value: "51-100",
  },
  {
    label: "> $100",
    value: ">100",
  },
];

type TCategoryOption = IOption<
  Exclude<TGetAllInventoryItemArgs, void | undefined>["categories"]
>;

const compareURLAndStateValues = ({
  stockRangeState,
  priceRangeState,
  categoryState,
  stockRange,
  priceRange,
  category,
}: {
  stockRangeState: TStockRangeOption | null;
  priceRangeState: TPriceRangeOption | null;
  categoryState: TCategoryOption | null;
  stockRange:
    | Exclude<TGetAllInventoryItemArgs, void | undefined>["stockRange"]
    | undefined;
  priceRange:
    | Exclude<TGetAllInventoryItemArgs, void | undefined>["priceRange"]
    | undefined;
  category:
    | Exclude<TGetAllInventoryItemArgs, void | undefined>["categories"]
    | undefined;
}): boolean => {
  const isStockRangeMatched =
    stockRangeState?.value === stockRange ||
    (!stockRangeState?.value && !stockRange);
  const isPriceRangeMatched =
    priceRangeState?.value === priceRange ||
    (!priceRangeState?.value && !priceRange);
  const isCategoryMatched =
    categoryState?.value === category || (!categoryState?.value && !category);

  return isStockRangeMatched && isPriceRangeMatched && isCategoryMatched;
};

function CustomerLookupFilterContent() {
  const { setClose: closeFilter } = useBooleanContext();
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

  const { getAParamValue, getAllParamValue, updateMultipleParam } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemArgs, void | undefined>
    >();
  const { stockRange, priceRange, categories } = getAllParamValue();

  const [stockRangeState, setStockRangeState] =
    useState<TStockRangeOption | null>(() => {
      const genderOption = stockRangeOptions.find(
        (option) => option?.value === stockRange,
      );
      return genderOption ?? null;
    });
  const [categoryState, setCategoryState] = useState<TCategoryOption | null>(
    () => {
      const categoryOption = categoryOptions?.find(
        (option) =>
          !!option?.value && !!categories && option?.value === categories,
      );
      return categoryOption ?? null;
    },
  );
  useEffect(() => {
    const categoryOption = categoryOptions?.find(
      (option) =>
        !!option?.value && !!categories && option?.value === categories,
    );
    setCategoryState(categoryOption ?? null);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryOptions]);

  const [priceRangeState, setPriceRangeState] =
    useState<TPriceRangeOption | null>(() => {
      const priceRangeOption = priceRangeOptions?.find(
        (option) =>
          !!option?.value && !!priceRange && option?.value === priceRange,
      );
      return priceRangeOption ?? null;
    });

  const isSomeFilterApplied =
    getAParamValue("stockRange") ||
    getAParamValue("priceRange") ||
    getAParamValue("categories");

  const isStateAndUrlSame = useMemo(
    () =>
      compareURLAndStateValues({
        stockRangeState,
        priceRangeState,
        categoryState,

        category: categories,
        priceRange,
        stockRange,
      }),
    [
      stockRangeState,
      priceRangeState,
      categoryState,
      categories,
      priceRange,
      stockRange,
    ],
  );

  const isSomeFilterSelected =
    !!stockRangeState?.value ||
    !!priceRangeState?.value ||
    !!categoryState?.value;

  const onApply = () => {
    updateMultipleParam({
      page: undefined,
      stockRange: stockRangeState?.value
        ? String(stockRangeState?.value)
        : undefined,
      priceRange: priceRangeState?.value
        ? String(priceRangeState?.value)
        : undefined,
      categories: categoryState?.value
        ? String(categoryState?.value)
        : undefined,
    });
    closeFilter();
  };

  const onClear = () => {
    setStockRangeState(null);
    setPriceRangeState(null);
    updateMultipleParam({
      page: undefined,
      stockRange: undefined,
      priceRange: undefined,
      categories: undefined,
    });
  };

  return (
    <div>
      <div className="-mr-6">
        <div className="space-y-4 pr-6">
          <SelectInput
            label="Stock"
            placeholder="Select stock range"
            options={stockRangeOptions}
            value={stockRangeState}
            onChange={(value) => {
              setStockRangeState(value ?? null);
            }}
          />

          <SelectInput
            label="Category"
            placeholder="Select Category"
            options={categoryOptions}
            value={categoryState}
            onChange={(value) => {
              setCategoryState(value ?? null);
            }}
            isLoading={
              getAllInventoryCategoryApiState.isLoading ||
              getAllInventoryCategoryApiState.isFetching
            }
          />

          <SelectInput
            label="Price"
            placeholder="Select price range"
            leftContent="$"
            options={priceRangeOptions}
            value={priceRangeState}
            onChange={(value) => {
              setPriceRangeState(value ?? null);
            }}
          />
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-3 bg-card pt-4">
        <Button fullWidth type="button" onClick={closeFilter} size="lg">
          Cancel
        </Button>

        <Button
          fullWidth
          color="primary"
          type="button"
          size="lg"
          disabled={!isSomeFilterSelected}
          onClick={() => {
            if (isSomeFilterApplied && isStateAndUrlSame) {
              onClear();
              closeFilter();
              return;
            }

            /* apply filters */
            onApply();
          }}
        >
          {isSomeFilterApplied && isStateAndUrlSame ? "Clear" : "Apply"}
        </Button>
      </div>
    </div>
  );
}

export default memo(CustomerLookupFilterContent);
