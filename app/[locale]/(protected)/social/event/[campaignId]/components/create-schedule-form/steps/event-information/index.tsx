import { useState } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import AiMagicIcon from "@/components/icons/AiMagicIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import AddOrEditVenueDialog from "@/components/modules/venue/modals/AddOrEditVenueDialog";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import AssociatedOrganizations from "./associated-organization";
import DjsContent from "./djs-content";
import ImportExistingModal from "./ImportExistingModal";
import RelevantImages from "./relevant-images";
import SponsorLogo from "./sponsor-logo";
import UploadBackgroundImage from "./upload-background";

function EventInformation() {
  const [date, setDate] = useState<Date>();

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {/* header */}
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-[#F5F5F6]">
              Event Information
            </h1>
            <p className="text-sm text-default-600">
              Fill in the essential information about your event.
            </p>
          </div>
          <div className="flex-none">
            <ImportExistingModal />
          </div>
        </div>

        <LabelErrorWrapper label="Event Name">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              type="text"
              placeholder="Christmas Carnival"
              containerClassName="w-full"
            />
            <Button
              color="secondary"
              className="h-11 text-primary"
              type="button"
            >
              <AiMagicIcon className="me-1 h-5 w-5" />
              AI Generation
            </Button>
          </div>
        </LabelErrorWrapper>
        <div className="ga-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <LabelErrorWrapper label="Event date ">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  fullWidth
                  className={cn(
                    "h-11 justify-start border border-default-200 text-left font-normal md:px-2.5",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="me-1 size-5" />
                  {convertUTCToLocal({
                    utcDateTime: date?.toString(),
                    format: "MMM D, YYYY",
                  })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </LabelErrorWrapper>
          <Input
            type="time"
            label="Time / Doors Open"
            placeholder="Enter Time"
            leftContent={
              <CalendarIcon className="me-1 size-5 text-default-500" />
            }
          />
        </div>

        <SelectInput
          // options={venueOptions}
          label="Venue"
          placeholder="Select Venue"
          dropDownBottomContent={<AddOrEditVenueDialog />}
          // onChange={(value) => setValue("eventDetails.venue", String(value?.value))}
          // value="eventDetails.venue"
          // error={errors.eventDetails?.venue?.message>}
          className="w-full text-sm" // Adjust padding for icon
          leftContent={<LocationIcon className="h-5 w-5 text-default-400" />}
        />

        <Textarea
          placeholder="Enter event details..."
          rows={5}
          label="Description"
        />

        <div className="flex gap-4">
          <p className="flex-1 text-sm text-default-600">
            Implies that the AI will help spark creative ideas for the event
            description.
          </p>
          <Button
            color="secondary"
            type="button"
            className="h-11 flex-none text-primary"
          >
            <AiMagicIcon className="me-1 h-5 w-5" />
            Write with Magic
          </Button>
        </div>

        {/* Switch Section */}
        <div className="mt-8 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch color="success" id="cb1" />
              <Label
                htmlFor="cb1"
                className="mb-0 text-sm font-medium text-default-700"
              >
                DJs
              </Label>
            </div>
            <DjsContent />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch color="primary" id="cb2" />
              <Label
                htmlFor="cb2"
                className="mb-0 text-sm font-medium text-default-700"
              >
                Sponsor Logo
              </Label>
            </div>
            <SponsorLogo />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch color="primary" id="cb3" />
              <Label
                htmlFor="cb3"
                className="mb-0 text-sm font-medium text-default-700"
              >
                Add relevant images and sample
              </Label>
            </div>
            <RelevantImages />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch color="primary" id="cb4" />
              <Label
                htmlFor="cb4"
                className="mb-0 text-sm font-medium text-default-700"
              >
                Upload your own background image
              </Label>
            </div>
            <UploadBackgroundImage />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch color="primary" id="cb5" />
              <Label
                htmlFor="cb5"
                className="mb-0 text-sm font-medium text-default-700"
              >
                Associated Organizations
              </Label>
            </div>
            <AssociatedOrganizations />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventInformation;
