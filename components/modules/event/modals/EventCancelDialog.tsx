import { useEffect, useState } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { useCancelEventMutation } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import IconBorder from "@/components/ui/icon-border";
import { useToast } from "@/components/ui/use-toast";

function EventCancelDialog({
  eventData,
  className,
  location,
}: {
  eventData: TEvent | TNullish;
  className?: string;
  location?: string;
}) {
  const [cancelEvent, { isLoading }] = useCancelEventMutation();
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (open) {
      setCount(10);
    }
  }, [open]);

  useEffect(() => {
    if (count <= 0) {
      return;
    }

    const timeInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [count]);

  const handleCancelEvent = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Cancelling Event",
      description: "Please wait while we cancel the event.",
    });

    try {
      await cancelEvent({
        slug: eventData?.details?.slug,
      }).unwrap();
      // if (location === "upcoming-events") {
      //   router.push(`/events/upcoming-events?tab=cancelled`);
      // } else {
      //   updateAParam({
      //     key: "tab",
      //     value: "cancelled",
      //   });
      // }
      if (location === "upcoming-events") {
        router.push(`/events/upcoming-events`);
      }
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Event Cancelled",
        description: "The event has been cancelled successfully.",
      });
      setOpen(false);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Event Cancellation Failed",
          description: "An error occurred while cancelling the event.",
        }),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={cn("bg-[#F04438] hover:bg-[#F04438]", className)}
        >
          Cancel Event
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 md:max-w-[480px]">
        <div className="mb-4 flex justify-center">
          <IconBorder className="size-12 bg-[#D92D20] text-default-1000">
            <InfoIcon className="size-6" />
          </IconBorder>
        </div>
        <h2 className="mb-5 text-center text-lg font-semibold text-default-900">
          Confirm Event Cancellation
        </h2>
        <div className="rounded-[9px] border border-[#D92D20]/30 bg-[#F044381A]/10 p-4">
          <div className="mb-4 flex items-center gap-2">
            <InfoIcon className="size-5 text-[#F04438]" />
            <p className="text-[#F5F5F6]">
              Are you sure you want to cancel this event?
            </p>
          </div>
          <ul className="list-disc space-y-1 px-5 text-base text-[#F5F5F6]">
            <li>
              {`All customers who have purchased ticket(s) will receive a full
              refund.`}
            </li>
            <li>
              {`The organization will bear all processing fees from these
              ticket(s).`}
            </li>
            <li>This action cannot be undone.</li>
          </ul>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button
            fullWidth
            size="lg"
            className="border-none bg-[#F04438] text-white hover:bg-[#F04438] disabled:bg-secondary"
            disabled={count > 0}
            onClick={handleCancelEvent}
          >
            {count > 0 && `(${count})`}{" "}
            <ButtonLoadingContent
              isLoading={isLoading}
              actionContent="Yes, Cancel Event"
            />
          </Button>
          <Button
            fullWidth
            color="secondary"
            size="lg"
            className="border-none"
            onClick={() => setOpen(false)}
          >
            No, Go Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventCancelDialog;
