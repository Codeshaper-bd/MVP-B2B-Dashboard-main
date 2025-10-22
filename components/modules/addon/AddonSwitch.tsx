import React from "react";

import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import { Switch } from "@/components/ui/switch";

interface IAddonSwitchProps {
  eventSlug: string;
  isAddOnEnabled: boolean;
}

function AddonSwitch({ eventSlug, isAddOnEnabled }: IAddonSwitchProps) {
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();

  const handleChange = async (checked: boolean) => {
    try {
      await updateAnEvent({
        slug: eventSlug,
        body: {
          isAddOnEnabled: checked,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Switch
      color="primary"
      checked={isAddOnEnabled}
      onCheckedChange={handleChange}
      disabled={isUpdating}
    />
  );
}

export default AddonSwitch;
