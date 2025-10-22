"use client";
import dayjs from "dayjs";
import { memo } from "react";

import {
  disableDatesOutsideRange,
  disablePastDates,
} from "@/lib/date-time/disabled-dates";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import DatePickerField from "@/components/date-time/DatePickerField";
import FileUploader from "@/components/form/file-uploader2";
import FileUploaderLabel from "@/components/form/file-uploader2/file-uploader-label";
import AiMagicIcon from "@/components/icons/AiMagicIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import AddOrEditVenueDialog from "@/components/modules/venue/modals/AddOrEditVenueDialog";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/TimePicker";

import TaxComponents from "./TaxComponents";
import type { TEventDetailsInputs } from "./types";
import useManageEventForm from "./useManageEventForm";
import { recurringOptions } from "./values";

export interface IStepOneProps {
  isMediaLoading: boolean;
}

function StepOne({ isMediaLoading }: IStepOneProps) {
  const {
    formContextProps,
    isGratuity,
    hideGuestlist,
    isRecurring,
    recurringFor,
    isCrowdMeterEnabled,
    // date time related fields
    startTimeDateField,
    startTimeTimeField,
    endTimeDateField,
    endTimeTimeField,
    checkInEndDateField,
    checkInEndTimeField,
    // date time related fields
    media,
    venueId,
    venueOptions,
    eventSlug,
    getAllVenueApiState,
  } = useManageEventForm();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = formContextProps;

  return (
    <div>
      <Card className="p-6 shadow-none">
        <CardContent className="p-0">
          <div className="w-full">
            <h3 className="mb-1 text-lg font-semibold text-default-900">
              Event Details
            </h3>

            <p className="text-sm text-default-600">
              Fill in the essential information about your event.
            </p>

            <p className="mt-6 flex gap-2 text-base text-primary">
              <InfoIcon className="h-5 w-5" /> This information will be
              displayed to customers.
            </p>

            <div className="mt-6 space-y-6">
              <LabelErrorWrapper
                error={errors?.eventDetails?.isGratuity?.message}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-3">
                    <Switch
                      color="primary"
                      checked={!!isGratuity}
                      onCheckedChange={(checked) =>
                        setValue("eventDetails.isGratuity", checked)
                      }
                      id="eventDetails.isGratuity"
                    />

                    <div className="text-sm">
                      <Label
                        htmlFor="eventDetails.isGratuity"
                        className="font-medium text-default-700"
                      >
                        Auto Gratuity
                      </Label>

                      {isGratuity && (
                        <p className="text-default-600">
                          This is automatically added to the total bill of
                          Drinks at the bar
                        </p>
                      )}
                    </div>
                  </div>

                  {!isGratuity && (
                    <p className="flex gap-2 text-base text-default-700">
                      <InfoIcon className="h-5 w-5" /> This is automatically
                      added to the total bill of Drinks at the bar
                    </p>
                  )}
                </div>
              </LabelErrorWrapper>

              {isGratuity && (
                <div className="group relative w-[224px] space-y-1.5">
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    isPositiveOnly
                    placeholder="Enter tip"
                    className="#pe-10 text-base text-default-900"
                    size="sm"
                    {...register("eventDetails.gratuityValue", {
                      valueAsNumber: true,
                    })}
                    error={errors?.eventDetails?.gratuityValue?.message}
                    rightExtensionContent={
                      <p className="border-l px-3 py-2 text-default-700 group-focus-within:border-l-primary">
                        %
                      </p>
                    }
                  />
                </div>
              )}
              <LabelErrorWrapper
                error={errors?.eventDetails?.hideGuestlist?.message}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-3">
                    <Switch
                      color="primary"
                      checked={!!hideGuestlist}
                      onCheckedChange={(checked) =>
                        setValue("eventDetails.hideGuestlist", checked)
                      }
                      id="eventDetails.hideGuestlist"
                    />

                    <div className="text-sm">
                      <Label
                        htmlFor="eventDetails.hideGuestlist"
                        className="font-medium text-default-700"
                      >
                        Hide Guestlist from Public (B2C)
                      </Label>

                      <p className="text-default-600">
                        Keep your guest list private so only invited attendees
                        and internal staff can view it.
                      </p>
                    </div>
                  </div>
                </div>
              </LabelErrorWrapper>
              <LabelErrorWrapper
                error={errors?.eventDetails?.isCrowdMeterEnabled?.message}
              >
                <div className="flex gap-3">
                  <Switch
                    color="primary"
                    checked={!!isCrowdMeterEnabled}
                    onCheckedChange={(checked) =>
                      setValue("eventDetails.isCrowdMeterEnabled", checked)
                    }
                    id="eventDetails.isCrowdMeterEnabled"
                  />

                  <div className="text-sm">
                    <Label
                      htmlFor="eventDetails.isCrowdMeterEnabled"
                      className="font-medium text-default-700"
                    >
                      Crowd Meter
                    </Label>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <InfoIcon className="size-4 text-default-1000" />

                  <p className="text-default-600">
                    Enabling Crowd Meter shows Customers how busy the line is on
                    the event page.
                  </p>
                </div>
              </LabelErrorWrapper>

              <TaxComponents />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Input
                  type="text"
                  size="md"
                  placeholder="Input Event Name"
                  label="Event Name"
                  required
                  {...register("eventDetails.name")}
                  error={errors?.eventDetails?.name?.message}
                  rightContent={
                    !!errors?.eventDetails?.name?.message && (
                      <InfoIcon className="me-2 h-4 w-4 text-[#F97066]" />
                    )
                  }
                />

                <SelectInput
                  options={venueOptions}
                  label="Venue"
                  placeholder="Select Venue"
                  dropDownBottomContent={
                    <AddOrEditVenueDialog
                      onSuccessAddVenue={(venue) => {
                        setValue("eventDetails.venueId", Number(venue.id));
                      }}
                    />
                  }
                  onChange={(value) =>
                    setValue("eventDetails.venueId", Number(value?.value))
                  }
                  value={
                    typeof venueId === "number" && venueId > 0
                      ? venueId
                      : undefined
                  }
                  isLoading={
                    getAllVenueApiState?.isLoading ||
                    getAllVenueApiState?.isFetching
                  }
                  error={errors.eventDetails?.venueId?.message}
                  required
                />
              </div>
              {/* event time start */}
              <h2 className="text-base font-semibold text-default-900">
                Event Time Details
              </h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-default-700">
                    Doors Open
                  </h3>
                  <p className="text-xs text-[#94969C]">
                    The earliest time the venue opens and the guests can line
                    up.
                  </p>
                </div>
                <DatePickerField
                  selectedLabel={
                    startTimeDateField
                      ? dayjs(startTimeDateField).format("MMMM D, YYYY")
                      : "Select Date"
                  }
                  selected={startTimeDateField ?? undefined}
                  onChange={(date) => {
                    setValue("eventDetails.startTimeDateField", date);
                  }}
                  isDateDisabled={disablePastDates}
                  error={errors?.eventDetails?.startTimeDateField?.message}
                />

                <TimePicker
                  value={startTimeTimeField}
                  onChange={(time) => {
                    setValue("eventDetails.startTimeTimeField", time);
                  }}
                  error={errors?.eventDetails?.startTimeTimeField?.message}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-default-700">
                    End Time
                  </h3>
                  <p className="text-xs text-[#94969C]">
                    The scheduled time when the event will end.
                  </p>
                </div>
                <DatePickerField
                  selectedLabel={
                    endTimeDateField
                      ? dayjs(endTimeDateField).format("MMMM D, YYYY")
                      : "Select Date"
                  }
                  selected={endTimeDateField as Date}
                  onChange={(date) => {
                    setValue("eventDetails.endTimeDateField", date);
                  }}
                  isDateDisabled={disablePastDates}
                  error={errors?.eventDetails?.endTimeDateField?.message}
                />

                <TimePicker
                  value={endTimeTimeField}
                  onChange={(time) => {
                    setValue("eventDetails.endTimeTimeField", time);
                  }}
                  error={errors?.eventDetails?.endTimeTimeField?.message}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-default-700">
                    Check-In End
                  </h3>
                  <p className="text-xs text-[#94969C]">
                    The latest time guests are allowed to check in.
                  </p>
                </div>

                <DatePickerField
                  selectedLabel={
                    checkInEndDateField
                      ? dayjs(checkInEndDateField).format("MMMM D, YYYY")
                      : "Select Date"
                  }
                  selected={checkInEndDateField as Date}
                  onChange={(date) => {
                    setValue("eventDetails.checkInEndDateField", date);
                  }}
                  error={errors?.eventDetails?.checkInEndDateField?.message}
                  isDateDisabled={(date) => {
                    if (!startTimeDateField || !endTimeDateField) {
                      return true;
                    }

                    return disableDatesOutsideRange({
                      date,
                      rangeStart: startTimeDateField,
                      rangeEnd: endTimeDateField,
                    });
                  }}
                />

                <TimePicker
                  value={checkInEndTimeField}
                  onChange={(time) => {
                    setValue("eventDetails.checkInEndTimeField", time);
                  }}
                  error={errors?.eventDetails?.checkInEndTimeField?.message}
                />
              </div>

              <div className="#flex hidden flex-col gap-3 md:flex-row">
                <LabelErrorWrapper
                  error={errors?.eventDetails?.isRecurring?.message}
                >
                  <div className="flex items-center gap-2">
                    <Switch
                      id="eventDetails.isRecurring"
                      color="primary"
                      checked={!!isRecurring}
                      onCheckedChange={(checked) =>
                        setValue("eventDetails.isRecurring", checked)
                      }
                    />

                    <Label
                      htmlFor="eventDetails.isRecurring"
                      className="mb-0 cursor-pointer pb-0 text-sm font-medium"
                    >
                      Recurring
                    </Label>
                  </div>
                </LabelErrorWrapper>

                {isRecurring && (
                  <div>
                    <CustomRadioGroup
                      className="text-sm font-medium text-default-700"
                      options={recurringOptions}
                      onChange={(e) => {
                        setValue(
                          "eventDetails.recurringFor",
                          e.target.value as TEventDetailsInputs["recurringFor"],
                        );
                      }}
                      value={recurringFor}
                      error={errors.eventDetails?.recurringFor?.message}
                    />
                  </div>
                )}
              </div>

              <FileUploader
                files={media}
                setFiles={(newFiles) => {
                  setValue("eventDetails.media", newFiles);
                }}
                isMultiple={false}
                aspectRatio={1280 / 1600}
                cropShape="rect"
                cropWidth={1280}
                cropHeight={1600}
                isLoading={isMediaLoading}
                error={errors?.eventDetails?.media?.message}
                fileUploadLabel={
                  <FileUploaderLabel
                    readonly={false}
                    fileUploadLabelText=" SVG, PNG, JPG or GIF (max. 1280x1600px)"
                  />
                }
              />

              <Textarea
                className="min-h-[98px]"
                id="Description"
                label="Event Description"
                placeholder="Input Description of Event"
                {...register("eventDetails.description")}
                error={errors.eventDetails?.description?.message}
              />

              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0">
                <p className="text-sm">
                  AI will help spark creative ideas for the event description.
                </p>

                <Button
                  className="group w-[180px] px-3.5 py-2.5 text-primary hover:text-primary"
                  color="secondary"
                  type="button"
                >
                  <AiMagicIcon className="me-1 h-4 w-4 text-primary" />
                  <span className="block group-hover:hidden">
                    Write with Magic
                  </span>
                  <span className="hidden group-hover:block">Coming Soon</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(StepOne);
