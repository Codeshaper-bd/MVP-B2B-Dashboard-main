import type { TCreateBarMenuArgs } from "@/store/api/bar-menu/bar-menu.types";
import type { TNullish } from "@/store/api/common-api-types";

export type TBarMenuFormType = Omit<TCreateBarMenuArgs, "media"> & {
  media?: File[] | TNullish;
};

export const initialValues: TBarMenuFormType = {
  name: "",
  media: undefined,
};
