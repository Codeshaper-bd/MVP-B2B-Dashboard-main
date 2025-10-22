import type { SubmitHandler } from "react-hook-form";

import type { IChallengeFormData } from "@/app/[locale]/(protected)/dashboard/challenges/components/Forms/CreateChallengeForm/types";
import type {
  TBarMenuItemIngredient,
  TBarMenuItemType,
  TCreateBarMenuItemArgs,
} from "@/store/api/bar-menu-item/bar-menu-item.types";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type { TSingleInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import type { TMedia } from "@/store/api/media/media.types";
import type { TDiscountForm } from "@/components/modules/discount/forms/types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

export type TPageParams = {
  locale?: string;
  category?: string;
  productSlug?: string;
};
export interface ICreateProductFormProps {
  isEditMode?: boolean;
  productSlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  isFullWidth?: boolean;
}

export type TUniqueProduct = Omit<TSingleInventoryItemData, "id"> &
  TBarMenuItemIngredient & {
    _id: number;
  };

export type TUniqueMedia = Omit<TMedia, "id"> & {
  _id: number;
};

export type TChallengeMode =
  | { mode: "create"; formIdentifier: string }
  | { mode: "edit"; slug: string; formIdentifier: string };
export type TChallengeFormState = IChallengeFormData & TChallengeMode;

export type TDiscountMode =
  | { mode: "create"; formIdentifier: string }
  | { mode: "edit"; _id: number; formIdentifier: string };
export type TDiscountFormState = TDiscountForm & TDiscountMode;

export type TBarMenuItemFormType = Omit<
  TCreateBarMenuItemArgs,
  "media" | "barMenuId" | "ingredients"
> & {
  media: TUniqueMedia[] | TNullish;
  ingredients: TUniqueProduct[];
  challenges?: TChallengeFormState[];
  discounts?: TDiscountFormState[];
  alcoholicIngredientCheck?: any; // Field for alcoholic ingredient validation
};

export type TBarMenuItemTypeOption = IOption & {
  value: TBarMenuItemType;
};

export type TOnSubmit = SubmitHandler<TBarMenuItemFormType>;
