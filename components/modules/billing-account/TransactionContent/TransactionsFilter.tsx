"use client";
import { useCallback, useState, useEffect, useMemo } from "react";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams, {
  type TUseManageSearchParamsReturnType,
} from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import {
  ETransactionStatus,
  type TGetAllTransactionsArgs,
} from "@/store/api/transactions/transactions.types";
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

type TPaymentStatus =
  | Exclude<TGetAllTransactionsArgs, void>["paymentStatus"]
  | undefined;

type TOptions<T> = {
  label: string;
  value: T;
  radioProps: ICustomRadioLabelProps;
}[];

const paymentStatusOptions: TOptions<TPaymentStatus> = [
  {
    label: "Pending",
    value: ETransactionStatus.PENDING,
    radioProps,
  },
  {
    label: "Completed",
    value: ETransactionStatus.COMPLETED,
    radioProps,
  },
  {
    label: "Failed",
    value: ETransactionStatus.FAILED,
    radioProps,
  },
];

type THandleSubmit = (props: {
  closeFilter: (props: Partial<TExternalState> | void) => () => void;
  paymentStatusState: TPaymentStatus | undefined;
  updateMultipleParam: TUseManageSearchParamsReturnType<
    Exclude<TGetAllTransactionsArgs, void>
  >["updateMultipleParam"];
}) => React.FormEventHandler<HTMLFormElement>;

function TransactionsFilter() {
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllTransactionsArgs, void>>();
  const { paymentStatus } = getAllParamValue();

  const [paymentStatusState, setPaymentStatusState] =
    useState<TPaymentStatus>(paymentStatus);

  useEffect(() => {
    setPaymentStatusState(paymentStatus);
  }, [paymentStatus]);

  const isValuesExist = useMemo(
    () => paymentStatus !== undefined,
    [paymentStatus],
  );

  const isValueChanged = useMemo(
    () => paymentStatus !== paymentStatusState,
    [paymentStatus, paymentStatusState],
  );

  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();

  const resetAllFilters = useCallback(() => {
    setPaymentStatusState(undefined);
    updateMultipleParam({
      paymentStatus: undefined,
      page: undefined,
    });
    closeFilter()();
  }, [updateMultipleParam, closeFilter]);

  const handleSubmit: THandleSubmit = useCallback(
    ({ closeFilter, updateMultipleParam, paymentStatusState }) =>
      (e) => {
        e.preventDefault();
        updateMultipleParam({
          page: undefined,
          paymentStatus: paymentStatusState,
        });
        closeFilter()();
      },
    [],
  );

  const handlePaymentStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setPaymentStatusState(e.target.value as TPaymentStatus);
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
          paymentStatusState,
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
          options={paymentStatusOptions}
          onChange={handlePaymentStatusChange}
          value={paymentStatusState}
          key={`paymentStatus-${paymentStatus}`}
        />

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth onClick={closeFilter()} type="button">
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            type="submit"
            disabled={!paymentStatusState}
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

export default TransactionsFilter;
