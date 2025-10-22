import { useMemo } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import {
  getPaymentStatusColor,
  getStripeStatusColor,
} from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { TGetAStripePaymentStatus } from "@/store/api/stripe/stripe.types";
import type { TTransactionDetails } from "@/store/api/transactions/transactions.types";
import { Badge } from "@/components/ui/badge";

interface IModalContentProps {
  getATransactionData: TNullish | TTransactionDetails;
  getAStripePaymentStatusData: TNullish | TGetAStripePaymentStatus;
}
function ModalContent({
  getATransactionData,
  getAStripePaymentStatusData,
}: IModalContentProps) {
  const {
    id,
    customerName,
    eventName,
    event,
    transactionTime,
    paymentStatus,
    amount,
    transactionNumber,
    gatewayName,
    transactionDetails,
  } = getATransactionData || {};
  const { status, refund_summary } = getAStripePaymentStatusData || {};

  const { is_fully_refunded, is_partially_refunded } = refund_summary || {};
  const stripeStatus = useMemo(() => {
    if (is_fully_refunded) {
      return "Refunded";
    } else if (is_partially_refunded) {
      return "Partially Refunded";
    }
    return status;
  }, [is_fully_refunded, is_partially_refunded, status]);

  return (
    <div className="pt-5">
      <ul className="space-y-3 [&>li]:flex [&>li]:justify-between">
        <li>
          <span>Invoice Id</span>
          <span>{id}</span>
        </li>
        <li>
          <span>Event Name</span>
          <span>{eventName}</span>
        </li>
        <li>
          <span>Event Date</span>
          <span>
            {convertUTCToLocal({
              utcDateTime: event?.startTime,
              format: "DD/MM/YYYY",
            })}
          </span>
        </li>
        <li>
          <span>Transaction Number</span>
          <span>{transactionNumber}</span>
        </li>
        <li>
          <span>Transaction Details</span>
          <span>{transactionDetails}</span>
        </li>
        <li>
          <span>Order Status</span>
          <Badge className={getPaymentStatusColor(paymentStatus)}>
            {paymentStatus}
          </Badge>
        </li>
        <li>
          <span>Transaction Type</span>
          <Badge className={cn(amount ? "statusGreen" : "statusYellow")}>
            {amount ? "Paid" : "Free"}
          </Badge>
        </li>
        <li>
          <span>Amount</span>
          <span>
            $
            {convertToNumber({
              value: amount,
              digit: 2,
              fallback: 0,
            })}
          </span>
        </li>
        <li>
          <span>Gateway Name</span>
          <span>{gatewayName || "--"}</span>
        </li>
        <li>
          <span>Stripe Status</span>
          {status ? (
            <Badge className={getStripeStatusColor(stripeStatus)}>
              {stripeStatus}
            </Badge>
          ) : (
            "--"
          )}
        </li>
      </ul>
    </div>
  );
}

export default ModalContent;
