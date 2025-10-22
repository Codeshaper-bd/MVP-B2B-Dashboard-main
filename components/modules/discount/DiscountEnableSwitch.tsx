import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
interface IDiscountSwitchProps {
  getAnEventData: TEvent | TNullish;
}
function DiscountEnableSwitch({ getAnEventData }: IDiscountSwitchProps) {
  const eventSlug = getAnEventData?.details?.slug;
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();

  const isDiscountEnabled = !!getAnEventData?.details?.isDiscountEnabled;
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

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: checked ? "Discount Activated" : "Discount Deactivated",
        description: checked
          ? "The discount has been activated."
          : "The discount has been deactivated.",
      });
    } catch (error) {
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

  return (
    <Switch
      color="primary"
      checked={isDiscountEnabled}
      onCheckedChange={handleChange}
      disabled={isUpdating}
    />
  );
}

export default DiscountEnableSwitch;
