"use client";
import { memo } from "react";

import { cn } from "@/lib/utils";
import { type TNullish } from "@/store/api/common-api-types";
import { type TEvent } from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NumberInput from "@/components/ui/NumberInput";

import useManageGroupDiscount from "./useManageGroupDiscount";
import { handleGroupDiscountSubmit } from "./utils";
interface IGroupDiscountFormProps {
  getAnEventData: TEvent | TNullish;
  getAnEventApiState: IApiStateInfo;
  isPastEvent?: boolean;
}
function GroupDiscountForm({
  getAnEventData,
  getAnEventApiState,
  isPastEvent = false,
}: IGroupDiscountFormProps) {
  const {
    formProps: {
      control,
      register,
      setValue,
      watch,
      formState: { errors, isSubmitting },
    },
    handleGroupDiscountSubmitAssistProps,
    discountType,
    getAnEventApiState: getAnEventApiStateFromUseManageGroupDiscount,
    getAGroupDiscountApiState,
    getAGroupDiscountData,
    isEditMode,
  } = useManageGroupDiscount({
    getAnEventData,
    getAnEventApiState,
  });

  const formComponent = (
    <div role="group" className="mt-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NumberInput
          label="Minimum Purchase Quantity"
          value={watch("minQty")}
          onChange={(value) => {
            setValue("minQty", Number(value));
          }}
          error={errors?.minQty?.message}
          required
          disabled={isPastEvent}
        />
        <NumberInput
          label="Maximum Purchase Quantity"
          value={watch("maxQty")}
          onChange={(value) => {
            setValue("maxQty", Number(value));
          }}
          error={errors?.maxQty?.message}
          required
          disabled={isPastEvent}
        />
      </div>

      <NumberInput
        label="Discount Amount"
        placeholder="Enter amount"
        className="border-r-none"
        value={watch("amount")}
        onChange={(value) => {
          setValue("amount", Number(value));
        }}
        required
        error={errors?.amount?.message}
        disabled={isPastEvent}
        rightExtensionContent={
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isPastEvent}>
              <Button
                variant="outline"
                size="sm"
                className="h-11 w-[72px] rounded-l-none text-base hover:border-border [&[data-state=open]>svg]:rotate-180"
                disabled={isPastEvent}
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
                onClick={() => setValue("type", "PERCENTAGE")}
              >
                % Percent
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  discountType === "FIXED_AMOUNT"
                    ? "bg-primary text-primary-foreground"
                    : "",
                )}
                onClick={() => setValue("type", "FIXED_AMOUNT")}
              >
                $ Fixed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <Button
        type="button"
        onClick={control.handleSubmit(
          handleGroupDiscountSubmit(handleGroupDiscountSubmitAssistProps),
        )}
        disabled={isSubmitting || isPastEvent}
      >
        <ButtonLoadingContent
          isLoading={isSubmitting}
          actionContent={`${isEditMode ? "Update" : "Add"} Discount`}
        />
      </Button>
    </div>
  );

  if (!isEditMode) {
    return formComponent;
  }

  return (
    <RenderData
      isLoading={
        getAnEventApiStateFromUseManageGroupDiscount.isLoading ||
        getAGroupDiscountApiState.isLoading
      }
      isError={
        getAnEventApiStateFromUseManageGroupDiscount.isError ||
        getAGroupDiscountApiState.isError
      }
      error={
        getAnEventApiStateFromUseManageGroupDiscount.error ||
        getAGroupDiscountApiState.error
      }
      isFetching={
        getAnEventApiStateFromUseManageGroupDiscount.isFetching ||
        getAGroupDiscountApiState.isFetching
      }
      isSuccess={
        getAnEventApiStateFromUseManageGroupDiscount.isSuccess ||
        getAGroupDiscountApiState.isSuccess
      }
      data={getAGroupDiscountData}
      expectedDataType="object"
    >
      {formComponent}
    </RenderData>
  );
}

export default memo(GroupDiscountForm);
