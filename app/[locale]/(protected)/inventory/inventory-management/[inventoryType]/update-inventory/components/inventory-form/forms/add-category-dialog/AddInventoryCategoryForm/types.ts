import type { SubmitHandler, UseFormReset } from "react-hook-form";

import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type {
  TCreateInventoryCategoryArgs,
  TCreateInventoryCategoryMutation,
  TUpdateAnInventoryCategoryMutation,
} from "@/store/api/inventory-category/inventory-category.types";
import type { TInventoryItemType } from "@/store/api/inventory-item/inventory-item.types";
import type { TUploadAMediaMutation } from "@/store/api/media/media.types";
import type { TUseDialogContextReturnType } from "@/components/CustomizedDialog/DialogContext";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

export type IAddInventoryCategoryProps = {
  targetButton?: React.ReactNode;
  isPrimaryMode?: boolean;
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode?: boolean;
  slug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  categoryType?: TInventoryItemType;
};

export type TCreateInventoryCategoryTypes = Omit<
  TCreateInventoryCategoryArgs,
  "media"
> & {
  image?: File | TNullish;
};

export type IAddInventoryCategoryFormData = Omit<
  TCreateInventoryCategoryTypes,
  "media"
> & {
  image?: File | TNullish;
};
export type TOnHandleSubmit = (props: {
  reset: UseFormReset<IAddInventoryCategoryFormData>;
  dialogHookProps: TUseDialogContextReturnType;
  toastHookProps: TUseToastReturnType;
  uploadAMedia: TUploadAMediaMutation;
  createInventoryCategory: TCreateInventoryCategoryMutation;
  updateInventoryCategory: TUpdateAnInventoryCategoryMutation;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode?: boolean;
  slug?: TIdOrSlugOrIdentifier<"slug">["slug"];
}) => SubmitHandler<IAddInventoryCategoryFormData>;
