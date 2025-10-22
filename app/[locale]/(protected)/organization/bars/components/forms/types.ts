import type { TCreateBarArgs } from "@/store/api/bars/bars.types";
import type { TNullish } from "@/store/api/common-api-types";

export type TBarFormInputs = Omit<TCreateBarArgs, "media"> & {
  barImage: File | TNullish;
};
