"use client";
import { useCallback, useState, useEffect, useMemo } from "react";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams, {
  type TUseManageSearchParamsReturnType,
} from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import type { TGetAnEventPayoutArgs } from "@/store/api/events/events.types";
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

type TPayoutStatus =
  | Exclude<TGetAnEventPayoutArgs, void>["payoutStatus"]
  | undefined;

type TOptions<T> = {
  label: string;
  value: T;
  radioProps: ICustomRadioLabelProps;
}[];

const payoutStatusOptions: TOptions<TPayoutStatus> = [
  {
    label: "Pending",
    value: "PENDING",
    radioProps,
  },
  {
    label: "Completed",
    value: "COMPLETED",
    radioProps,
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
    radioProps,
  },
];

type THandleSubmit = (props: {
  closeFilter: (props: Partial<TExternalState> | void) => () => void;
  payoutStatusState: TPayoutStatus | undefined;
  updateMultipleParam: TUseManageSearchParamsReturnType<
    Exclude<TGetAnEventPayoutArgs, void>
  >["updateMultipleParam"];
}) => React.FormEventHandler<HTMLFormElement>;

function PayoutFilter() {
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAnEventPayoutArgs, void>>();
  const { payoutStatus } = getAllParamValue();

  const [payoutStatusState, seTPayoutStatusState] =
    useState<TPayoutStatus>(payoutStatus);

  useEffect(() => {
    seTPayoutStatusState(payoutStatus);
  }, [payoutStatus]);

  const isValuesExist = useMemo(
    () => payoutStatus !== undefined,
    [payoutStatus],
  );

  const isValueChanged = useMemo(
    () => payoutStatus !== payoutStatusState,
    [payoutStatus, payoutStatusState],
  );

  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();

  const resetAllFilters = useCallback(() => {
    seTPayoutStatusState(undefined);
    updateMultipleParam({
      payoutStatus: undefined,
      page: undefined,
    });
    closeFilter()();
  }, [updateMultipleParam, closeFilter]);

  const handleSubmit: THandleSubmit = useCallback(
    ({ closeFilter, updateMultipleParam, payoutStatusState }) =>
      (e) => {
        e.preventDefault();
        updateMultipleParam({
          page: undefined,
          payoutStatus: payoutStatusState,
        });
        closeFilter()();
      },
    [],
  );

  const handlePayoutStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      seTPayoutStatusState(e.target.value as TPayoutStatus);
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
          payoutStatusState,
        })}
        className="space-y-8"
        noValidate
      >
        <CustomRadioGroup
          direction="column"
          gap="gap-3"
          label={"Payment Status"}
          className="pl-2.5"
          labelClassName="text-sm mb-[18px] font-medium sm:text-sm text-default-700"
          options={payoutStatusOptions}
          onChange={handlePayoutStatusChange}
          value={payoutStatusState}
          key={`payoutStatus-${payoutStatus}`}
        />

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth onClick={closeFilter()} type="button">
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            type="submit"
            disabled={!payoutStatusState}
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

export default PayoutFilter;
