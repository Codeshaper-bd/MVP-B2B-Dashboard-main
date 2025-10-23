import dayjs from "dayjs";
import { memo } from "react";
import type { UseFormReturn } from "react-hook-form";

import { disablePastDates } from "@/lib/date-time/disabled-dates";
import type { TNullish } from "@/store/api/common-api-types";
import DatePickerField from "@/components/date-time/DatePickerField";
import FileUploader from "@/components/form/file-uploader";
import AiMagicIcon from "@/components/icons/AiMagicIcon";
import { InfoIcon as InfoIcon } from "@/components/icons";
import AddOrEditVenueDialog from "@/components/modules/venue/modals/AddOrEditVenueDialog";
import SelectInput from "@/components/SelectInput";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Textarea } from "@/components/ui/textarea";

import { type IStepOneProps } from ".";
import type { IStepFormInputs } from "../../type";

interface IFormContentProps extends IStepOneProps {
  formContextProps: UseFormReturn<IStepFormInputs>;
  venueOptions: IOption[];
  isVenueLoading: boolean | undefined | null;
  // date time related fields start
  startTimeDateField: Date | TNullish;
  startTimeTimeField: string;
  endTimeDateField: Date | TNullish;
  endTimeTimeField: string;
  checkInEndDateField: Date | TNullish;
  checkInEndTimeField: string;

  // date time related fields end
  media: File[] | TNullish;
  venueId: number;
  eventSlug: string;
}

function FormContent({
  formContextProps,
  venueOptions,
  isVenueLoading,
  // date time related fields
  startTimeDateField,
  endTimeDateField,
  checkInEndDateField,
  // date,
  media,
  venueId,
  isMediaLoading,
}: IFormContentProps) {
  const {
    register,
    formState: { errors },
    setValue,
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
            <div className="mt-6 space-y-6">
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
                  dropDownBottomContent={<AddOrEditVenueDialog />}
                  onChange={(value) =>
                    setValue("eventDetails.venueId", Number(value?.value))
                  }
                  value={
                    typeof venueId === "number" && venueId > 0
                      ? venueId
                      : undefined
                  }
                  isLoading={!!isVenueLoading}
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

                <Input
                  {...register("eventDetails.startTimeTimeField")}
                  type="time"
                  className="time-picker"
                  error={errors?.eventDetails?.startTimeTimeField?.message}
                  required
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
                <Input
                  {...register("eventDetails.endTimeTimeField")}
                  type="time"
                  className="time-picker"
                  error={errors?.eventDetails?.endTimeTimeField?.message}
                  required
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
                  isDateDisabled={disablePastDates}
                  error={errors?.eventDetails?.checkInEndDateField?.message}
                />
                <Input
                  {...register("eventDetails.checkInEndTimeField")}
                  type="time"
                  className="time-picker"
                  error={errors.eventDetails?.checkInEndTimeField?.message}
                  required
                />
              </div>
              {/*
               * File Upload
               */}
              <LabelErrorWrapper
                error={errors?.eventDetails?.media?.message}
                required
              >
                <FileUploader
                  isMultiple={false}
                  files={media}
                  setFiles={(newFiles) => {
                    setValue("eventDetails.media", newFiles);
                  }}
                  isLoading={isMediaLoading}
                />
              </LabelErrorWrapper>

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
                  className="px-3.5 py-2.5 text-primary hover:text-primary"
                  color="secondary"
                  type="button"
                >
                  <AiMagicIcon className="me-1 h-4 w-4 text-primary" /> Write
                  with Magic
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(FormContent);
