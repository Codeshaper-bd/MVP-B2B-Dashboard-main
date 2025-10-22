import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TUpdateOptionalArgs,
} from "../common-api-types";

/**
|--------------------------------------------------
| Create Bank Details Start
|--------------------------------------------------
*/

export type TCreateBankDetailsArgs = {
  bankAccountNumber: string;
  transitNumber: string;
  institutionNumber: string;
  email: string;
  bankName: string;
  country: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
};

export type TBank = TCreateBankDetailsArgs & {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  createdBy?: number;
  updatedBy?: number;
};

export type TCreateBankDetailsRes = TApiResponse<TBank>;

/**
|--------------------------------------------------
| Create Bank Details End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Bank Details Start
|--------------------------------------------------
*/
export type TGetAllBankDetailsArgs = void;
export type TGetBankDetails = TCreateBankDetailsArgs & {
  id: number;
  organizationId: number;
};

export type TGetAllBankDetailsRes = TApiResponse<TGetBankDetails[]>;

/**
|--------------------------------------------------
| Get All Bank Details End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get A Bank Details Start
|--------------------------------------------------
*/
export type TGetABankDetailsArgs = TIdOrSlugOrIdentifier<"id">;

export type TGetABankDetailsRes = TApiResponse<TGetBankDetails>;

/**
|--------------------------------------------------
| Get A Bank Details End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update Bank Details Start
|--------------------------------------------------
*/
/* export type TUpdateBankDetailsArgs = {
  id?: TIdOrSlugOrIdentifier<"id">["id"];
}; */

export type TUpdateBankDetailsArgs = TUpdateOptionalArgs<
  TCreateBankDetailsArgs,
  "id"
>;

export type TUpdateBankDetailsRes = TApiResponse<TBank>;

/**
|--------------------------------------------------
| Update Bank Details End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete An AddOn Start
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete An AddOn End
|--------------------------------------------------
*/
