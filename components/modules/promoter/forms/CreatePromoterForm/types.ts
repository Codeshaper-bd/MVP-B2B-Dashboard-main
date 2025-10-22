import type { TNullish } from "@/store/api/common-api-types";
import type {
  TCheckInvitationStatus,
  TGuestListType,
  TPromoter,
  TPublicTicketRateType,
} from "@/store/api/promoters/promoters.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

type TOption = {
  label: string;
  value: number;
};

export interface ICreatePromoterFormValues {
  phoneNumber: string;
  promoter?: TPromoter;
  isSubmitted?: boolean;
  selectedEvent?: IOption<TOption>[] | TNullish;
  permissions?: TGuestListType[];
  publicRatePerTicketSold?: number;
  publicTicketRateType?: TPublicTicketRateType;
  ratePerPrivateGuestListEntry?: number;
  status?: TCheckInvitationStatus;
}

export interface IGuestListPermissionProps {
  label: string;
  value: TGuestListType;
}
