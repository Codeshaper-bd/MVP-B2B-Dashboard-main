"use client";
import dayjs from "dayjs";
import { forwardRef, useState } from "react";
import { Controller } from "react-hook-form";

import { compareDateRanges } from "@/lib/date-time/compare-date-ranges";
import { disablePastDates } from "@/lib/date-time/disabled-dates";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import SelectFoodItemModal from "@/components/modules/product/SelectFoodItemModal";
import RenderData from "@/components/render-data";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import InputCounter from "@/components/ui/input-counter";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import type { ICreatePromotionFormProps } from "./types";
import useCreatePromotionForm from "./useCreatePromotionForm";
import { handlePromotionSubmit, typeOfPromotionOptions } from "./utils";
import DateRangeModalInfo from "../../Modals/DateRangeModalInfo";
const CreatePromotionForm = forwardRef<
  HTMLButtonElement,
  ICreatePromotionFormProps
>((props, ref) => {
  const { setIsSubmitting, isEditMode } = props;
  const {
    createPromotionFormProps,
    promotionDuration,
    typeOfPromotionValue,
    dialogHookProps,
    toastHookProps,
    createAPromotion,
    updateAPromotion,
    getAPromotionData,
    getAPromotionApiState,
    handlePromotionSubmitAssistProps,
  } = useCreatePromotionForm(props);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    watch,
    reset,
    trigger,
  } = createPromotionFormProps;
  const discountType = watch("discountType");
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = () => {
    if (isEditMode) {
      const comparison = compareDateRanges(
        promotionDuration,
        getAPromotionData?.startDate,
        getAPromotionData?.endDate,
      );

      if (comparison?.isDateRangeChanged) {
        setModalOpen(true);
      } else {
        control?.handleSubmit(
          handlePromotionSubmit(handlePromotionSubmitAssistProps),
        )();
      }
    } else {
      control?.handleSubmit(
        handlePromotionSubmit(handlePromotionSubmitAssistProps),
      )();
    }
  };
  const formComponent = (
    <form noValidate>
      <DateRangeModalInfo
        open={modalOpen}
        onOpenChange={setModalOpen}
        handleProceed={() => {
          setModalOpen(false);
          control?.handleSubmit(
            handlePromotionSubmit(handlePromotionSubmitAssistProps),
          )();
        }}
      />
      <div className="mb-7 mt-5 flex gap-2">
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Switch
              color="success"
              size="w-11_h-6"
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <div>
          <p className="text-sm font-medium text-default-700">
            Private Promotion
          </p>
          <p className="text-sm font-normal text-default-600">
            Disable the ability for Customers to view and redeem this promotion
            from the B2C App.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Promotion Name"
          required
          type="text"
          size={"md"}
          placeholder="Enter promotion name"
          {...register("promotionName")}
          error={errors?.promotionName?.message}
        />
        <LabelErrorWrapper
          label={"Promotion Duration"}
          required
          htmlFor="promotionDuration"
          error={
            errors?.promotionDuration?.from?.message ||
            errors?.promotionDuration?.to?.message ||
            errors.promotionDuration?.message
          }
        >
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-1">
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  color="secondary"
                  fullWidth
                  className="justify-start text-default-500 md:px-3"
                >
                  <CalenderIcon className="me-1 h-4 w-4 text-default-500" />
                  {promotionDuration?.from ? (
                    dayjs(promotionDuration?.from).format("MMM D, YYYY")
                  ) : (
                    <span>Start Date</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Controller
                  name="promotionDuration.from"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      mode="single"
                      selected={promotionDuration?.from}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      initialFocus
                      disabled={disablePastDates}
                    />
                  )}
                />
              </PopoverContent>
            </Popover>

            <div className="hidden self-center lg:block">
              <div className="h-0.5 w-4 bg-border"></div>
            </div>

            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  color="secondary"
                  fullWidth
                  className="justify-start text-default-500 md:px-3"
                >
                  <CalenderIcon className="me-1 h-4 w-4 text-default-500" />
                  {promotionDuration?.to ? (
                    convertUTCToLocal({
                      utcDateTime: promotionDuration?.to.toUTCString(),
                      format: "MMM D, YYYY",
                    })
                  ) : (
                    <span>End date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Controller
                  name="promotionDuration.to"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      mode="single"
                      selected={promotionDuration?.to}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      initialFocus
                      disabled={disablePastDates}
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
          </div>
        </LabelErrorWrapper>

        <NumberInput
          label="Points Needed"
          required
          size={"md"}
          placeholder="Number"
          value={watch("pointsNeeded")}
          onChange={(value) => {
            setValue("pointsNeeded", Number(value));
          }}
          error={errors.pointsNeeded?.message}
        />
        <InputCounter
          label="Max Redemption per Night"
          required
          value={watch("maxRedemptionPerNight")}
          onChange={(value) => {
            setValue("maxRedemptionPerNight", Number(value));
            trigger("maxRedemptionPerNight");
          }}
          error={errors.maxRedemptionPerNight?.message}
          min={1}
        />

        <SelectInput
          label="Promotion Type"
          required
          placeholder="Select type of promotion"
          options={typeOfPromotionOptions}
          value={watch("typeOfPromotion")}
          onChange={(value) => {
            setValue("typeOfPromotion", value?.value);
          }}
          size={"md"}
          error={errors?.typeOfPromotion?.message}
        />

        {typeOfPromotionValue === "BUY_X_GET_X_FREE" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <NumberInput
              label="Buy"
              required
              size={"md"}
              placeholder="X"
              value={watch("buy")}
              onChange={(value) => {
                setValue("buy", Number(value));
              }}
              error={errors.buy?.message}
            />
            <NumberInput
              label="Free"
              required
              size={"md"}
              placeholder="Y"
              value={watch("free")}
              onChange={(value) => {
                setValue("free", Number(value));
              }}
              error={errors.free?.message}
            />

            <LabelErrorWrapper
              label={"Product"}
              required
              error={errors?.product?.id?.message || errors.product?.message}
            >
              <SelectFoodItemModal
                onChange={(_, item) => {
                  setValue("product", item ?? undefined);
                }}
                value={watch("product")}
              />
            </LabelErrorWrapper>
          </div>
        )}

        {(typeOfPromotionValue === "FREE_DRINK" ||
          typeOfPromotionValue === "APPLY_DISCOUNT") && (
          <LabelErrorWrapper
            label={"Product"}
            required
            error={errors?.product?.id?.message || errors.product?.message}
          >
            <SelectFoodItemModal
              onChange={(_, item) => {
                setValue("product", item ?? undefined);
              }}
              value={watch("product")}
            />
          </LabelErrorWrapper>
        )}

        {typeOfPromotionValue === "APPLY_DISCOUNT" && (
          <>
            <Input
              label="Discount Amount"
              placeholder="Enter Discount"
              type="number"
              min={1}
              step={1}
              isPositiveOnly
              className="border-r-none"
              {...register("discount", {
                onChange: (e) => {
                  const value = Number(e.target.value);
                  if (discountType === "PERCENTAGE" && value > 100) {
                    e.target.value = 100;
                  }
                  return e;
                },
              })}
              required
              error={errors?.discount?.message}
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
                        if (watch("discount") > 100) {
                          setValue("discount", 100);
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
          </>
        )}

        <div className="space-y-1.5">
          <Textarea
            label="Description"
            required
            id="description"
            {...register("description")}
            rows={4}
            placeholder="Enter description"
            error={errors?.description?.message}
          />
        </div>
      </div>

      <button
        ref={ref}
        hidden
        type="button"
        // onClick={control.handleSubmit(
        //   handlePromotionSubmit(handlePromotionSubmitAssistProps),
        // )}
        onClick={handleFormSubmit}
      />
    </form>
  );

  if (!isEditMode) {
    return formComponent;
  }

  return (
    <RenderData
      data={getAPromotionData}
      {...getAPromotionApiState}
      expectedDataType="object"
      isModal={true}
    >
      {formComponent}
    </RenderData>
  );
});

CreatePromotionForm.displayName = "CreatePromotionForm";

export default CreatePromotionForm;
