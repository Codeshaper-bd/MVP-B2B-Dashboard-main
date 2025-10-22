import type { SubmitHandler, UseFormReset } from "react-hook-form";

import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type { TUploadAMediaMutation } from "@/store/api/media/media.types";
import type {
  TCreateAVenueMutation,
  TCreateVenueArgs,
  TUpdateAVenueMutation,
  TVenue,
} from "@/store/api/venues/venues.types";
import type { TUseDialogContextReturnType } from "@/components/CustomizedDialog/DialogContext";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

export type IAddOrEditVenueProps = {
  isEditMode?: boolean;
  slug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  targetButton?: React.ReactNode;
  isPrimaryMode?: boolean;
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccessAddVenue?: (venue: TVenue) => void;
};

type TCreateVenueTypes = Omit<TCreateVenueArgs, "media"> & {
  mainImage: File | TNullish;
  galleryMultipleImages?: File[] | TNullish;
};

export type IAddOrEditVenueFormData = TCreateVenueTypes;
export type TOnHandleSubmit = (props: {
  reset: UseFormReset<IAddOrEditVenueFormData>;
  dialogHookProps: TUseDialogContextReturnType;
  toastHookProps: TUseToastReturnType;
  uploadAMedia: TUploadAMediaMutation;
  createAVenue: TCreateAVenueMutation;
  updateAVenue: TUpdateAVenueMutation;
  getAVenueData: TVenue | null | undefined;
  isEditMode: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}) => SubmitHandler<IAddOrEditVenueFormData>;
