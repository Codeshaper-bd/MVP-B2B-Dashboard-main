import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayReplace,
} from "react-hook-form";

import type { TBarMenuItemFormType, TUniqueProduct } from "../types";

export type THandleToggleSelect = (
  props: TUniqueProduct & {
    selectedData: Set<number>;
    ingredientsInFormState: FieldArrayWithId<
      TBarMenuItemFormType,
      "ingredients",
      "id"
    >[];
    replaceIngredient: UseFieldArrayReplace<
      TBarMenuItemFormType,
      "ingredients"
    >;
    appendIngredient: UseFieldArrayAppend<TBarMenuItemFormType, "ingredients">;
  },
) => () => void;
