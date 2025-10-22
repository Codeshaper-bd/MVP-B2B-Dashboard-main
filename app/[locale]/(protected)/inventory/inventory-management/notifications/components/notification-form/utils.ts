import type { TCreateInventorySettingsArgs } from "@/store/api/inventories-settings/inventory-settings.types";

export type TNotificationFormInputs = Omit<
  TCreateInventorySettingsArgs,
  "thresholds" | "emails" | "phone_numbers"
> & {
  thresholds: { value: number }[];
  emails?: { value: string | undefined }[];
  phone_numbers?: { value: string | undefined }[];
};

export const initialNotificationFormValues: TNotificationFormInputs = {
  thresholds: [{ value: 0 }],
  notify_email: true,
  notify_phone: true,
  emails: [],
  phone_numbers: [],
};
