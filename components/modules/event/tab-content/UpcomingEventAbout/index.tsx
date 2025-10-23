import dayjs from "dayjs";

import type { TEventDetailsInputs } from "@/app/[locale]/(protected)/events/host-event/form-stepper/steps/step-one/types";
import { recurringOptions } from "@/app/[locale]/(protected)/events/host-event/form-stepper/steps/step-one/values";
import { disablePastDatesWithCurrentDate } from "@/lib/date-time/disabled-dates";
import BackButton from "@/components/Buttons/back-button";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DatePickerField from "@/components/date-time/DatePickerField";
import FileUploader from "@/components/form/file-uploader2";
import FileUploaderLabel from "@/components/form/file-uploader2/file-uploader-label";
import { InfoIcon as InfoIcon } from "@/components/icons";
import ViewEventTax from "@/components/modules/event/ViewEventTax";
import AddOrEditVenueDialog from "@/components/modules/venue/modals/AddOrEditVenueDialog";
import RenderData from "@/components/render-data";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import useEventAboutForm from "./useEventAboutForm";

export default function UpcomingEventAbout() {
  const {
    formProps: {
      handleSubmit,
      formState: { errors, isSubmitting },
      register,
      setValue,
      watch,
    },
    venueOptions,
    isVenueLoading,
    isMediaLoading,
    watchValues: {
      isGratuity,
      isRecurring,
      venueId,
      recurringFor,
      media,
      // date time related fields start
      startTimeDateField,
      checkInEndDateField,
      endTimeDateField,
      // date time related fields end
      isCrowdMeterEnabled,
    },
    onSubmit,
    getAnEventData,
    getAnEventApiState,
  } = useEventAboutForm();

  const isTaxEnabled = !!watch("isTaxEnabled");

  return (
    <RenderData
      data={getAnEventData}
      expectedDataType="object"
      {...getAnEventApiState}
    >
      <div className="aboutFrom mt-6">
        <form
          noValidate
          className="flex w-full flex-col gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="eventName"
            placeholder="Event Name"
            {...register("name")}
            className="bg-secondary"
            label="Event Name"
            error={errors?.name?.message}
            required
          />

          <SelectInput
            options={venueOptions}
            label="Venue"
            placeholder="Select Venue"
            dropDownBottomContent={
              <AddOrEditVenueDialog
                onSuccessAddVenue={(venue) => {
                  setValue("venueId", Number(venue.id));
                }}
              />
            }
            onChange={(value) => setValue("venueId", Number(value?.value))}
            value={
              typeof venueId === "number" && venueId > 0 ? venueId : undefined
            }
            isLoading={!!isVenueLoading}
            error={errors?.venueId?.message}
            required
          />

          {/* event time start */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DatePickerField
              selectedLabel={dayjs(startTimeDateField).format("MMMM D, YYYY")}
              selected={startTimeDateField as Date}
              onChange={(date) => {
                setValue("startTimeDateField", date);
              }}
              isDateDisabled={disablePastDatesWithCurrentDate}
              error={errors?.startTimeDateField?.message}
              label="Doors Open"
              isTriggerDisabled
            />

            <Input
              {...register("startTimeTimeField")}
              type="time"
              className="time-picker"
              error={errors?.startTimeTimeField?.message}
              required
              label="Time"
              disabled
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DatePickerField
              selectedLabel={dayjs(endTimeDateField).format("MMMM D, YYYY")}
              selected={endTimeDateField as Date}
              onChange={(date) => {
                setValue("endTimeDateField", date);
              }}
              isDateDisabled={disablePastDatesWithCurrentDate}
              error={errors?.endTimeDateField?.message}
              label="Event End"
              required
              isTriggerDisabled
            />
            <Input
              {...register("endTimeTimeField")}
              type="time"
              className="time-picker"
              error={errors?.endTimeTimeField?.message}
              required
              label="Time"
              disabled
            />
          </div>

          <LabelErrorWrapper
            error={errors?.recurringFor?.message}
            className="hidden w-full"
          >
            <SelectInput
              options={recurringOptions}
              placeholder="Select Recurring Type"
              value={recurringFor}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  setValue("isRecurring", true);
                  setValue(
                    "recurringFor",
                    selectedOption.value as TEventDetailsInputs["recurringFor"],
                  );
                } else {
                  setValue("isRecurring", false);
                  setValue("recurringFor", undefined);
                }
              }}
              label="Recurring"
            />
          </LabelErrorWrapper>

          <Textarea
            id="description"
            placeholder="Enter Description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            error={errors.description?.message}
            label="Description"
            className="bg-secondary"
          />
          <div>
            <FileUploader
              files={media}
              setFiles={(newFiles) => {
                setValue("media", newFiles);
              }}
              isMultiple={false}
              aspectRatio={1280 / 1600}
              cropShape="rect"
              cropWidth={1280}
              cropHeight={1600}
              isLoading={isMediaLoading}
              error={errors?.media?.message}
              label="Event Image"
              fileUploadLabel={
                <FileUploaderLabel
                  readonly={false}
                  fileUploadLabelText=" SVG, PNG, JPG or GIF (max. 1280x1600px)"
                />
              }
            />
          </div>
          <h3 className="text-base font-semibold text-default-900">
            Check In Settings
          </h3>
          <Card>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DatePickerField
                  selectedLabel={dayjs(checkInEndDateField).format(
                    "MMMM D, YYYY",
                  )}
                  selected={checkInEndDateField as Date}
                  onChange={(date) => {
                    setValue("checkInEndDateField", date);
                  }}
                  isDateDisabled={disablePastDatesWithCurrentDate}
                  error={errors?.checkInEndDateField?.message}
                  label="Check-In End"
                  required
                  isTriggerDisabled
                />
                <Input
                  {...register("checkInEndTimeField")}
                  type="time"
                  className="time-picker"
                  error={errors?.checkInEndTimeField?.message}
                  required
                  label="Time"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
          <LabelErrorWrapper error={errors?.isGratuity?.message}>
            <div className="flex flex-col items-start gap-1">
              <div className="flex gap-3">
                <Switch
                  color="primary"
                  checked={!!isGratuity}
                  onCheckedChange={(checked) => setValue("isGratuity", checked)}
                  id="eventDetails.isGratuity"
                />

                <div className="text-sm">
                  <Label
                    htmlFor="eventDetails.isGratuity"
                    className="font-medium text-default-700"
                  >
                    Auto Gratuity
                  </Label>
                  {!isGratuity && (
                    <p className="flex gap-2 text-base text-default-700">
                      <InfoIcon className="h-5 w-5" /> This information will be
                      displayed to customers.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </LabelErrorWrapper>

          {isGratuity && (
            <>
              <div className="group relative w-[224px] space-y-1.5">
                <Input
                  type="number"
                  min={0}
                  step={1}
                  isPositiveOnly
                  placeholder="Enter tip"
                  className="#pe-10 text-base text-default-900"
                  size="sm"
                  {...register("gratuityValue", {
                    valueAsNumber: true,
                  })}
                  error={errors?.gratuityValue?.message}
                  rightExtensionContent={
                    <p className="border-l px-3 py-2 text-default-700 group-focus-within:border-l-primary">
                      %
                    </p>
                  }
                />
              </div>
              <p className="text-default-600">
                This will apply to every purchase on the menu for the duration
                of the event unless adjusted on fennec live.
              </p>
            </>
          )}

          <div className="flex gap-3">
            <Switch
              color="primary"
              checked={!!watch("hideGuestlist")}
              onCheckedChange={(checked) => setValue("hideGuestlist", checked)}
              id="hideGuestlist"
            />

            <div className="text-sm">
              <Label
                htmlFor="hideGuestlist"
                className="font-medium text-default-700"
              >
                Hide Guestlist from Public (B2C)
              </Label>

              <p className="text-default-600">
                Keep your guest list private so only invited attendees and
                internal staff can view it.
              </p>
            </div>
          </div>
          <LabelErrorWrapper error={errors?.isCrowdMeterEnabled?.message}>
            <div className="flex gap-3">
              <Switch
                color="primary"
                checked={!!isCrowdMeterEnabled}
                onCheckedChange={(checked) =>
                  setValue("isCrowdMeterEnabled", checked)
                }
                id="isCrowdMeterEnabled"
              />

              <div className="text-sm">
                <Label
                  htmlFor="isCrowdMeterEnabled"
                  className="font-medium text-default-700"
                >
                  Crowd Meter
                </Label>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <InfoIcon className="size-4 text-default-1000" />

              <p className="text-default-600">
                Enabling Crowd Meter shows Customers how busy the line is on the
                event page.
              </p>
            </div>
          </LabelErrorWrapper>
          <ViewEventTax getAnEventData={getAnEventData} />

          <div className="space-y-1.5">
            <div className="flex w-full justify-end gap-3">
              <div className="flex justify-end gap-3">
                <BackButton disabled={isSubmitting} />
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  <ButtonLoadingContent
                    isLoading={isSubmitting}
                    actionContent="Save"
                  />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </RenderData>
  );
}
