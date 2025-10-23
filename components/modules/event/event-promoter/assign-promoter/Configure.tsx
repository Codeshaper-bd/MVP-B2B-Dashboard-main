import { useRef } from "react";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import { useCreateALinkTrackingMutation } from "@/store/api/link-tracking/link-tracking-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { useRouter } from "@/components/navigation";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

function ConfigureDialog({
  eventId,
  promoter,
}: {
  eventId?: number;
  promoter: IOption | TNullish;
}) {
  const [createALinkTracking, { isLoading: isUpdating }] =
    useCreateALinkTrackingMutation();
  const isEventCompany = useIsEventCompany();
  const router = useRouter();
  const routerRef = useRef(router);
  const { toast } = useToast();
  const promoterManagementURL = isEventCompany
    ? "/event-company/organization/promoter-management"
    : "/organization/promoter-management";
  const handleUpdateEvent = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Saving",
      description: "Please wait while we save your changes.",
    });

    try {
      if (!checkIsValidId(promoter?.value)) {
        routerRef.current.push(promoterManagementURL);
        return;
      }
      await createALinkTracking({
        eventId,
        type: "EMPLOYEE",
        promoterId: Number(promoter?.value ?? -1),
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Saved",
        description: "Your changes have been saved.",
        duration: 500,
      });

      setTimeout(() => {
        try {
          routerRef.current.push(promoterManagementURL);
        } catch (error) {
          window.location.href = promoterManagementURL;
        }
      }, 1000);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: "Something went wrong while saving your changes.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="mt-1 inline-block text-sm font-semibold not-italic leading-5 text-[#47CD89]"
        >
          Configure
        </button>
      </AlertDialogTrigger>

      <StatusAlert
        status="info"
        withCloseButton
        icon={<InfoIcon className="size-5" />}
        title="Configure"
        description="You should save your changes before going to promoter page."
      >
        <StatusAlert.Buttons>
          <StatusAlert.Buttons.SecondaryButton disabled={isUpdating}>
            Cancel
          </StatusAlert.Buttons.SecondaryButton>

          <StatusAlert.Buttons.PrimaryButton
            disabled={isUpdating}
            onClick={handleUpdateEvent}
          >
            <ButtonLoadingContent isLoading={isUpdating} actionContent="Save" />
          </StatusAlert.Buttons.PrimaryButton>
        </StatusAlert.Buttons>
      </StatusAlert>
    </AlertDialog>
  );
}

export default ConfigureDialog;
