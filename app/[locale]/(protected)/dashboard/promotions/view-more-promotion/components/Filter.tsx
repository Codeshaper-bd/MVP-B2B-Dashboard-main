"use client";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import type { TSortOrder } from "@/store/api/common-api-types";
import type {
  TGetAllPromotionsArgs,
  TPromotionType,
} from "@/store/api/promotion/promotion.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import FilterContent from "@/components/filter-content";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";

const radioProps: ICustomRadioLabelProps = {
  textSize: "16px",
  centerColor: "transparent",
  ringSize: "5px",
  mode: "label-right",
};

type TStatus = Exclude<TGetAllPromotionsArgs, void>["status"] | undefined;
type TSortBy = Exclude<TGetAllPromotionsArgs, void>["sortBy"] | undefined;

type TOptions<T> = {
  label: string;
  value: T;
  radioProps: ICustomRadioLabelProps;
}[];

const statusOptions: TOptions<TStatus> = [
  {
    label: "Active",
    value: "Active",
    radioProps,
  },
  {
    label: "Inactive",
    value: "Inactive",
    radioProps,
  },
];

const sortOrderOptions: TOptions<TSortOrder> = [
  {
    label: "High to low",
    value: "desc",
    radioProps,
  },
  {
    label: "Low to high",
    value: "asc",
    radioProps,
  },
];

type TPromotionTypeOption = {
  label: string;
  value: TPromotionType;
};

const promotionTypeOptions: TPromotionTypeOption[] = [
  {
    label: "Apply Discount",
    value: "APPLY_DISCOUNT",
  },
  {
    label: "Buy One Get One",
    value: "BUY_X_GET_X_FREE",
  },
  {
    label: "Free Drink",
    value: "FREE_DRINK",
  },
];

type THandleSubmit = (props: {
  setStatusState: (value: React.SetStateAction<TStatus>) => void;
  setSortByState: React.Dispatch<React.SetStateAction<TSortBy>>;
  setPromotionTypeOption: React.Dispatch<
    React.SetStateAction<TPromotionTypeOption | undefined>
  >;
  promotionTypeOption: TPromotionTypeOption | undefined;
  closeFilter: (props: Partial<TExternalState> | void) => () => void;
  statusState: TStatus | undefined;
  sortByState: TSortBy | undefined;
  sortOrderState: TSortOrder | undefined;
  updateMultipleParam: (
    paramsToUpdate: Exclude<TGetAllPromotionsArgs, void>,
    options?: void | NavigateOptions | null | undefined,
  ) => void;
}) => React.FormEventHandler<HTMLFormElement>;

function Filter() {
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllPromotionsArgs, void>>();
  const { status, sortBy, sortOrder, type } = getAllParamValue();
  const [statusState, setStatusState] = useState<TStatus>(status);
  const [sortByState, setSortByState] = useState<TSortBy | undefined>(sortBy);
  const [sortOrderState, setSortOrderState] = useState<TSortOrder | undefined>(
    sortOrder,
  );

  const [promotionTypeOption, setPromotionTypeOption] = useState<
    TPromotionTypeOption | undefined
  >(
    type
      ? promotionTypeOptions?.find((option) => option.value === type)
      : undefined,
  );

  useEffect(() => {
    setStatusState(status);
    setSortByState(sortBy);
    setSortOrderState(sortOrder);
    setPromotionTypeOption(
      type
        ? promotionTypeOptions?.find((option) => option.value === type)
        : undefined,
    );
  }, [status, sortBy, sortOrder, type]);

  const isValuesExist =
    status !== undefined ||
    sortBy !== undefined ||
    sortOrder !== undefined ||
    type !== undefined;

  const isValueChanged = useMemo(
    () =>
      status !== statusState ||
      sortBy !== sortByState ||
      type !== promotionTypeOption?.value ||
      sortOrder !== sortOrderState,
    [
      status,
      statusState,
      sortBy,
      sortByState,
      sortOrder,
      sortOrderState,
      type,
      promotionTypeOption,
    ],
  );

  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();

  const resetAllFilters = useCallback(() => {
    setStatusState(undefined);
    setSortByState(undefined);
    setSortOrderState(undefined);
    setPromotionTypeOption(undefined);
    updateMultipleParam({
      status: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      type: undefined,
      page: undefined,
    });
    closeFilter()();
  }, [updateMultipleParam, closeFilter]);

  const handleSubmit: THandleSubmit = useCallback(
    ({
      closeFilter,
      promotionTypeOption,
      sortByState,
      statusState,
      sortOrderState,
      updateMultipleParam,
    }) =>
      (e) => {
        e.preventDefault();
        updateMultipleParam({
          page: undefined,
          status: statusState,
          sortBy: sortByState,
          sortOrder: sortOrderState ? sortOrderState : undefined,
          type: promotionTypeOption?.value,
        });
        closeFilter()();
      },
    [],
  );

  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setStatusState(e.target.value as TStatus);
    }, []);

  return (
    <FilterContent
      open={isFilterOpen}
      onClick={toggleFilterOpen()}
      onClose={closeFilter()}
      targetButtonProps={{
        color: isFilterOpen ? "primary" : "secondary",
        className: cn("h-10", {
          "ring-[4px] ring-opacity-25 ring-primary": isFilterOpen,
        }),
      }}
    >
      <form
        onSubmit={handleSubmit({
          closeFilter,
          setStatusState,
          setSortByState,
          sortByState,
          statusState,
          updateMultipleParam,
          promotionTypeOption,
          setPromotionTypeOption,
          sortOrderState,
        })}
        className="space-y-8"
        noValidate
      >
        <CustomRadioGroup
          direction="column"
          gap="gap-3"
          label={"Status"}
          className="pl-2.5"
          labelClassName="text-sm mb-[18px] font-medium sm:text-sm text-default-700"
          options={statusOptions}
          onChange={handleStatusChange}
          value={statusState}
          key={`status-${status}`}
        />

        <SelectInput
          label="Promotion Type"
          options={promotionTypeOptions}
          onChange={setPromotionTypeOption}
          value={promotionTypeOption}
          placeholder="Select Promotion Type"
          enableOptionRightIcon
          key={`sort-${promotionTypeOptions.values}`}
        />

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth onClick={closeFilter()} type="button">
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            type="submit"
            disabled={!promotionTypeOption?.value && !statusState}
            onClick={(e) => {
              if (isValuesExist && !isValueChanged) {
                e.preventDefault();
                resetAllFilters();
              }
            }}
          >
            <ButtonLoadingContent
              isLoading={false}
              actionContent={
                isValuesExist && !isValueChanged ? "Clear" : "Apply"
              }
            />
          </Button>
        </div>
      </form>
    </FilterContent>
  );
}

export default Filter;
