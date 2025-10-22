import { useFormContext, useWatch } from "react-hook-form";

import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type {
  TEvent,
  TGuestListConditionalType,
} from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import InfoIcon from "@/components/icons/InfoIcon";
import { useRouter } from "@/components/navigation";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

import type { IStepFormInputs } from "../../../../../type";
function ConfigureDialog({
  eventSlug,
  getAnEventData,
}: {
  eventSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  getAnEventData: TEvent | TNullish;
}) {
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();
  const router = useRouter();
  const { toast } = useToast();
  const { control } = useFormContext<IStepFormInputs>();

  const isFreeGuestList = useWatch({
    control,
    name: "ticketing.isFreeGuestList",
  });

  const guestListLimitType = useWatch({
    control,
    name: "ticketing.guestListLimitType",
  });

  const guestListLimit = useWatch({
    control,
    name: "ticketing.guestListLimit",
  });

  const perUserGuestListLimitQty = useWatch({
    control,
    name: "ticketing.perUserGuestListLimitQty",
  });
  const handleGuestListSave = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Saving",
      description: "Please wait while we save your changes.",
    });

    try {
      await updateAnEvent({
        slug: eventSlug,
        body: {
          isFreeGuestList:
            isFreeGuestList as unknown as TGuestListConditionalType,
          guestListLimit,
          guestListLimitType,
          perUserGuestListLimitQty,
        },
      });
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Saved",
        description: "Your changes have been saved.",
      });
      router.push(`/event-company/user-profile#${getAnEventData?.venue?.slug}`);
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
        description="You should save your changes before going to profile page."
      >
        <StatusAlert.Buttons>
          <StatusAlert.Buttons.SecondaryButton disabled={isUpdating}>
            Cancel
          </StatusAlert.Buttons.SecondaryButton>

          <StatusAlert.Buttons.PrimaryButton
            disabled={isUpdating}
            onClick={handleGuestListSave}
          >
            <ButtonLoadingContent isLoading={isUpdating} actionContent="Save" />
          </StatusAlert.Buttons.PrimaryButton>
        </StatusAlert.Buttons>
      </StatusAlert>
    </AlertDialog>
  );
}

export default ConfigureDialog;
