import { useState } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import ConfirmationDialog from "@/components/features/alert-dialog/confirmationDialog";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
interface IGroupDiscountSwitchProps {
  getAnEventData: TEvent | TNullish;
}
function GroupDiscountSwitch({ getAnEventData }: IGroupDiscountSwitchProps) {
  const eventSlug = getAnEventData?.details?.slug;
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();

  const isGroupDiscountEnabled =
    !!getAnEventData?.details?.isGroupDiscountEnabled;
  const [checked, setChecked] = useState(isGroupDiscountEnabled);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = async (checked: boolean) => {
    const toastId = toast({
      variant: "loading",
      title: checked
        ? "Activating Group Discount"
        : "Deactivating Group Discount",
      description: checked
        ? "Please wait while we activate the group discount."
        : "Please wait while we deactivate the group discount.",
    });
    try {
      await updateAnEvent({
        slug: eventSlug,
        body: {
          isGroupDiscountEnabled: checked,
        },
      });
      setChecked(checked);
      setIsOpen(false);
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: checked
          ? "Group Discount Activated"
          : "Group Discount Deactivated",
        description: checked
          ? "The group discount has been activated."
          : "The group discount has been deactivated.",
      });
    } catch (error) {
      setChecked(!checked);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: checked
            ? "Failed to activate group discount"
            : "Failed to deactivate group discount",
          description: "Please try again later.",
        }),
      });
    }
  };

  const handleDelete = async () => {
    await handleChange(false);
  };
  return (
    <>
      <Switch
        color="primary"
        checked={checked}
        onCheckedChange={(checked) => {
          if (checked) {
            // Activate immediately without confirmation
            handleChange(checked);
          } else {
            // Show confirmation dialog for deactivation
            setChecked(checked);
            setIsOpen(true);
          }
        }}
      />
      <ConfirmationDialog
        title="Deactivate Group Discount"
        description="Are you sure you want to deactivate this group discount?"
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
          setChecked(!!isGroupDiscountEnabled);
        }}
        onConfirmClick={handleDelete}
        confirmText="Confirm"
        icon={<CalenderIcon className="size-5" />}
        statusColor="warning"
        isLoading={isUpdating}
      />
    </>
  );
}

export default GroupDiscountSwitch;
