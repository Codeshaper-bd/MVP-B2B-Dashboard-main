import { Fragment } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import { ClockIcon as ClockIcon } from "@/components/icons";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function PastEventAbout() {
  const [updateAnEvent] = useUpdateAnEventMutation();
  const { getAnEventData } = useFetchAnEventData();
  const { toast } = useToast();

  const handleGuestListToggle = async (checked: boolean) => {
    const toastId = toast({
      variant: "loading",
      title: "Updating Event",
      description: "Please wait while we update the event.",
    });

    try {
      await updateAnEvent({
        slug: getAnEventData?.details?.slug || "",
        body: {
          hideGuestlist: checked,
        },
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Event Updated",
        description: "Event has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Event Update Failed",
        description: "Unable to update event. Please try again.",
      });
    }
  };
  return (
    <Fragment>
      <div className="mt-6">
        <div className="space-y-4">
          <Input
            className="disabled:bg-secondary"
            label="Event Name"
            value={getAnEventData?.details?.name || ""}
            disabled
          />

          <Input
            className="disabled:bg-secondary"
            label="Venue"
            value={getAnEventData?.venue?.name || ""}
            disabled
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Input
              type="text"
              className="disabled:bg-secondary"
              label="Doors Open"
              value={convertUTCToLocal({
                utcDateTime: getAnEventData?.details?.startTime,
                format: "MMM D, YYYY",
              })}
              disabled
            />

            <Input
              type="text"
              className="time-picker h-12 border-default-200 disabled:bg-secondary"
              label="Time"
              leftContent={<ClockIcon className="size-5" />}
              value={convertUTCToLocal({
                utcDateTime: getAnEventData?.details?.startTime,
                format: "HH:mm",
              })}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Input
              type="text"
              className="time-picker h-12 border-default-200 disabled:bg-secondary"
              label="Event End"
              value={convertUTCToLocal({
                utcDateTime: getAnEventData?.details?.endTime,
                format: "MMM D, YYYY",
              })}
              disabled
            />
            <Input
              type="text"
              className="time-picker h-12 border-default-200 disabled:bg-secondary"
              label="Time"
              leftContent={<ClockIcon className="size-5" />}
              value={convertUTCToLocal({
                utcDateTime: getAnEventData?.details?.endTime,
                format: "HH:mm",
              })}
              disabled
            />
          </div>

          {/* <Input
            className="disabled:bg-secondary"
            label="Recurring"
            value={
              getAnEventData?.details?.recurringFor?.split("_").join(" ") || ""
            }
            disabled
          /> */}

          <Textarea
            label="Description"
            className="!bg-default-50 !text-[#85888E]"
            value={getAnEventData?.details?.description || ""}
            disabled
          />

          <div className="space-y-4">
            <p className="text-base font-semibold text-default-900">
              Check In Settings
            </p>
            <Card className="p-5">
              <Input
                className="disabled:bg-secondary"
                label="Check In End"
                rightContent={
                  <span className="flex items-center gap-1">
                    {convertUTCToLocal({
                      utcDateTime: getAnEventData?.details?.checkInEnd,
                      format: "A",
                    })}
                    <ChevronDownIcon className="size-4" />
                  </span>
                }
                value={convertUTCToLocal({
                  utcDateTime: getAnEventData?.details?.checkInEnd,
                  format: "HH:mm",
                })}
                disabled
              />
            </Card>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Switch
                color="primary"
                checked={!!getAnEventData?.details.isGratuity}
                id="eventDetails.isGratuity"
              />
              <Label
                htmlFor="eventDetails.isGratuity"
                className="text-sm font-medium text-default-700"
              >
                Auto Gratuity
              </Label>
            </div>
            {getAnEventData?.details.isGratuity && (
              <div className="space-y-2">
                <div className="w-auto md:w-2/6">
                  <Input
                    type="number"
                    disabled
                    placeholder=""
                    className="!bg-default text-base text-default-900"
                    value={getAnEventData?.details.gratuityValue}
                    size="sm"
                    rightExtensionContent={
                      <span className="border-l px-3 py-2 text-default-700 group-focus-within:border-l-primary">
                        %
                      </span>
                    }
                  />
                </div>
                <p className="flex items-center gap-1 text-default-600">
                  <InfoIcon className="size-5" />
                  This will apply to every purchase on the menu for the duration
                  of the event unless adjusted on fennec live.
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-3">
              <Switch
                color="primary"
                checked={!!getAnEventData?.details?.hideGuestlist}
                id="hideGuestlist"
                onCheckedChange={handleGuestListToggle}
              />

              <div className="text-sm">
                <Label
                  htmlFor="hideGuestlist"
                  className="font-medium text-default-700 hover:text-primary"
                >
                  Hide Guestlist from Public (B2C)
                </Label>

                <p className="text-default-600">
                  Keep your guest list private so only invited attendees and
                  internal staff can view it.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Switch
                color="primary"
                checked={!!getAnEventData?.details?.isCrowdMeterEnabled}
                id="eventDetails.isCrowdMeter"
              />
              <Label
                htmlFor="eventDetails.isCrowdMeter"
                className="mb-0 text-sm font-medium text-default-700"
              >
                Crowd Meter
              </Label>
            </div>
            {getAnEventData?.details?.isCrowdMeterEnabled && (
              <p className="flex items-center gap-1 text-default-600">
                <InfoIcon className="size-5" />
                Enabling Crowd Meter shows Customers how busy the line is on the
                event page.
              </p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
