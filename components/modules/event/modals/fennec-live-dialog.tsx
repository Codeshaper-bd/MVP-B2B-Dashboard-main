"use client";
import { useMemo, useState } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import CustomerIcon from "@/components/icons/sidebar/CustomerIcon";
import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

function FennecLiveDialog() {
  const isEventCompanyUser = useIsEventCompany();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateAnEvent] = useUpdateAnEventMutation();
  const { toast } = useToast();
  const { eventSlug } = useFetchAnEventData();
  const router = useRouter();
  const fennecLivePath = useMemo(() => {
    if (isEventCompanyUser) {
      return "/event-company/events/fennec-live";
    }
    return "/events/fennec-live";
  }, [isEventCompanyUser]);
  const handleButtonClick = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Launching Fennec Live",
      description: "Please wait...",
    });
    setIsSubmitting?.(true);
    try {
      await updateAnEvent({
        slug: eventSlug,
        body: {
          isFennecLive: true,
          status: "Published",
        },
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Launched Fennec Live",
        description: "Event has been lunched successfully",
      });
      router.push(fennecLivePath);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Launch Fennec Live Failed",
          description: "An error occurred while lunching Fennec Live",
        }),
      });
      setIsSubmitting?.(false);
    }
  };
  return (
    <DialogContextProvider>
      <div className="lg:h-full">
        <DialogTrigger asChild>
          <Button
            asChild
            className="cursor-pointer bg-gradient-to-r from-[#e31b54] to-[#dd2590]"
          >
            <span className="flex items-center gap-2">
              <span className="relative block h-2 w-2 rounded-full bg-destructive-secondary before:absolute before:start-0 before:top-0 before:h-full before:w-full before:animate-ping before:rounded-full before:border before:bg-destructive"></span>
              <span> LAUNCH FENNEC LIVE</span>
            </span>
          </Button>
        </DialogTrigger>
        <CustomizedDialog
          maxWidth="400px"
          status="warning"
          mode="ring-bg"
          position="left"
          title="Update Event"
          description="Do you really want to live this event?"
          icon={<CustomerIcon className="size-5" />}
          withCloseButton
          iconRounded="10px"
          descriptionClassName="pt-0"
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose) {
              setClose();
            }
          }}
        >
          <CustomizedDialog.Buttons>
            <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
              Cancel
            </CustomizedDialog.Buttons.SecondaryButton>

            <CustomizedDialog.Buttons.PrimaryButton
              onClick={() => handleButtonClick()}
              disabled={isSubmitting}
            >
              <ButtonLoadingContent
                isLoading={isSubmitting}
                actionContent="Proceed"
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </div>
    </DialogContextProvider>
  );
}

export default FennecLiveDialog;
