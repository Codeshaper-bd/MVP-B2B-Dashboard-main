import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { TVenue } from "../venues/venues.types";

/**
|--------------------------------------------------
| Get All Transactions Start
|--------------------------------------------------
*/

export enum ETransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export type TTransactionStatus = `${ETransactionStatus}`;

export type TTransaction = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  transactionNumber: string | TNullish;
  customerName: string | TNullish;
  eventName: string | TNullish;
  eventSlug: string | TNullish;
  eventVenue: string | TNullish;
  eventStartTime: string | TNullish;
  eventEndTime: string | TNullish;
  transactionTime: string | TNullish;
  amount: number | TNullish;
  paymentStatus: TTransactionStatus;
  orderId: TIdOrSlugOrIdentifier<"id">["id"];
  organizationName: string | TNullish;
  gatewayReferenceId: string | TNullish;
};

export type TGetAllTransactionsArgs = TPaginationArgs<
  TTransaction,
  {
    customerName?: string;
    paymentStatus?: TTransactionStatus;
    fromDate?: string;
    toDate?: string;
    eventSlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  }
>;

export type TGetAllTransactionsRes = TApiResponse<TTransaction[]>;

/**
|--------------------------------------------------
| Get All Transactions End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Transactions Start
|--------------------------------------------------
*/

export type TTransactionEvent = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  slug: string | TNullish;
  startTime: string | TNullish;
  endTime: string | TNullish;
  venue: TVenue;
};
export type TTransactionPurchaseListItem = {
  id: number | TNullish;
  name: string | TNullish;
  quantity: number | TNullish;
  price: string | TNullish;
  orderName: string | TNullish;
};
export type TTransactionPaymentDetails = {
  subTotal: number | TNullish;
  tax: number | TNullish;
  serviceFee: number | TNullish;
  transactionFee: number | TNullish;
  fees: number | TNullish;
  tip: number | TNullish;
  discount: number | TNullish;
  total: number | TNullish;
  pointsDiscount: number | TNullish;
  clubPoints: number | TNullish;
  paymentMethod: string | TNullish;
  discount_formate: string | TNullish;
};
export type TTransactionDetails = TTransaction & {
  createdAt: string | TNullish;
  event: TTransactionEvent;
  eventName: string | TNullish;
  organizationName: string | TNullish;
  transactionDetails: string | TNullish;
  purchaseList: TTransactionPurchaseListItem[] | TNullish;
  discountAmount: number | TNullish;
  points: number | TNullish;
  paymentDetails: TTransactionPaymentDetails;
  gatewayName: string | TNullish;
};
export type TGetATransactionsArgs = {
  transactionId: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TGetATransactionsRes = TApiResponse<TTransactionDetails>;
/**
|--------------------------------------------------
| Get A Transactions End
|--------------------------------------------------
*/
