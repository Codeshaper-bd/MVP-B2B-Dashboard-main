import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Create Support Tickets Start
|--------------------------------------------------
*/

export enum ESupportTicketSubjectType {
  BILLING_ISSUES = "BILLING_ISSUES",
  TECHNICAL_SUPPORT = "TECHNICAL_SUPPORT",
  ACCOUNT_MANAGEMENT = "ACCOUNT_MANAGEMENT",
  EVENT_MANAGEMENT = "EVENT_MANAGEMENT",
  OTHER = "OTHER",
}

export type TSupportTicketSubjectType = `${ESupportTicketSubjectType}`;

export enum ESupportTicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export type TSupportTicketPriority = `${ESupportTicketPriority}`;

export enum ESupportTicketType {
  QUESTION = "QUESTION",
  INCIDENT = "INCIDENT",
  PROBLEM = "PROBLEM",
  REFUND = "REFUND",
}

export type TSupportTicketType = `${ESupportTicketType}`;

export type TCreateSupportTicketsArgs = {
  description: string;
  subject: TSupportTicketSubjectType;
  priority: TSupportTicketPriority;
  type: TSupportTicketType;
  tags: string[];
  media?: TLinkAMediaToAModuleArgs[];
};

export type TSupportTickets = Omit<TCreateSupportTicketsArgs, "media"> & {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  createdBy: TIdOrSlugOrIdentifier<"id">["id"];
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  deletedAt: string | TNullish;
  media?: TMedia[] | TNullish;
};

export type TCreateSupportTicketsRes = TApiResponse<TSupportTickets>;

/**
|--------------------------------------------------
| Create Support Tickets End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Support Tickets Start
|--------------------------------------------------
*/
export type TGetAllSupportTicketsArgs = TPaginationArgs<TSupportTickets>;

export type TGetAllSupportTicketsRes = TApiResponse<TSupportTickets[]>;

/**
|--------------------------------------------------
| Get All Support Tickets End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Support Tickets Start
|--------------------------------------------------
*/
export type TGetASupportTicketsArgs = TIdOrSlugOrIdentifier<"id">;

export type TGetASupportTicketsRes = TApiResponse<TSupportTickets>;
/**
|--------------------------------------------------
| Get A Support Tickets End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
