import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TStatus,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateAVenueMutation,
  useDeleteAVenueMutation,
  useUpdateAVenueMutation,
} from "./venues-api";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Create Venue Start
|--------------------------------------------------
*/

export type TCreateVenueArgs = {
  status?: TStatus;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  isPrimary?: boolean;
  media?: TLinkAMediaToAModuleArgs[];
};

export type TVenue = Omit<TCreateVenueArgs, "media"> & {
  slug: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  media: TMedia[] | TNullish;
};

export type TCreateVenueRes = TApiResponse<TVenue>;

export type TCreateAVenueMutation = ReturnType<
  typeof useCreateAVenueMutation
>[0];

/**
|--------------------------------------------------
| Create Venue End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Venues Start
|--------------------------------------------------
*/
export type TGetAllVenueArgs = TPaginationArgs<
  TVenue,
  {
    isPrimary?: boolean;
  }
>;

export type TGetAllVenueRes = TApiResponse<TVenue[]>;

/**
|--------------------------------------------------
| Get All Venues End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Venue Start
|--------------------------------------------------
*/
export type TGetAVenueArgs = TIdOrSlugOrIdentifier<"slug">;

export type TGetAVenueRes = TApiResponse<TVenue>;
/**
|--------------------------------------------------
| Get A Venue End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A Venue Start
|--------------------------------------------------
*/
export type TUpdateAVenueArgs = TUpdateOptionalArgs<TCreateVenueArgs, "slug">;

export type TUpdateAVenueRes = TApiResponse<TVenue>;

export type TUpdateAVenueMutation = ReturnType<
  typeof useUpdateAVenueMutation
>[0];
/**
|--------------------------------------------------
| Update A Venue End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Venue Start
|--------------------------------------------------
*/
export type TDeleteAVenueArgs = TIdOrSlugOrIdentifier<"slug">;

export type TDeleteAVenueRes = TApiResponse<null>;

export type TDeleteAVenueMutation = ReturnType<
  typeof useDeleteAVenueMutation
>[0];
/**
|--------------------------------------------------
| Delete Venue End
|--------------------------------------------------
*/
