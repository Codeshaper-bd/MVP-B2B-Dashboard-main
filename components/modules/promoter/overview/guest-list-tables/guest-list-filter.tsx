"use client";
import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useBooleanState from "@/hooks/useBooleanState";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import { convertLocalToUTC, convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TGetPromotersAdminTicketSoldListArgs } from "@/store/api/promoters/promoters.types";
import DateRangePickerDropDown from "@/components/modules/event/page-tools/Modal/DateRangePickerDropDown";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sortDateOptions = [{ value: "customRange", label: "Select Date Range" }];

interface GuestListFilterProps {
  onClose?: () => void;
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPromotersAdminTicketSoldListArgs, void>
  >;
}

type GuestListFilterForm = Partial<TGetPromotersAdminTicketSoldListArgs>;

export default function GuestListFilter({
  onClose,
  manageStateParams,
}: GuestListFilterProps) {
  const { getAllParamValue, updateMultipleParam, deleteAParam } =
    manageStateParams;
  const {
    hasAddons,
    hasDiscount,
    ticketTierId,
    revenueAmount,
    endDate,
    startDate,
  } = getAllParamValue();

  const {
    state: isCalendarOpen,
    setOpen: openCalendar,
    setClose: closeCalendar,
  } = useBooleanState();

  const { getAnEventData } = useFetchAnEventData();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { isDirty },
    reset,
  } = useForm<GuestListFilterForm>({
    defaultValues: {
      ticketTierId: ticketTierId ?? undefined,
      hasAddons: hasAddons ?? undefined,
      hasDiscount: hasDiscount ?? undefined,
      revenueAmount: revenueAmount ?? undefined,
      startDate: startDate ?? undefined,
      endDate: endDate ?? undefined,
    },
  });

  const startDateState = watch("startDate");
  const endDateState = watch("endDate");

  const options = useMemo(
    () =>
      getAnEventData?.ticketTiers?.map((tier) => ({
        value: String(tier.id),
        label: tier.name,
      })) ?? [],
    [getAnEventData],
  );

  const hasAppliedParams = !!(
    ticketTierId ||
    hasAddons ||
    hasDiscount ||
    revenueAmount ||
    startDate ||
    endDate
  );

  const onApply = (data: GuestListFilterForm) => {
    const updates: Partial<TGetPromotersAdminTicketSoldListArgs> = {
      ...data,
      page: undefined,
    };

    updateMultipleParam(updates);
    reset(data);
    onClose?.();
  };

  const onClear = () => {
    reset(
      {
        ticketTierId: undefined,
        hasAddons: undefined,
        hasDiscount: undefined,
        revenueAmount: undefined,
        startDate: undefined,
        endDate: undefined,
      },
      { keepDirty: false },
    );

    deleteAParam("ticketTierId");
    deleteAParam("hasAddons");
    deleteAParam("hasDiscount");
    deleteAParam("revenueAmount");
    deleteAParam("startDate");
    deleteAParam("endDate");
    deleteAParam("page");

    closeCalendar();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onApply)}>
      <div className="space-y-5">
        <Controller
          name="ticketTierId"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Ticket Tier"
              options={options}
              value={
                options.find((o) => o.value === String(field.value ?? "")) ??
                null
              }
              onChange={(val) => field.onChange(val?.value ?? null)}
              placeholder="Select Ticket Tier"
            />
          )}
        />

        <Controller
          name="hasAddons"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Add-Ons Purchased"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={
                field.value ? { value: field.value, label: field.value } : null
              }
              onChange={(val) => field.onChange(val?.value)}
              placeholder="No Selection/Yes/No"
            />
          )}
        />

        <Controller
          name="hasDiscount"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Discount Applied"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={
                field.value ? { value: field.value, label: field.value } : null
              }
              onChange={(val) => field.onChange(val?.value)}
              placeholder="No Selection/Yes/No"
            />
          )}
        />

        <div>
          <label className="mb-1 block text-sm font-medium">Revenue</label>
          <Input placeholder="Enter revenue" {...register("revenueAmount")} />
        </div>
        <div className="relative">
          <SelectInput
            label="Sort Date"
            placeholder="Select Date Range"
            options={sortDateOptions}
            onChange={(value) => {
              if (value?.value === "customRange") {
                openCalendar()();
              } else {
                closeCalendar()();
              }
            }}
            value={
              startDateState && endDateState
                ? {
                    value: "customRange",
                    label: `${convertUTCToLocal({ utcDateTime: startDateState, format: "DD/MM/YY" })} - ${convertUTCToLocal({ utcDateTime: endDateState, format: "DD/MM/YY" })}`,
                  }
                : null
            }
          />

          {isCalendarOpen && (
            <DateRangePickerDropDown
              selectedDate={
                startDateState && endDateState
                  ? {
                      from: new Date(startDateState),
                      to: new Date(endDateState),
                    }
                  : undefined
              }
              onApply={(value) => {
                setValue(
                  "startDate",
                  convertLocalToUTC({
                    localDateTime: value?.from,
                    type: "endOfDay",
                  }) ?? undefined,
                  {
                    shouldDirty: true,
                  },
                );
                setValue(
                  "endDate",
                  convertLocalToUTC({
                    localDateTime: value?.to,
                    type: "endOfDay",
                  }) ?? undefined,
                  {
                    shouldDirty: true,
                  },
                );
                closeCalendar()();
              }}
              onCancel={closeCalendar()}
            />
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button type="button" fullWidth onClick={onClose}>
          Cancel
        </Button>

        {!isDirty && hasAppliedParams ? (
          <Button type="button" fullWidth color="primary" onClick={onClear}>
            Clear
          </Button>
        ) : (
          <Button type="submit" fullWidth color="primary" disabled={!isDirty}>
            Apply
          </Button>
        )}
      </div>
    </form>
  );
}
