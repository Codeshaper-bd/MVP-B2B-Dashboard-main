import dayjs from "dayjs";
import React, { memo, useCallback, useState } from "react";

import { type TExternalState } from "@/hooks/useBooleanState";
import { disableDatesOutsideRange } from "@/lib/date-time/disabled-dates";
import {
  convertLocalToUTC,
  convertUTCToLocal,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type {
  TEvent,
  TUpdateAnEventMutation,
} from "@/store/api/events/events.types";
import SelectDateTimeModal from "@/components/date-time/date-range-picker/SelectDateTimeModal";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import { useRouter } from "@/components/navigation";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { type TUseToastReturnType, useToast } from "@/components/ui/use-toast";

import { checkIsScheduleEvent } from "./utils/narrow-type";

type TScheduleEventProps = {
  getAnEventData: TEvent | TNullish;
};

function ScheduleEvent({ getAnEventData }: TScheduleEventProps) {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const toastProps = useToast();
  const [updateAnEvent, { isLoading }] = useUpdateAnEventMutation();

  const handleApply = useCallback(
    ({
      toastProps: { toast },
      updateAnEvent,
      getAnEventData,
    }: {
      toastProps: TUseToastReturnType;
      updateAnEvent: TUpdateAnEventMutation;
      getAnEventData: TEvent | TNullish;
    }) =>
      async (
        date: Date,
        setClose: (props: Partial<TExternalState> | void) => () => void,
      ) => {
        const toastId = toast({
          title: "Event Scheduling",
          description: "Scheduling your event...",
          variant: "loading",
        });

        try {
          // api call
          await updateAnEvent({
            slug: getAnEventData?.details?.slug,
            body: {
              status: "Scheduled",
              publishDate: convertLocalToUTC({
                localDateTime: date,
              }),
            },
          }).unwrap();
          toastId.update({
            id: toastId.id,
            title: "Event Scheduled",
            description: "Your event has been scheduled successfully.",
            variant: "success",
          });
          setIsSuccessModalOpen(true);
          setClose()();
        } catch (error) {
          toastId.update({
            id: toastId.id,
            ...getApiErrorMessages({
              error,
              title: "Event Scheduling Failed",
              description: "An error occurred while scheduling your event.",
            }),
            variant: "error",
          });
        }
      },
    [],
  );
  const handleScheduleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (getAnEventData?.details?.status === "Published") {
      toastProps.toast({
        title: "Event Already Published",
        description:
          "This event has already been published and cannot be scheduled again.",
        variant: "error",
      });
      event.preventDefault();
    }
  };
  const eventPublishDate = convertUTCToLocal({
    utcDateTime: getAnEventData?.details?.publishDate,
    format: "DD MMM YYYY",
  });
  const eventPublishTime = convertUTCToLocal({
    utcDateTime: getAnEventData?.details?.publishDate,
    format: "hh:mm A",
  });
  const eventDescription = `Congratulations! Your event will be published on ${eventPublishDate}, at ${eventPublishTime}.`;
  return (
    <>
      <SelectDateTimeModal
        triggerContent={
          <Button
            color="primary"
            variant="outline"
            type="button"
            onClick={handleScheduleClick}
            disabled={getAnEventData?.details?.status === "Published"}
            className="border-[#7F56D9] bg-[#7F56D9] text-default-1000 hover:border-[#7F56D9]/80 hover:bg-[#7F56D9]/80 hover:text-default-1000"
          >
            Schedule
          </Button>
        }
        disabled={(date) =>
          disableDatesOutsideRange({
            date,
            rangeStart: new Date(),
            rangeEnd: convertUTCToLocalDate({
              utcDateTime: getAnEventData?.details?.startTime,
            }),
          })
        }
        endDateTime={getAnEventData?.details?.startTime}
        applyButtonText="Schedule Publish"
        cancelButtonText="Cancel"
        selectedDate={
          checkIsScheduleEvent(getAnEventData) &&
          getAnEventData?.details?.publishDate
            ? dayjs(getAnEventData?.details?.publishDate).toDate()
            : new Date()
        }
        isApplyLoading={isLoading}
        onApply={handleApply({
          toastProps,
          updateAnEvent,
          getAnEventData,
        })}
      />
      <AlertDialog
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
      >
        <StatusAlert
          icon={<CheckCircleIcon className="size-6" />}
          title="Your event has been successfully scheduled"
          description={eventDescription}
          withCloseButton
          maxWidth="400px"
          status="success"
        >
          <Button
            size="lg"
            fullWidth
            type="button"
            color="primary"
            onClick={() => {
              setIsSuccessModalOpen(false);
              router.push(`/events/upcoming-events`);
            }}
          >
            OK
          </Button>
        </StatusAlert>
      </AlertDialog>
    </>
  );
}

export default memo(ScheduleEvent);
