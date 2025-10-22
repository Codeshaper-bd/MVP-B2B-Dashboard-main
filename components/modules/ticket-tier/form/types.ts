import { type UseFormReturn } from "react-hook-form";

import { type TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import {
  type TTicketTier,
  type TCreateTicketTierArgs,
  type TUpdateATicketTierArgs,
  type TCreateATicketTierMutation,
  type TUpdateATicketTierMutation,
} from "@/store/api/ticket-tier/ticket-tier.types";
import { type TUseToastReturnType } from "@/components/ui/use-toast";

export type TTicketFormType = TCreateTicketTierArgs & {
  isEditMode?: boolean;
};

export interface ICreateTierFormProps {
  isEditMode?: boolean;
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  selectedSlug: TUpdateATicketTierArgs["slug"];
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitSuccess?: (data: TTicketTier) => void;
}

export type TOnSubmit = (props: {
  toastHookProps: TUseToastReturnType;
  createATicketTier: TCreateATicketTierMutation;
  updateATicketTier: TUpdateATicketTierMutation;
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  isEditMode: ICreateTierFormProps["isEditMode"];
  formProps: UseFormReturn<TTicketFormType>;
  selectedSlug: ICreateTierFormProps["selectedSlug"];
  setClose: () => void;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitSuccess?: (data: TTicketTier) => void;
}) => (data: TTicketFormType) => Promise<void>;
