"use client";

import dayjs from "dayjs";
import { forwardRef, memo } from "react";

import { useEventStepperForm } from "@/app/[locale]/(protected)/events/host-event/form-stepper/useEventStepperForm";
import {
  getReactCalenderMaxTime,
  getReactCalenderMinTime,
} from "@/lib/date-time/react-calender-utils";
import {
  convertLocalToUTC,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import ReactCalender from "@/components/date-time/react-calender";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { DollarIcon as DollarIcon } from "@/components/icons";
import RenderData from "@/components/render-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import { Switch } from "@/components/ui/switch";

import type { ICreateTierFormProps } from "./types";
import useCreateOrEditTier from "./useCreateOrEditTier";

const CreateTierForm = forwardRef<HTMLButtonElement, ICreateTierFormProps>(
  (props, ref) => {
    const {
      formProps: {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
        watch,
      },
      onSubmit,
      getATicketTierApiState,
      getATicketTierData,
      onSubmitAssistProps,
      watchValues: { startDate, endDate, isAutoRelease },
    } = useCreateOrEditTier(props);

    const { isEditMode } = props;

    console.error("Ticket Form error", errors);

    const { getAnEventData } = useEventStepperForm();
    const { details: { endTime } = {} } = getAnEventData || {};

    const formComponent = (
      <form noValidate>
        <div className="space-y-5">
          <Input
            placeholder="Enter tier name"
            label="Tier Name"
            {...register("name")}
            error={errors.name?.message}
            required
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <NumberInput
              id="price"
              leftContent={<DollarIcon className="size-3.5" />}
              placeholder="Enter price"
              label="Price($)"
              value={watch("price")}
              onChange={(value) => {
                setValue("price", Number(value));
                // if (
                //   value !== null &&
                //   value !== undefined &&
                //   typeof value === "number"
                // ) {
                //   const roundedValue = Math.round(value / 0.5) * 0.5;
                //   setValue("price", roundedValue);
                // } else if (value === null) {
                //   setValue("price", 0);
                // } else {
                //   setValue("price", 0);
                // }
              }}
              error={errors.price?.message}
              step={0.5}
              allowDecimal
              // onInput={(e) => {
              //   const target = e.target as HTMLInputElement;
              //   const inputValue = target.value;

              //   // Real-time validation - only allow valid step values
              //   if (inputValue && inputValue !== "") {
              //     const numValue = parseFloat(inputValue);
              //     if (!isNaN(numValue)) {
              //       const remainder = (numValue * 10) % 5; // Check if it's a multiple of 0.5
              //       if (remainder !== 0) {
              //         // Invalid value - round to nearest 0.5
              //         const roundedValue = Math.round(numValue / 0.5) * 0.5;
              //         target.value = roundedValue.toString();
              //         setValue("price", roundedValue);
              //       }
              //     }
              //   }
              // }}
            />
            <NumberInput
              id="maxQty"
              label="Max Quantity"
              value={watch("maxQty")}
              onChange={(value) => {
                setValue("maxQty", Number(value));
              }}
              error={errors.maxQty?.message}
              placeholder="Enter QTY"
            />
          </div>
          <Input
            type="number"
            label="Max Tickets Per Customer"
            placeholder="Enter Max Tickets Per Customer"
            {...register("maxTicketsPerCustomer", {
              valueAsNumber: true,
              onChange: (e) => {
                const inputValue = Number(e.target.value);
                const maxAllowed = 10;

                const clampedValue = Math.max(
                  0,
                  Math.min(inputValue, maxAllowed),
                );

                setValue("maxTicketsPerCustomer", clampedValue);
              },
            })}
            error={errors.maxTicketsPerCustomer?.message}
            required
            max={10}
            isPositiveOnly
            min={1}
            step={1}
          />

          <div className="flex items-center gap-2">
            <Switch
              id="isAutoRelease"
              color="success"
              checked={isAutoRelease}
              onCheckedChange={(checked) => {
                setValue("isAutoRelease", checked);
                if (!checked) {
                  setValue("startDate", undefined);
                  setValue("endDate", undefined);
                }
              }}
            />

            <Label htmlFor="isAutoRelease" className="mb-0">
              Automate Release Tier / Close Tier
            </Label>
          </div>

          {isAutoRelease && (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <LabelErrorWrapper
                label="Start Date"
                error={errors?.startDate?.message}
              >
                <ReactCalender
                  selected={
                    startDate && startDate !== ""
                      ? dayjs(startDate).toDate()
                      : null
                  }
                  onChange={(date: Date) =>
                    setValue(
                      "startDate",
                      convertLocalToUTC({
                        localDateTime: date,
                      }),
                    )
                  }
                  monthsShows={1}
                  showTimeSelect
                  isClearable
                  showIcon
                  placeholderText="Select Start Date"
                  timeInterval={30}
                  dateFormat="d MMMM yyyy HH:mm"
                  icon={<CalenderIcon />}
                  minDate={new Date()}
                  maxDate={convertUTCToLocalDate({
                    utcDateTime: endTime,
                  })}
                  minTime={getReactCalenderMinTime(startDate)}
                  maxTime={getReactCalenderMaxTime(startDate || "", endTime)}
                />
              </LabelErrorWrapper>

              <LabelErrorWrapper
                label="End Date"
                error={errors?.endDate?.message}
              >
                <ReactCalender
                  selected={
                    endDate && endDate !== "" ? dayjs(endDate).toDate() : null
                  }
                  onChange={(date: Date) =>
                    setValue(
                      "endDate",
                      convertLocalToUTC({
                        localDateTime: date,
                      }),
                    )
                  }
                  monthsShows={1}
                  showTimeSelect
                  isClearable
                  showIcon
                  placeholderText="Select End Date"
                  timeInterval={30}
                  dateFormat="d MMMM yyyy HH:mm"
                  icon={<CalenderIcon />}
                  minDate={new Date()}
                  maxDate={convertUTCToLocalDate({
                    utcDateTime: endTime,
                  })}
                  minTime={getReactCalenderMinTime(endDate)}
                  maxTime={getReactCalenderMaxTime(startDate || "", endTime)}
                />
              </LabelErrorWrapper>
            </div>
          )}
        </div>

        <button
          type="button"
          hidden
          ref={ref}
          onClick={control?.handleSubmit(onSubmit(onSubmitAssistProps))}
        />
      </form>
    );

    if (!isEditMode) {
      return formComponent;
    }

    return (
      <RenderData
        data={getATicketTierData}
        {...getATicketTierApiState}
        expectedDataType="object"
        isModal={true}
      >
        {formComponent}
      </RenderData>
    );
  },
);

CreateTierForm.displayName = "CreateTierForm";

export default memo(CreateTierForm);
