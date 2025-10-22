import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";

export enum ETodoStatus {
  COMPLETED = "COMPLETED",
  NOT_COMPLETED = "NOT_COMPLETED",
}

export type TTodoStatus = `${ETodoStatus}`;

export enum ERecurringType {
  ONE_TIME = "ONE_TIME",
  EVERY_DAY = "EVERY_DAY",
  EVERY_WEEK = "EVERY_WEEK",
  EVERY_MONTH = "EVERY_MONTH",
}

export type TERecurringType = `${ERecurringType}`;

/**
|--------------------------------------------------
| Create Todo Start
|--------------------------------------------------
*/

export type TTag = string;

export type TCreateTodoArgs = {
  title: string;
  description?: string;
  status: TTodoStatus;
  tags?: TTag[];
  dueDate: string;
  priority: boolean;
};

export type TTodo = TCreateTodoArgs & {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | TNullish;
};

export type TCreateTodoRes = TApiResponse<TTodo>;
/**
|--------------------------------------------------
| Create Todo End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Todo Start
|--------------------------------------------------
*/
export type TGetAllTodoArgs = TPaginationArgs<
  TTodo,
  {
    status?: TTodoStatus;
    tags?: string;
    startDate?: string;
    endDate?: string;
  }
>;

export type TGetAllTodoRes = TApiResponse<TTodo[]>;

/**
|--------------------------------------------------
| Get All Todo End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Todo Tags Start
|--------------------------------------------------
*/
export type TGetAllTodoTagsArgs = undefined | void;

export type TGetAllTodoTagsRes = TApiResponse<string[]>;

/**
|--------------------------------------------------
| Get All Todo Tags End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Todo By Id Start
|--------------------------------------------------
*/
export type TGetATodoArgs = TIdOrSlugOrIdentifier<"slug">;

export type TGetATodoRes = TApiResponse<TTodo>;
/**
|--------------------------------------------------
| Get A Todo By Id End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update Todo Start
|--------------------------------------------------
*/
export type TUpdateATodoArgs = TUpdateOptionalArgs<TCreateTodoArgs, "slug">;

export type TUpdateATodoRes = TApiResponse<TTodo>;
/**
|--------------------------------------------------
| Update Todo End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Todo Start
|--------------------------------------------------
*/
export type TDeleteATodoArgs = TUpdateOptionalArgs<TTodo, "slug">;

export type TDeleteATodoRes = TApiResponse<null>;
/**
|--------------------------------------------------
| Delete Todo End
|--------------------------------------------------
*/
