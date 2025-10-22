import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
} from "../common-api-types";

/**
|--------------------------------------------------
| Get A Transactions Start
|--------------------------------------------------
*/

export type TGetAStripePaymentStatusArgs = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
};
enum PaymentIntentStatus {
  REQUIRES_PAYMENT_METHOD = "requires_payment_method",
  REQUIRES_CONFIRMATION = "requires_confirmation",
  REQUIRES_ACTION = "requires_action",
  PROCESSING = "processing",
  SUCCEEDED = "succeeded",
  CANCELED = "canceled",
  FAILED = "failed",
}
export type TPaymentIntentStatus = `${PaymentIntentStatus}`;
export type TRefundSummery = {
  total_captured: number | TNullish;
  total_refunded: number | TNullish;
  refundable_remaining: number | TNullish;
  currency: string | TNullish;
  is_fully_refunded: boolean | TNullish;
  is_partially_refunded: boolean | TNullish;
  refunds: [
    {
      id: string | TNullish;
      amount: number | TNullish;
      currency: string | TNullish;
      status: string | TNullish;
      created: number | TNullish;
      charge: string | TNullish;
      reason: null;
    },
  ];
};
export type TGetAStripePaymentStatus = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  status: TPaymentIntentStatus;
  refund_summary: TRefundSummery | TNullish;
};
export type TGetAStripePaymentStatusRes =
  TApiResponse<TGetAStripePaymentStatus>;
/**
|--------------------------------------------------
| Get A Transactions End
|--------------------------------------------------
*/
