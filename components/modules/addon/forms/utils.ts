import type { TCreateAddOnArgs } from "@/store/api/add-ons/add-ons.types";
import type { TMedia } from "@/store/api/media/media.types";
export type TAddonFormInputs = Omit<TCreateAddOnArgs, "media"> & {
  icon?: TMedia;
};

export const initialAddonsFormValues: TAddonFormInputs = {
  name: "",
  description: "",
  price: 0,
  maxQty: 0,
  status: "Active",
  icon: undefined,
};
