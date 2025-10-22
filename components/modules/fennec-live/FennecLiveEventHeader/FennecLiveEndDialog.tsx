"use client";
import dayjs from "dayjs";

import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import { type TUpdateAnEventArgs } from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import InfoIcon from "@/components/icons/InfoIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ITimeCheckedDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string | undefined;
}

function FennecLiveEndDialog({ open, setOpen, slug }: ITimeCheckedDialogProps) {
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();

  const { toast } = useToast();

  const handleEndFennecLive = async () => {
    const toastId = toast({
      title: "Ending Fennec Live",
      description: "Please wait...",
      variant: "loading",
    });
    try {
      const body: TUpdateAnEventArgs["body"] = {
        endTime: convertLocalToUTC({ localDateTime: dayjs().toDate() }),
        isFennecLive: false,
        status: "Completed",
      };

      await updateAnEvent({ slug, body }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Fennec Live Ended",
        description: "Fennec Live has been ended successfully",
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to end Fennec Live:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Failed to End Fennec Live",
        description: "Failed to end Fennec Live. Please try again later.",
      });
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        withCloseButton
        icon={<InfoIcon className="size-5" />}
        status="warning"
        title="End Fennec Live"
        description="Are you sure you want to end the event? This action will immediately stop the live session for all participants."
        maxWidth="480px"
      >
        <div className="mt-3 grid w-full grid-cols-2 gap-3">
          <Button
            fullWidth
            color="secondary"
            size="lg"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            color="primary"
            size="lg"
            onClick={() => {
              handleEndFennecLive();
            }}
          >
            <ButtonLoadingContent
              isLoading={isUpdating}
              actionContent="Confirm"
            />
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default FennecLiveEndDialog;
