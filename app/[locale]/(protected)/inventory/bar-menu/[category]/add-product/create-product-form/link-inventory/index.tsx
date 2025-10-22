"use client";
import { memo, useEffect, useMemo, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { contentPerPageOptions } from "@/config/client-config";
import useClickOutside from "@/hooks/use-click-outside";
import useBooleanState from "@/hooks/useBooleanState";
import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetAllGroupTypeInventoryItemQuery } from "@/store/api/inventory-item/inventory-item-api";
import type {
  TGetAllInventoryItemArgs,
  TInventoryItemType,
} from "@/store/api/inventory-item/inventory-item.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";
import SearchComponent from "@/components/ui/search-component";

import type { TBarMenuItemFormType } from "../types";
import SelectItem from "./select-item";
import SelectedItem from "./selected-item";
import { handleToggleSelect } from "./utils";

interface ILinkToInventoryProps {
  type?: TInventoryItemType;
}

function LinkToInventory({ type }: ILinkToInventoryProps) {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const { control, trigger, watch } = useFormContext<TBarMenuItemFormType>();
  const { getAllParamValue, updateMultipleParam, updateAParam } =
    useManageStateParams<Exclude<TGetAllInventoryItemArgs, void | undefined>>();
  const { search, page } = getAllParamValue();

  const {
    state: isSelectOpen,
    setOpen: setSelectOpen,
    setClose: setSelectClose,
  } = useBooleanState();

  useClickOutside({
    ref: selectRef,
    callback: setSelectClose({
      beforeExecute: () =>
        updateMultipleParam({ search: undefined, page: undefined }),
    }),
  });

  const {
    fields: ingredientsInFormState,
    append: appendIngredient,
    remove: removeIngredient,
    update: updateIngredient,
    replace: replaceIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const selectedData = useMemo(() => {
    const set = new Set<number>();
    for (const item of ingredientsInFormState ?? []) {
      if (item?._id !== undefined && item?._id !== null && item._id > 0) {
        set.add(item._id);
      }
    }
    return set;
  }, [ingredientsInFormState]);

  const {
    data: getAllGroupTypeInventoryItemRes,
    ...getAllGroupTypeInventoryItemApiState
  } = useGetAllGroupTypeInventoryItemQuery({
    search: search || undefined,
    groupType: "single",
    type,
    pageSize: contentPerPageOptions[10],
    page: page || contentPerPageOptions.initialPage,
  });
  const getAllGroupTypeInventoryItemData =
    getAllGroupTypeInventoryItemRes?.data;
  const getAllGroupTypeInventoryItemPagination =
    getAllGroupTypeInventoryItemRes?.pagination;

  /* Clean search keyword when user changes product type start */
  useEffect(() => {
    updateMultipleParam({
      search: undefined,
    });
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  /* Clean search keyword when user changes product type end */

  // Watch ingredients and product type to trigger validation
  const productType = watch("type");
  const ingredients = watch("ingredients");

  // Trigger validation when ingredients change
  useEffect(() => {
    if (productType === "ALCOHOLIC") {
      // Only trigger the specific alcoholic ingredient validation
      trigger("alcoholicIngredientCheck");
    }
  }, [ingredients, productType, trigger]);

  return (
    <Card className="rounded-lg">
      <CardContent className="relative p-0">
        <div ref={selectRef} onClick={setSelectOpen()}>
          <div className="p-1">
            <SearchComponent<"external">
              mode="external"
              search={search}
              setSearch={(value) => {
                updateMultipleParam({
                  search: value,
                  page: undefined,
                });
              }}
              placeholder="Add Product"
              className="h-9 border-none focus:outline-primary"
            />
          </div>

          {isSelectOpen && (
            <div className="custom-scrollbar absolute -start-3 top-12 z-50 mx-4 my-4 mt-1 max-h-[220px] w-full bg-background">
              <Card className="rounded-md">
                <CardContent className="p-0">
                  <RenderData
                    {...getAllGroupTypeInventoryItemApiState}
                    expectedDataType="array"
                    data={getAllGroupTypeInventoryItemData}
                  >
                    {getAllGroupTypeInventoryItemData?.map((item) => (
                      <SelectItem
                        key={item?.id}
                        item={item}
                        handleToggleSelect={handleToggleSelect({
                          ...item,
                          _id: item.id,
                          ingredientId: item?.id,
                          volume: item?.volume,
                          media: item?.media,
                          usageQuantity:
                            item?.soldBy === "UNIT"
                              ? item?.volume
                              : item?.volume > 0 && item?.volume <= 1
                                ? 1
                                : 0,
                          usageUnit: item?.unit,
                          type: item?.type,
                          ingredientsInFormState,
                          selectedData,
                          replaceIngredient,
                          appendIngredient,
                        })}
                        isSelected={selectedData.has(item?.id)}
                      />
                    ))}
                  </RenderData>

                  <div className="mt-4 overflow-x-auto overflow-y-hidden">
                    <BasicPagination
                      isLoading={
                        getAllGroupTypeInventoryItemApiState.isLoading ||
                        getAllGroupTypeInventoryItemApiState.isFetching
                      }
                      totalPages={
                        getAllGroupTypeInventoryItemPagination?.totalPages
                      }
                      hideForTotalPagesOne
                      disableUrlState
                      onPageChange={(page) =>
                        updateAParam({
                          key: "page",
                          value: page,
                        })
                      }
                      currentPage={Number(page || 1)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {!!ingredientsInFormState?.length && (
          <div className="custom-scrollbar mx-4 my-4 max-h-[220px]">
            <Card className="w-full shrink-0 bg-default-50">
              <CardContent className="w-full shrink-0 p-0">
                {ingredientsInFormState?.map((ingredient, index) => (
                  <SelectedItem
                    key={ingredient?.id}
                    index={index}
                    item={ingredient}
                    remove={(index) => {
                      removeIngredient(index);
                    }}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(LinkToInventory);
