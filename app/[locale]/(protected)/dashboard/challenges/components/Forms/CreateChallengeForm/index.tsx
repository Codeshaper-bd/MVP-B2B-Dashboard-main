"use client";
import dayjs from "dayjs";
import { forwardRef, useState } from "react";

import { compareDateRanges } from "@/lib/date-time/compare-date-ranges";
import { disablePastDates } from "@/lib/date-time/disabled-dates";
import { cn } from "@/lib/utils";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import CalenderIcon from "@/components/icons/CalenderIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import SelectFoodItemModal from "@/components/modules/product/SelectFoodItemModal";
import RenderData from "@/components/render-data";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import InputCounter from "@/components/ui/InputCounter2";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import type { TModalWorkMode } from "./types";
import useCreateChallengeForm from "./useCreateChallengeForm";
import { handleChallengeSubmit } from "./utils";
import DateRangeModalInfo from "../../Modals/DateRangeModalInfo";

export type TCreateChallengeFormProps = TModalWorkMode & {
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: (data: TChallenge) => void;
};

const CreateChallengeForm = forwardRef<
  HTMLButtonElement,
  TCreateChallengeFormProps
>((props, ref) => {
  const { mode } = props;
  const {
    createChallengeFormProps,
    dateRange,
    typeOfChallengeValue,
    getAChallengeApiState,
    getAChallengeData,
    typeOfChallengeOptions,
    handleOnSubmitAssistProps,
  } = useCreateChallengeForm(props);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,
  } = createChallengeFormProps;
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = () => {
    if (mode === "server-edit") {
      const comparison = compareDateRanges(
        dateRange,
        getAChallengeData?.startDate,
        getAChallengeData?.endDate,
      );

      if (comparison?.isDateRangeChanged) {
        setModalOpen(true);
      } else {
        control?.handleSubmit(
          handleChallengeSubmit(handleOnSubmitAssistProps),
        )();
      }
    } else {
      control?.handleSubmit(handleChallengeSubmit(handleOnSubmitAssistProps))();
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
            handleChallengeSubmit(handleOnSubmitAssistProps),
          )();
        }}
      />
      <div className="space-y-4 px-2">
        <Input
          label="Name"
          required
          type="text"
          size={"md"}
          placeholder="Enter challenge name"
          {...register("name")}
          error={errors.name?.message}
        />

        <div className="w-full flex-1 space-y-1.5">
          <LabelErrorWrapper
            label="Durations"
            required
            error={
              errors.dateRange?.message ||
              errors.dateRange?.from?.message ||
              errors.dateRange?.to?.message
            }
          >
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  color="secondary"
                  fullWidth
                  className="justify-start border-default-200 text-default-700 hover:bg-transparent md:px-3.5"
                  size="lg"
                >
                  <CalenderIcon className="me-2 h-full w-4 shrink-0 text-default-700" />
                  {dateRange?.from ? (
                    <>
                      {dayjs(dateRange.from).format("MMM DD, YYYY")}{" "}
                      {`- ${dateRange.to ? dayjs(dateRange.to).format("MMM DD, YYYY") : "MMM DD, YYYY"}`}
                    </>
                  ) : (
                    <span className="font-normal text-[#85888E]">
                      Select Date Range
                    </span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(date) => {
                    setValue("dateRange", date);
                  }}
                  initialFocus
                  disabled={disablePastDates}
                />
              </PopoverContent>
            </Popover>
          </LabelErrorWrapper>
        </div>

        <div
          className={cn("grid gap-4", {
            "grid-cols-2": !!typeOfChallengeValue,
            "grid-cols-1":
              (props?.mode === "local-create" ||
                props?.mode === "local-edit") &&
              props?.isProductMode,
          })}
        >
          <SelectInput
            label="Type of Challenge"
            required
            placeholder="Select type of challenge"
            options={typeOfChallengeOptions}
            value={watch("typeOfChallenge")}
            onChange={(value) => {
              setValue("typeOfChallenge", value);
            }}
            size={"md"}
            error={
              errors.typeOfChallenge?.label?.message ||
              errors.typeOfChallenge?.value?.message ||
              errors.typeOfChallenge?.message
            }
          />

          {typeOfChallengeValue === "INVITE_FRIENDS" && (
            <NumberInput
              label="Number of Friends"
              required
              size={"md"}
              placeholder="Number"
              value={watch("numberOfFriends")}
              onChange={(value) => {
                setValue("numberOfFriends", Number(value));
              }}
              error={errors.numberOfFriends?.message}
            />
          )}

          {typeOfChallengeValue === "CHECK_IN_BEFORE" && (
            <Input
              label="Select Time"
              className="time-picker"
              required
              type="time"
              size={"md"}
              placeholder="Time"
              leftContent={
                <ClockIcon className="h-full w-[17px] shrink-0 text-default-600" />
              }
              {...register("checkInTime")}
              error={errors.checkInTime?.message}
            />
          )}

          {typeOfChallengeValue === "SPENT" && (
            <NumberInput
              label="Amount(CAD $)"
              required
              size={"md"}
              placeholder="Number"
              value={watch("amountSpent")}
              onChange={(value) => {
                setValue("amountSpent", Number(value));
              }}
              error={errors.amountSpent?.message}
            />
          )}

          {typeOfChallengeValue === "PURCHASE" &&
            (mode === "server-create" || mode === "server-edit") && (
              <LabelErrorWrapper
                label={"Item"}
                required
                error={errors.item?.message || errors.item?.id?.message}
              >
                <SelectFoodItemModal
                  onChange={(_, item) => {
                    setValue("item", item ?? undefined);
                  }}
                  value={watch("item")}
                />
              </LabelErrorWrapper>
            )}
        </div>

        {typeOfChallengeValue === "PURCHASE" && (
          <NumberInput
            label="Quantity"
            required
            size={"md"}
            placeholder="Quantity"
            value={watch("purchaseQuantity")}
            onChange={(value) => {
              setValue("purchaseQuantity", Number(value));
            }}
            error={errors.purchaseQuantity?.message}
          />
        )}
        <NumberInput
          label="Points Earned"
          required
          size={"md"}
          placeholder="Number"
          value={watch("pointesEarned")}
          onChange={(value) => {
            setValue("pointesEarned", Number(value));
            trigger("pointesEarned");
          }}
          error={errors.pointesEarned?.message}
        />
        <InputCounter
          label="Max Redemption per Night"
          value={watch("maxRedemptionPerNight")}
          onChange={(value) => {
            setValue("maxRedemptionPerNight", Number(value));
            trigger("maxRedemptionPerNight");
          }}
          error={errors.maxRedemptionPerNight?.message}
          min={1}
          required
        />

        <Textarea
          label="Description"
          required
          {...register("description")}
          rows={4}
          placeholder="Enter description"
          error={errors?.description?.message}
        />
      </div>

      <button
        type="button"
        hidden
        ref={ref}
        // onClick={control?.handleSubmit(
        //   handleChallengeSubmit(handleOnSubmitAssistProps),
        // )}
        onClick={handleFormSubmit}
      />
    </form>
  );

  if (
    mode === "server-create" ||
    mode === "local-create" ||
    mode === "local-edit"
  ) {
    return formComponent;
  }

  return (
    <RenderData
      data={getAChallengeData}
      {...getAChallengeApiState}
      expectedDataType="object"
      isModal={true}
    >
      {formComponent}
    </RenderData>
  );
});

CreateChallengeForm.displayName = "CreateChallengeForm";

export default CreateChallengeForm;
