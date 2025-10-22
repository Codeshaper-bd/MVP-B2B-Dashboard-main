"use client";
import { forwardRef } from "react";
import { useWatch } from "react-hook-form";

import { generateRandomCode } from "@/lib/code-generator/code-generator";
import { disableDatesOutsideRange } from "@/lib/date-time/disabled-dates";
import {
  convertUTCToLocal,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import CalendarIcon from "@/components/icons/CalendarIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import RefreshIcon from "@/components/icons/RefreshIcon";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import InputCounter from "@/components/ui/InputCounter2";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { TCreateOrEditDiscountFormProps } from "./types";
import useDiscountForm from "./useDiscountForm";
import { handleDiscountSubmit, initialDiscountFormValues } from "./utils";

const CreateOrEditDiscountForm = forwardRef<
  HTMLButtonElement,
  TCreateOrEditDiscountFormProps
>((props, ref) => {
  const { mode } = props;
  const {
    formProps: {
      register,
      handleSubmit,
      control,
      formState: { errors },
      watch,
      setValue,
      trigger,
      setError,
      clearErrors,
    },
    onSubmitAssistValues,
    getADiscountData,
    getADiscountApiState,
    redeemedCount,
  } = useDiscountForm(props);

  const discountType = useWatch({
    control,
    name: "discountType",
    defaultValue: initialDiscountFormValues.discountType,
  });

  const eventEndDate = convertUTCToLocalDate({
    utcDateTime: props?.getAnEventData?.details?.endTime,
  });

  const formComponent = (
    <form noValidate>
      <div className="space-y-4">
        <Input
          placeholder="Enter discount name"
          label="Name Discount"
          {...register("name")}
          error={errors?.name?.message}
          required
        />

        <LabelErrorWrapper
          label="Expiry"
          error={errors?.expirationDate?.message}
          required
        >
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                className="justify-start px-4 hover:bg-transparent focus:border-primary md:px-4"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watch("expirationDate") ? (
                  convertUTCToLocal({
                    utcDateTime: watch("expirationDate").toUTCString(),
                    format: "MMM D, YYYY",
                  })
                ) : (
                  <span className="text-default-500">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={watch("expirationDate")}
                onSelect={(date) => {
                  if (date) {
                    setValue("expirationDate", date);
                  }
                }}
                disabled={(date) => {
                  if (!date) {
                    return false;
                  }
                  return disableDatesOutsideRange({
                    date,
                    rangeStart: new Date(),
                    rangeEnd: eventEndDate,
                  });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </LabelErrorWrapper>

        <Input
          label="Discount Code"
          placeholder="Refresh for code"
          type="text"
          required
          rightContent={
            <RefreshIcon
              className="size-5 text-default-600 hover:text-primary"
              onClick={() => {
                const getCode = generateRandomCode({
                  length: 8,
                });
                setValue("code", getCode);
              }}
            />
          }
          rightContentClass="cursor-pointer right-3.5"
          {...register("code")}
          error={errors?.code?.message}
        />

        <Input
          label="Discount Amount"
          placeholder="Enter amount"
          type="number"
          min={1}
          step={1}
          isPositiveOnly
          className="border-r-none"
          {...register("amount", {
            onChange: (e) => {
              const value = Number(e.target.value);
              if (discountType === "PERCENTAGE" && value > 100) {
                e.target.value = 100;
              }
              return e;
            },
          })}
          required
          error={errors?.amount?.message}
          leftContent={
            <span className="inline-block w-4 text-default-500">
              {discountType === "PERCENTAGE" ? "%" : "$"}
            </span>
          }
          rightExtensionContent={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-11 w-[72px] rounded-l-none text-base hover:border-border [&[data-state=open]>svg]:rotate-180"
                >
                  {discountType === "PERCENTAGE" ? "%" : "$"}
                  <ChevronDownIcon className="ms-2 h-4 w-4 transition-all duration-300" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className={cn(
                    discountType === "PERCENTAGE"
                      ? "bg-primary text-primary-foreground"
                      : "",
                  )}
                  onClick={() => {
                    setValue("discountType", "PERCENTAGE");
                    if (watch("amount") > 100) {
                      setValue("amount", 100);
                    }
                  }}
                >
                  % Percent
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(
                    discountType === "FIXED_AMOUNT"
                      ? "bg-primary text-primary-foreground"
                      : "",
                  )}
                  onClick={() => setValue("discountType", "FIXED_AMOUNT")}
                >
                  $ Dollar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        <InputCounter
          label="Max number of redemptions"
          value={watch("maxNumberOfRedemptions")}
          // onChange={(value) => {
          //   if (redeemedCount && Number(value) < redeemedCount) {
          //     setError("maxNumberOfRedemptions", {
          //       message:
          //         "Max number of redemptions cannot be less than redeemed count",
          //     });

          //     setValue("maxNumberOfRedemptions", redeemedCount);
          //   } else {
          //     setValue("maxNumberOfRedemptions", Number(value));
          //     clearErrors("maxNumberOfRedemptions");
          //     trigger("maxNumberOfRedemptions");
          //   }
          // }}
          onChange={(value) => {
            setValue("maxNumberOfRedemptions", Number(value));
          }}
          error={errors?.maxNumberOfRedemptions?.message}
          min={1}
          required
        />
        <InputCounter
          label="Max tickets per redemption"
          value={watch("maxTicketsPerRedemption")}
          // onChange={(value) => {
          //   const maxRedemptions = watch("maxNumberOfRedemptions");
          //   if (maxRedemptions && Number(value) > Number(maxRedemptions)) {
          //     setError("maxTicketsPerRedemption", {
          //       message:
          //         "Max tickets per redemption cannot be greater than max number of redemptions",
          //     });
          //     setValue("maxTicketsPerRedemption", maxRedemptions);
          //   } else {
          //     setValue("maxTicketsPerRedemption", Number(value));
          //     clearErrors("maxTicketsPerRedemption");
          //     trigger("maxTicketsPerRedemption");
          //   }
          // }}
          onChange={(value) => {
            setValue("maxTicketsPerRedemption", Number(value));
          }}
          error={errors?.maxTicketsPerRedemption?.message}
          min={1}
          required
        />
      </div>

      <button
        type="button"
        hidden
        ref={ref}
        onClick={control.handleSubmit(
          handleDiscountSubmit(onSubmitAssistValues),
        )}
        disabled={!!errors?.maxNumberOfRedemptions?.message}
      />
    </form>
  );

  if (
    mode === "local-create" ||
    mode === "local-edit" ||
    mode === "server-create"
  ) {
    return formComponent;
  }

  return (
    <RenderData
      data={getADiscountData}
      expectedDataType="object"
      {...getADiscountApiState}
    >
      {formComponent}
    </RenderData>
  );
});

CreateOrEditDiscountForm.displayName = "CreateOrEditDiscountForm";
export default CreateOrEditDiscountForm;
