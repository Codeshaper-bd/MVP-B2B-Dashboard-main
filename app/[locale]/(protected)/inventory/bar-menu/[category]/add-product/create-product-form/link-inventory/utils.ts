import { type THandleToggleSelect } from "./types";

export const handleToggleSelect: THandleToggleSelect =
  ({
    selectedData,
    ingredientsInFormState,
    replaceIngredient,
    appendIngredient,
    ...item
  }) =>
  () => {
    if (!selectedData?.has(item?._id)) {
      appendIngredient(item);
      return;
    }

    const filteredIngredients =
      ingredientsInFormState?.filter(
        (ingredient) =>
          !!ingredient?._id && !!item?._id && ingredient._id !== item._id,
      ) ?? [];
    replaceIngredient(filteredIngredients);
  };
