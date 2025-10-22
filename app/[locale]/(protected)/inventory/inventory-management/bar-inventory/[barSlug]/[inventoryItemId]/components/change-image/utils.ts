import type { TUpdateABarMenuArgs } from "@/store/api/bar-menu/bar-menu.types";
import type { TNullish } from "@/store/api/common-api-types";
export type IFormInput = Omit<TUpdateABarMenuArgs["body"], "media"> & {
  media: File[] | TNullish;
};

export const defaultFormValues: IFormInput = {
  media: null,
};
