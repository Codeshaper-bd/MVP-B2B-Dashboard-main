import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type { useLazyGetAllEmployeeQuery } from "./employees-api";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

/**
 |--------------------------------------------------
 | Create Employee start
 |--------------------------------------------------
 */

export type TCreateEmployeeArgs = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status?: TEmployeeStatus;
  media?: TLinkAMediaToAModuleArgs;
  roles: number[];
  password: string;
  confirmPassword: string;
};

export type TEmployeeRole = {
  id: number | TNullish;
  name: string | TNullish;
};

export enum EEmployeeStatus {
  ACTIVE = "Active",
  Pending = "Pending",
}

export type TEmployeeStatus = `${EEmployeeStatus}`;
export type TEmployee = {
  id: number | TNullish;
  userId: number | TNullish;
  firstName: string | TNullish;
  lastName: string | TNullish;
  email: string | TNullish;
  phone: string | TNullish;
  status: TEmployeeStatus | TNullish;
  roles: TEmployeeRole[] | TNullish;
  media: TMedia | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  deletedAt: string | TNullish;
};

export type TCreateEmployeeRes = TApiResponse<TEmployee>;

/**
|--------------------------------------------------
| Create Employee end
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Employees Start
|--------------------------------------------------
*/

export type TGetAllEmployeesArgs = TPaginationArgs<
  TEmployee,
  {
    status?: TEmployeeStatus;
    role?: string;
  }
>;

export type TGetAllEmployeesRes = TApiResponse<TEmployee[]>;

export type TLazyGetAllEmployeeQuery = ReturnType<
  typeof useLazyGetAllEmployeeQuery
>[0];

/**
|--------------------------------------------------
| Get All Employees End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Employee Start
|--------------------------------------------------
*/

export type TGetAEmployeeArgs = TIdOrSlugOrIdentifier<"id">;
export type TGetAEmployeeRes = TApiResponse<TEmployee>;

/**
|--------------------------------------------------
| Get A Employee End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A Employee Start
|--------------------------------------------------
*/

export type TUpdateAEmployeeArgs = TUpdateOptionalArgs<
  TCreateEmployeeArgs,
  "id"
>;

export type TUpdateAEmployeeRes = TApiResponse<TEmployee>;

/**
|--------------------------------------------------
| Update A Employee End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Employee Start
|--------------------------------------------------
*/

export type TDeleteAEmployeeArgs = TIdOrSlugOrIdentifier<"id">;
export type TDeleteAEmployeeRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete Employee End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Employee Performance Start
|--------------------------------------------------
*/

export type TGetAnEmployeePerformance = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  userId: number | TNullish;
  firstName: string | TNullish;
  lastName: string | TNullish;
  email: string | TNullish;
  phone: string | TNullish;
  status: TEmployeeStatus | TNullish;
  roles: TEmployeeRole[] | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  deletedAt: string | TNullish;
  media: TMedia | TNullish;
};
export type TEmployeeTicketByTier = {
  tier: string | TNullish;
  count: number | TNullish;
};
export type TTicketsOverTime = {
  date: string | TNullish;
  count: number | TNullish;
};
export type TEmployeeGuestListMetrics = {
  category: string[] | TNullish;
  series: number[] | TNullish;
};
export type TEmployeePerformanceGuestList = {
  totalTicketsScanned: number | TNullish;
  lastTicketScanned: string | TNullish;
  ticketsByTier: number[] | TNullish;
  ticketsOverTime: TTicketsOverTime[] | TNullish;
  guestListMetrics: TEmployeeGuestListMetrics | TNullish;
};

export type TBartenderMetrics = {
  totalDrinksServed: number | TNullish;
  lastDrinkServed: string | TNullish;
  mostPopularDrink: string | TNullish;
  bartenderMetrics: TEmployeeGuestListMetrics | TNullish;
};
export type TPerformanceMetrics = {
  guestList: TEmployeePerformanceGuestList | TNullish;
  barTender: TBartenderMetrics | TNullish;
};
export type TGetAnEmployeePerformanceData = {
  employee: TGetAnEmployeePerformance | TNullish;
  performanceMetrics: TPerformanceMetrics | TNullish;
};

export type TGetAnEmployeePerformanceArgs = {
  employeeId: TIdOrSlugOrIdentifier<"id">["id"];
  eventId?: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TGetAnEmployeePerformanceRes =
  TApiResponse<TGetAnEmployeePerformanceData>;

/**
|--------------------------------------------------
| Get Employee Performance End
|--------------------------------------------------
*/
