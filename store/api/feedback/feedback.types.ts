import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type { TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Create Feedback Start
|--------------------------------------------------
*/

export type TFeedbackRating = 1 | 2 | 3 | 4 | 5;
export type TFeedbackReviewer = {
  id: number;
  name: string | TNullish;
  email: string | TNullish;
  phone: string | TNullish;
  media: TMedia | TNullish;
};
export type TFeedbackEvent = {
  id: number;
  name: string | TNullish;
  slug: string | TNullish;
  description: string | TNullish;
};

export type TFeedbackUser = {
  id: number;
  name: string | TNullish;
  email: string | TNullish;
  phone: string | TNullish;
  media: TMedia[] | TNullish;
};

export type TFeedbackReplies = {
  id: number;
  feedbackId: number;
  reply?: string | TNullish;
  parentReplyId?: number | TNullish;
  createdAt: string;
  updatedAt: string;
  user?: TFeedbackUser;
};

export type TCreateFeedbackArgs = {
  eventId: TIdOrSlugOrIdentifier["id"];
  rating: TFeedbackRating;
  comments?: string | TNullish;
};

export type TFeedback = TCreateFeedbackArgs & {
  id: number;
  source: string | TNullish;
  comments: string | TNullish;
  reviewer: TFeedbackReviewer;
  event: TFeedbackEvent;
  replies: TFeedbackReplies[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type TCreateFeedbackRes = TApiResponse<TFeedback>;

/**
|--------------------------------------------------
| Create Feedback End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Create Feedback Reply Start
|--------------------------------------------------
*/

export type TCreateAFeedbackReplyArgs = {
  feedbackId: TIdOrSlugOrIdentifier["id"];
  reply: string;
  parentReplyId?: number;
};
export type TCreateAFeedbackReplyRes = TApiResponse<TCreateAFeedbackReplyArgs>;

/**
|--------------------------------------------------
| Create Feedback Reply End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get All Feedback Start
|--------------------------------------------------
*/

export type TGetAllFeedbackArgs = TPaginationArgs<TFeedback> & {
  rating?: TFeedbackRating;
  startDate?: string;
  endDate?: string;
  sentiments?: string[];
};
export type TGetAllFeedbackRes = TApiResponse<TFeedback[]>;

/**
|--------------------------------------------------
| Get All Feedback End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Feedback Start
|--------------------------------------------------
*/

export type TGetAFeedbackArgs = TIdOrSlugOrIdentifier<"id">;

export type TGetAFeedbackRes = TApiResponse<TFeedback>;

/**
|--------------------------------------------------
| Get A Feedback End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A Feedback Start
|--------------------------------------------------
*/

export type TUpdateAFeedbackArgs = TUpdateOptionalArgs<
  TCreateFeedbackArgs,
  "id"
>;

export type TUpdateAFeedbackRes = TApiResponse<TFeedback>;

/**
|--------------------------------------------------
| Update A Feedback End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Feedback Reply Start
|--------------------------------------------------
*/

export type TUpdateAFeedbackReplyArgs = TUpdateOptionalArgs<
  TCreateAFeedbackReplyArgs,
  "id"
>;

export type TUpdateAFeedbackReplyRes = TApiResponse<TFeedbackReplies>;

/**
|--------------------------------------------------
| Update A Feedback Reply End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Feedback Start
|--------------------------------------------------
*/

export type TDeleteAFeedbackArgs = TIdOrSlugOrIdentifier<"id">;
export type TDeleteAFeedbackRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete Feedback End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Feedback Reply Start
|--------------------------------------------------
*/

export type TDeleteAFeedbackReplyArgs = TIdOrSlugOrIdentifier<"id">;
export type TDeleteAFeedbackReplyRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete Feedback Reply End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Feedback Overview Start
|--------------------------------------------------
*/

export type TFeedbackOverview = {
  totalFeedback: number | TNullish;
  averageRating: number | TNullish;
  positiveCount: number | TNullish;
  negativeCount: number | TNullish;
  neutralCount: number | TNullish;
  positivePercentage: number | TNullish;
  negativePercentage: number | TNullish;
  neutralPercentage: number | TNullish;
};
export type TGetFeedbackOverviewArgs = void;
export type TGetFeedbackOverviewRes = TApiResponse<TFeedbackOverview>;

/**
|--------------------------------------------------
| Get Feedback Overview End
|--------------------------------------------------
*/
