import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TStatus,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateALinkTrackingMutation,
  useDeleteALinkTrackingMutation,
  useUpdateALinkTrackingMutation,
} from "./link-tracking-api";
import type { TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Create LinkTracking Start
|--------------------------------------------------
*/

export enum ELinkTrackingType {
  EMPLOYEE = "EMPLOYEE",
  NON_EMPLOYEE = "NON_EMPLOYEE",
}

export type TLinkTrackingType = `${ELinkTrackingType}`;

export type TPromoterArgs =
  | {
      type: `${ELinkTrackingType.EMPLOYEE}`;
      promoterId: number;
    }
  | {
      type: `${ELinkTrackingType.NON_EMPLOYEE}`;
      promoterId?: number;
    };

export type TCreateLinkTrackingArgs = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  status?: TStatus;
} & TPromoterArgs;

export type TPromoter = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string;
  email: string;
  phone: string;
  media: TMedia[] | TNullish;
};

export type TLinkTracking = Omit<TCreateLinkTrackingArgs, "promoterId"> & {
  id: number;
  identifier: TIdOrSlugOrIdentifier<"identifier">["identifier"];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  promoter: TPromoter | null;
  displayShortURL?: string;
  displayLongURL?: string;
};

export type TCreateLinkTrackingRes = TApiResponse<TLinkTracking>;

export type TCreateALinkTrackingMutation = ReturnType<
  typeof useCreateALinkTrackingMutation
>[0];

/**
|--------------------------------------------------
| Create LinkTracking End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All LinkTracking Start
|--------------------------------------------------
*/
export type TGetAllLinkTrackingArgs = TPaginationArgs<
  TLinkTracking,
  {
    eventId?: TIdOrSlugOrIdentifier["id"];
    promoterId?: TIdOrSlugOrIdentifier;
    status?: TStatus;
  }
>;

export type TGetAllLinkTrackingRes = TApiResponse<TLinkTracking[]>;

/**
|--------------------------------------------------
| Get All LinkTracking End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A LinkTracking Start
|--------------------------------------------------
*/
export type TGetALinkTrackingArgs = TIdOrSlugOrIdentifier<"identifier">;

export type TGetALinkTrackingRes = TApiResponse<TLinkTracking>;
/**
|--------------------------------------------------
| Get A LinkTracking End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A LinkTracking Start
|--------------------------------------------------
*/
export type TUpdateALinkTrackingArgs = TUpdateOptionalArgs<
  TCreateLinkTrackingArgs,
  "identifier"
>;

export type TUpdateALinkTrackingRes = TApiResponse<TLinkTracking>;

export type TUpdateALinkTrackingMutation = ReturnType<
  typeof useUpdateALinkTrackingMutation
>[0];
/**
|--------------------------------------------------
| Update A LinkTracking End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete LinkTracking Start
|--------------------------------------------------
*/
export type TDeleteALinkTrackingArgs = TIdOrSlugOrIdentifier<"identifier">;

export type TDeleteALinkTrackingRes = TApiResponse<null>;

export type TDeleteALinkTrackingMutation = ReturnType<
  typeof useDeleteALinkTrackingMutation
>[0];
/**
|--------------------------------------------------
| Delete LinkTracking End
|--------------------------------------------------
*/
