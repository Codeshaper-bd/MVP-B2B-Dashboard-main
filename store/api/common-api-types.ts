export type TNullish = null | undefined;

export type TPagination = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export type TApiResponse<
  T extends
    | Record<string, unknown>
    | Array<Record<string, unknown>>
    | Array<string>
    | Array<number>
    | null
    | undefined = null,
> =
  | {
      success: boolean;
      message: string;
      data: T | TNullish;
      statusCode: number;
      pagination: TPagination | undefined;
    }
  | TNullish;

export type TIdOrSlugOrIdentifier<
  TChooseIdOrSlug extends "id" | "slug" | "identifier" = "id",
> = TChooseIdOrSlug extends "id"
  ? { id: number | string | TNullish }
  : TChooseIdOrSlug extends "slug"
    ? { slug: string | TNullish }
    : { identifier: string | TNullish };

export type TUpdateOptionalArgs<
  TUpdateSchema extends Record<string, unknown> | null | undefined,
  TChooseIdOrSlug extends "id" | "slug" | "identifier" = "id",
> = {
  body: Partial<TUpdateSchema>;
} & TIdOrSlugOrIdentifier<TChooseIdOrSlug>;

export type TErrorResponse = {
  success: boolean;
  message: string;
  error: string;
  statusCode: number;
};

export enum ESortOrder {
  ASC = "asc",
  DESC = "desc",
}

export type TSortOrder = `${ESortOrder}`;

export enum EStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export type TStatus = `${EStatus}`;

export enum EGender {
  Male = "male",
  Female = "female",
  Unisex = "unisex",
  Not_Specified = "NOT_SPECIFIED",
}
export type TGender = `${EGender}`;

export type TSortArgs<
  TSingleObjectOfResponseType extends Record<string, unknown> | void = void,
> =
  TSingleObjectOfResponseType extends Record<string, unknown>
    ? { sortBy?: keyof TSingleObjectOfResponseType; sortOrder?: TSortOrder }
    : Record<string, unknown>;

export type TPaginationArgs<
  TSingleObjectOfResponseType extends Record<string, unknown> | void = void,
  TExtraFilteringArgs extends Record<string, unknown> = Record<string, unknown>,
> =
  | ({
      page?: number | string;
      pageSize?: number | string;
      search?: string;
    } & TSortArgs<TSingleObjectOfResponseType> &
      TExtraFilteringArgs)
  | undefined
  | void;

export type TApiErrorResponse = {
  success: boolean;
  message?: string;
  errors?:
    | {
        message?: string;
      }[]
    | string;
  statusCode: number;
};

// time range

export enum ETimeRange {
  TwelveHours = "12h",
  TwentyFourHours = "24h",
  SevenDays = "7d",
  ThirtyDays = "30d",
  ThreeMonths = "3m",
  SixMonths = "6m",
  OneYear = "1y",
  AllTime = "all",
  Custom = "custom",
}
export type TTimeRange = `${ETimeRange}`;
