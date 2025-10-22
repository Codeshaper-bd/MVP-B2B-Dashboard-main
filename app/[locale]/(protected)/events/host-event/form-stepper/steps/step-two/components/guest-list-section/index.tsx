import { memo } from "react";
import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type {
  TGuestListConditionalType,
  TGuestListOn,
} from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DiscountTypeDropdown from "@/components/features/dropdown/discount-type-dropdown";
import GuestlistCapacityLimitTooltip from "@/components/features/tooltip/guestlist-capacity-limit-tooltip";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputHelper from "@/components/ui/input-helper";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Switch } from "@/components/ui/switch";
import { TooltipComponent } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import { ticketingValues } from "../../values";
import ConfigureDialog from "./components/Configure";
import type { IStepFormInputs } from "../../../../type";
import { useEventStepperForm } from "../../../../useEventStepperForm";

function GuestListSection() {
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();
  const { toast } = useToast();

  const {
    formState: { errors },
    control,
    getValues,
    setValue,
    register,
  } = useFormContext<IStepFormInputs>();

  const isFreeGuestList = useWatch({
    control,
    name: "ticketing.isFreeGuestList",
    defaultValue: ticketingValues.isFreeGuestList,
  });

  const guestListLimitType = useWatch({
    control,
    name: "ticketing.guestListLimitType",
  });

  const guestListLimit = useWatch({
    control,
    name: "ticketing.guestListLimit",
  });

  const perUserGuestListLimitQty = useWatch({
    control,
    name: "ticketing.perUserGuestListLimitQty",
  });

  const { eventSlug, getAnEventData } = useEventStepperForm();
  const handleGuestListSave = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Saving",
      description: "Please wait while we save your changes.",
    });

    try {
      await updateAnEvent({
        slug: eventSlug,
        body: {
          isFreeGuestList: true as unknown as TGuestListConditionalType,
          guestListLimit,
          guestListLimitType,
          perUserGuestListLimitQty,
        },
      });
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Saved",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: "Something went wrong while saving your changes.",
      });
    }
  };
  const venueCapacity = getAnEventData?.venue?.capacity ?? 10000;

  const maxRedeemableGuestlists =
    guestListLimitType === "PERCENTAGE"
      ? Math.floor((venueCapacity * (guestListLimit ?? 0)) / 100)
      : (guestListLimit ?? undefined);
  return (
    <div>
      <div className="flex justify-between">
        <h3>Free Guestlist</h3>

        <LabelErrorWrapper error={errors?.ticketing?.isFreeGuestList?.message}>
          <Switch
            color="primary"
            checked={isFreeGuestList}
            onCheckedChange={(checked) => {
              setValue("ticketing.isFreeGuestList", checked);
              setValue(
                "ticketing.guestListLimit",
                (checked ? 80 : undefined) as number,
              );
              setValue(
                "ticketing.guestListLimitType",
                (checked
                  ? "PERCENTAGE"
                  : undefined) as TGuestListOn["guestListLimitType"],
              );
              setValue(
                "ticketing.perUserGuestListLimitQty",
                (checked
                  ? 2
                  : undefined) as TGuestListOn["perUserGuestListLimitQty"],
              );
              setValue(
                "ticketing.ticketTier",
                !checked ? getAnEventData?.ticketTiers : null,
              );
              if (isFreeGuestList) {
                updateAnEvent({
                  slug: eventSlug,
                  body: {
                    isFreeGuestList:
                      false as unknown as TGuestListConditionalType,
                  },
                });
              }
            }}
          />
        </LabelErrorWrapper>
      </div>

      {isFreeGuestList && (
        <>
          <div className="mt-6 grid gap-x-6 gap-y-7 md:grid-cols-2">
            <div>
              <Input
                label={
                  <span className="flex w-fit items-center gap-1.5 text-inherit">
                    Guestlist Capacity Limit
                    <TooltipComponent
                      content={<GuestlistCapacityLimitTooltip />}
                    >
                      <InfoIcon className="size-4 text-default-1000" />
                    </TooltipComponent>
                  </span>
                }
                placeholder="Enter capacity limit"
                type="number"
                step={1}
                inputMode="numeric"
                pattern="[0-9]*"
                isPositiveOnly
                className="border-r-none"
                min={0}
                max={
                  guestListLimitType === "PERCENTAGE"
                    ? 100
                    : (getAnEventData?.venue?.capacity ?? 10000)
                }
                {...register("ticketing.guestListLimit", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const inputValue = Number(e.target.value);
                    const maxValue =
                      guestListLimitType === "PERCENTAGE"
                        ? 100
                        : (getAnEventData?.venue?.capacity ?? 10000);
                    const clampedValue = Math.max(
                      0,
                      Math.min(inputValue, maxValue),
                    );
                    setValue("ticketing.guestListLimit", clampedValue);
                    setValue("ticketing.perUserGuestListLimitQty", 0);
                  },
                })}
                required
                rightExtensionContent={
                  <DiscountTypeDropdown
                    value={guestListLimitType}
                    onChange={(value) => {
                      setValue("ticketing.guestListLimitType", value);

                      const currentValue =
                        getValues("ticketing.guestListLimit") ?? 0;
                      const newMax =
                        value === "PERCENTAGE"
                          ? 100
                          : (getAnEventData?.venue?.capacity ?? 10000);

                      if (currentValue > newMax) {
                        setValue("ticketing.guestListLimit", newMax);
                      } else if (currentValue < 1) {
                        setValue("ticketing.guestListLimit", 1);
                      }
                    }}
                  />
                }
                error={
                  (
                    errors?.ticketing as
                      | Merge<
                          FieldError,
                          FieldErrorsImpl<NonNullable<TGuestListOn>>
                        >
                      | undefined
                  )?.guestListLimit?.message
                }
              />

              <InputHelper
                textOne={`The number of free guest lists available. Default is set to 80%.`}
                textTwo={`Current Venue Capacity: ${getAnEventData?.venue?.capacity}`}
                type="link"
                actionTriggerContent="Configure"
                href="/en/dashboard/user-profile"
                hideActionTrigger
              />
              <ConfigureDialog
                eventSlug={eventSlug}
                getAnEventData={getAnEventData}
              />
            </div>

            <div>
              <Input
                label="Redeemable Guestlists per User"
                placeholder="Enter quantity"
                type="number"
                min={0}
                step={1}
                isPositiveOnly
                className="border-r-none"
                max={maxRedeemableGuestlists}
                {...register("ticketing.perUserGuestListLimitQty", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const inputValue = Number(e.target.value);
                    const maxAllowed =
                      guestListLimitType === "PERCENTAGE"
                        ? Math.floor(
                            (venueCapacity * (guestListLimit ?? 0)) / 100,
                          )
                        : (guestListLimit ?? 0);

                    const clampedValue = Math.max(
                      0,
                      Math.min(inputValue, maxAllowed),
                    );

                    setValue(
                      "ticketing.perUserGuestListLimitQty",
                      clampedValue,
                    );
                  },
                })}
                required
                error={
                  (
                    errors?.ticketing as
                      | Merge<
                          FieldError,
                          FieldErrorsImpl<NonNullable<TGuestListOn>>
                        >
                      | undefined
                  )?.perUserGuestListLimitQty?.message
                }
              />
              {/* Reword this to “Current Available Guestlist: 270 tickets”, don’t need the 2 tickets per user at the start */}
              <InputHelper
                textOne="The maximum guest list spots a single user can redeem."
                // textTwo={`Default is set to 2 tickets per user and max is ${maxRedeemableGuestlists} tickets.`}
                textTwo={`Current Available Guestlist: ${maxRedeemableGuestlists} tickets`}
                hideActionTrigger
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button" color="primary" onClick={handleGuestListSave}>
              <ButtonLoadingContent
                isLoading={isUpdating}
                actionContent="Save"
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(GuestListSection);
