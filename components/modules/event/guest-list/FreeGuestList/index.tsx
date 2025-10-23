import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

import useIsPastEvent from "@/hooks/feature/useIsPastEvent";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type {
  TEvent,
  TGuestListConditionalType,
} from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DiscountTypeDropdown from "@/components/features/dropdown/discount-type-dropdown";
import GuestlistCapacityLimitTooltip from "@/components/features/tooltip/guestlist-capacity-limit-tooltip";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputHelper from "@/components/ui/input-helper";
import { TooltipComponent } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import type { IGuestListFormData } from "./types";

interface IFreeGuestListProps {
  getAnEventData: TEvent | TNullish;
}
function FreeGuestList({ getAnEventData }: IFreeGuestListProps) {
  const isPastEvent = useIsPastEvent();
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();
  const { toast } = useToast();

  const defaultValues: IGuestListFormData = useMemo(
    () => ({
      isFreeGuestList: !!getAnEventData?.details?.isFreeGuestList,
      guestListLimit: getAnEventData?.details?.guestListLimit ?? 80,
      guestListLimitType:
        getAnEventData?.details?.guestListLimitType ?? "PERCENTAGE",
      perUserGuestListLimitQty:
        getAnEventData?.details?.perUserGuestListLimitQty ?? 2,
    }),
    [getAnEventData],
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<IGuestListFormData>({
    defaultValues,
  });

  const isFreeGuestList = watch("isFreeGuestList");
  const guestListLimit = watch("guestListLimit");
  const guestListLimitType = watch("guestListLimitType");
  const perUserGuestListLimitQty = watch("perUserGuestListLimitQty");

  const venueCapacity = getAnEventData?.venue?.capacity ?? 10000;

  const handleGuestListSave = useCallback(async () => {
    if (!getAnEventData?.details?.slug) {
      return;
    }

    const toastId = toast({
      variant: "loading",
      title: "Saving Guest List Settings",
      description: "Please wait while we save your changes.",
    });

    try {
      await updateAnEvent({
        slug: getAnEventData.details.slug,
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
        title: "Guest List Settings Saved",
        description: "Your guest list settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Failed to save guest list settings", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to Save Guest List Settings",
          description: "Please try again.",
        }),
      });
    }
  }, [
    getAnEventData?.details?.slug,
    guestListLimit,
    guestListLimitType,
    perUserGuestListLimitQty,
    updateAnEvent,
    toast,
  ]);

  const maxRedeemableGuestlists =
    guestListLimitType === "PERCENTAGE"
      ? Math.floor((venueCapacity * (guestListLimit ?? 0)) / 100)
      : (guestListLimit ?? undefined);

  if (!isFreeGuestList) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit(handleGuestListSave)}>
      <Card>
        <CardHeader className="md:pb-0">
          <h3 className="text-lg font-medium">Free Guestlist</h3>
        </CardHeader>
        <CardContent>
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
                {...register("guestListLimit", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const inputValue = Number(e.target.value);
                    const minValue =
                      guestListLimitType !== "PERCENTAGE"
                        ? Number(getAnEventData?.details?.ticketsSoldCount) || 0
                        : 0;
                    const maxValue =
                      guestListLimitType === "PERCENTAGE"
                        ? 100
                        : (getAnEventData?.venue?.capacity ?? 10000);
                    const clampedValue = Math.max(
                      minValue,
                      Math.min(inputValue, maxValue),
                    );
                    setValue("guestListLimit", clampedValue);
                    setValue("perUserGuestListLimitQty", 0);
                  },
                })}
                required
                rightExtensionContent={
                  <DiscountTypeDropdown
                    disabled={isPastEvent}
                    value={guestListLimitType}
                    onChange={(value) => {
                      setValue("guestListLimitType", value);

                      const currentValue = getValues("guestListLimit") ?? 0;
                      const newMax =
                        value === "PERCENTAGE"
                          ? 100
                          : (getAnEventData?.venue?.capacity ?? 10000);

                      if (currentValue > newMax) {
                        setValue("guestListLimit", newMax);
                      } else if (currentValue < 1) {
                        setValue("guestListLimit", 1);
                      }
                    }}
                  />
                }
                error={errors.guestListLimit?.message}
                disabled={isPastEvent}
              />

              <InputHelper
                textOne={`The number of free guest lists available. Default is set to 80%.`}
                textTwo={`Current Venue Capacity: ${venueCapacity}`}
                type="link"
                actionTriggerContent="Configure"
                href="/en/dashboard/user-profile"
                hideActionTrigger
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
                {...register("perUserGuestListLimitQty", {
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

                    setValue("perUserGuestListLimitQty", clampedValue);
                  },
                })}
                required
                error={errors.perUserGuestListLimitQty?.message}
                disabled={isPastEvent}
              />

              <InputHelper
                textOne="The maximum guest list spots a single user can redeem."
                textTwo={`Current Available Guestlist: ${maxRedeemableGuestlists} tickets`}
                hideActionTrigger
              />
            </div>
          </div>
          {!isPastEvent && (
            <div className="flex justify-end">
              <Button type="submit" color="primary">
                <ButtonLoadingContent
                  isLoading={isUpdating}
                  actionContent="Save"
                />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
}

export default FreeGuestList;
