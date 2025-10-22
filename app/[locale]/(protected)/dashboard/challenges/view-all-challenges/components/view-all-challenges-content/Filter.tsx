"use client";
import { useCallback, useState, useEffect, useMemo } from "react";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams, {
  type TUseManageSearchParamsReturnType,
} from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import type { TGetAllChallengeArgs } from "@/store/api/challenges/challenges.types";
import type { TSortOrder } from "@/store/api/common-api-types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import FilterContent from "@/components/filter-content";
import { Button } from "@/components/ui/button";

const radioProps: ICustomRadioLabelProps = {
  textSize: "16px",
  centerColor: "transparent",
  ringSize: "5px",
  mode: "label-right",
};

type TStatus = Exclude<TGetAllChallengeArgs, void>["status"] | undefined;
type TSortBy = Exclude<TGetAllChallengeArgs, void>["sortBy"] | undefined;

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

type THandleSubmit = (props: {
  closeFilter: (props: Partial<TExternalState> | void) => () => void;
  statusState: TStatus | undefined;
  sortByState: TSortBy | undefined;
  sortOrderState: TSortOrder | undefined;
  updateMultipleParam: TUseManageSearchParamsReturnType<
    Exclude<TGetAllChallengeArgs, void>
  >["updateMultipleParam"];
}) => React.FormEventHandler<HTMLFormElement>;

function Filter() {
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllChallengeArgs, void>>();
  const { status, sortBy, sortOrder } = getAllParamValue();

  const [statusState, setStatusState] = useState<TStatus>(status);
  const [sortByState, setSortByState] = useState<TSortBy | undefined>(sortBy);
  const [sortOrderState, setSortOrderState] = useState<TSortOrder | undefined>(
    sortOrder,
  );

  useEffect(() => {
    setStatusState(status);
    setSortByState(sortBy);
    setSortOrderState(sortOrder);
  }, [status, sortBy, sortOrder]);

  const isValuesExist = useMemo(
    () =>
      status !== undefined || sortBy !== undefined || sortOrder !== undefined,
    [status, sortBy, sortOrder],
  );

  const isValueChanged = useMemo(
    () =>
      status !== statusState ||
      sortBy !== sortByState ||
      sortOrder !== sortOrderState,
    [status, statusState, sortBy, sortByState, sortOrder, sortOrderState],
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
    updateMultipleParam({
      status: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: undefined,
    });
    closeFilter()();
  }, [updateMultipleParam, closeFilter]);

  const handleSubmit: THandleSubmit = useCallback(
    ({
      closeFilter,
      updateMultipleParam,
      statusState,
      sortByState,
      sortOrderState,
    }) =>
      (e) => {
        e.preventDefault();
        updateMultipleParam({
          page: undefined,
          status: statusState,
          sortBy: sortByState,
          sortOrder: sortOrderState,
        });
        closeFilter()();
      },
    [],
  );

  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setStatusState(e.target.value as TStatus);
    }, []);

  const handleSortOrderChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setSortOrderState(e.target.value as TSortOrder | undefined);
      setSortByState("pointsEarned");
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
      triggerButtonClassName="h-11"
    >
      <form
        onSubmit={handleSubmit({
          closeFilter,
          updateMultipleParam,
          statusState,
          sortByState,
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

        <CustomRadioGroup
          direction="column"
          gap="gap-3"
          label={"Sort by"}
          className="pl-2.5"
          labelClassName="text-sm mb-[18px] font-medium sm:text-sm text-default-700"
          options={sortOrderOptions}
          onChange={handleSortOrderChange}
          value={sortOrderState}
          key={`sort-${sortOrder}`}
        />

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth onClick={closeFilter()} type="button">
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            type="submit"
            disabled={!sortByState && !statusState}
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
