import { useState } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import ConfirmationDialog from "@/components/features/alert-dialog/confirmationDialog";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
interface IDiscountSwitchProps {
  getAnEventData: TEvent | TNullish;
}
function DiscountSwitch({ getAnEventData }: IDiscountSwitchProps) {
  const eventSlug = getAnEventData?.details?.slug;
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();

  const isDiscountEnabled = !!getAnEventData?.details?.isDiscountEnabled;
  const [checked, setChecked] = useState(isDiscountEnabled);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = async (checked: boolean) => {
    const toastId = toast({
      variant: "loading",
      title: checked ? "Activating Discount" : "Deactivating Discount",
      description: checked
        ? "Please wait while we activate the discount."
        : "Please wait while we deactivate the discount.",
    });
    try {
      await updateAnEvent({
        slug: eventSlug,
        body: {
          isDiscountEnabled: checked,
        },
      });
      setChecked(checked);
      setIsOpen(false);
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: checked ? "Discount Activated" : "Discount Deactivated",
        description: checked
          ? "The discount has been activated."
          : "The discount has been deactivated.",
      });
    } catch (error) {
      setChecked(!checked);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: checked
            ? "Failed to activate discount"
            : "Failed to deactivate discount",
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
        title="Deactivate Discount"
        description="Are you sure you want to deactivate this discount?"
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
          setChecked(!!isDiscountEnabled);
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

export default DiscountSwitch;
