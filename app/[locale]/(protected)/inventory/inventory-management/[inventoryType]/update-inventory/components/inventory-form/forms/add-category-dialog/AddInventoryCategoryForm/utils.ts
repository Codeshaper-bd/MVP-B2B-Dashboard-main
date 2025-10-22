import type { TNullish } from "@/store/api/common-api-types";
import type {
  TCreateAlcoholicInventoryCategoryArgs,
  TCreateNonAlcoholicInventoryCategoryArgs,
  TInventoryCategory,
} from "@/store/api/inventory-category/inventory-category.types";

import type { IAddInventoryCategoryFormData } from "./types";

export const initialState: IAddInventoryCategoryFormData = {
  name: "",
  image: undefined,
  status: undefined,
  unit: "G_PER_ML",
  notes: "",
  categoryType: "NON_ALCOHOLIC",
};

export function isAlcoholicCategory(
  data: TInventoryCategory | TNullish,
): data is TInventoryCategory & TCreateAlcoholicInventoryCategoryArgs {
  return data?.categoryType === "ALCOHOLIC";
}

export function isNonAlcoholicCategory(
  data: TInventoryCategory | TNullish,
): data is TInventoryCategory & TCreateNonAlcoholicInventoryCategoryArgs {
  return data?.categoryType === "NON_ALCOHOLIC";
}
