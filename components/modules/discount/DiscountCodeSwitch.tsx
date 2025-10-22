import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useUpdateADiscountMutation } from "@/store/api/discounts/discounts-api";
import type { TDiscount } from "@/store/api/discounts/discounts.types";
import { Switch } from "@/components/ui/switch";
import { TooltipComponent } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface IDiscountCodeSwitchProps {
  item: TDiscount;
}
function DiscountCodeSwitch({ item }: IDiscountCodeSwitchProps) {
  const [updateADiscount] = useUpdateADiscountMutation();
  const { toast } = useToast();
  const handleDiscountCodeChange = async (checked: boolean) => {
    const toastId = toast({
      variant: "loading",
      title: checked ? "Activating Discount" : "Deactivating Discount",
      description: checked
        ? "Please wait while we activate the discount."
        : "Please wait while we deactivate the discount.",
    });
    try {
      await updateADiscount({
        id: item?.id,
        body: {
          isDisabled: !checked,
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
        ...getApiErrorMessages({ error }),
      });
    }
  };
  return (
    <TooltipComponent content={<span>Discount code enable/disable</span>}>
      <div>
        <Switch
          color="primary"
          checked={!item?.isDisabled}
          onCheckedChange={handleDiscountCodeChange}
        />
      </div>
    </TooltipComponent>
  );
}

export default DiscountCodeSwitch;
