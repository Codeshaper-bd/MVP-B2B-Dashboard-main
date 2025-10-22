import type { TNullish } from "@/store/api/common-api-types";
import type { TPaymentIntentStatus } from "@/store/api/stripe/stripe.types";
import type { TTransactionStatus } from "@/store/api/transactions/transactions.types";

export const getStatusColors = (status: string | TNullish) => {
  if (!status) {
    return "statusDefault";
  }

  const statusText = status.toLowerCase();

  switch (statusText) {
    case "admin":
    case "bar":
      return "statusIndigo";
    case "guestlist":
    case "promoter":
      return "statusBlue";
    case "employee":
    case "bar tender":
    case "bartender":
      return "statusBlue";
    case "customer":
      return "statusGreen";
    case "published":
      return "statusGreen";
    case "inactive":
      return "statusError";
    case "pending":
    case "coatcheck":
    case "coat check":
      return "statusYellow";
    case "scheduled":
    case "vip host":
      return "statusOrange";
    default:
      return "statusDefault";
  }
};

export const getFeedbackColors = (status: string | TNullish) => {
  let statusColor;
  const statusText = status?.toLowerCase();
  if (statusText === "positive") {
    statusColor = "statusGreen";
  } else if (statusText === "negative") {
    statusColor = "statusError";
  } else {
    statusColor = "statusDefault";
  }
  return statusColor;
};

export const getTagsColors = (status: string | TNullish) => {
  let statusColor;
  const statusText = status?.toLowerCase();
  if (statusText === "urgent") {
    statusColor = "statusError";
  } else if (statusText === "payment") {
    statusColor = "statusGreen";
  } else {
    statusColor = "statusDefault";
  }
  return statusColor;
};

export const getRefundStatusColor = (status?: string) => {
  if (!status) {
    return "statusDefault";
  }
  const statusText = status?.toLowerCase();
  switch (statusText) {
    case "pending":
    case "refunded":
      return "statusYellow";
    case "accepted":
    case "approved":
    case "paid":
    case "active":
    case "completed":
      return "statusGreen";
    case "rejected":
    case "declined":
    case "failed":
    case "cancelled":
    case "inactive":
      return "statusError";
    case "partially paid":
      return "statusIndigo";
    case "overdue":
      return "statusOrange";

    default:
      return "statusDefault";
  }
};
export const getGendersColor = (status: string) => {
  switch (status) {
    case "male":
      return "statusIndigo";
    default:
      return "statusError";
  }
};
export const getResponseTypeStatusColor = (status: string) => {
  switch (status) {
    case "dynamic value":
      return "statusIndigo";
    default:
      return "statusError";
  }
};

export const getRecurringColor = (status: string) => {
  if (!status) {
    return "statusDefault";
  }
  const statusToLowerCase = status.toLowerCase();
  switch (statusToLowerCase) {
    case "one time":
      return "statusPink";
    case "every day":
      return "statusOrange";
    case "every week":
      return "statusIndigo";
    default:
      return "statusError";
  }
};
export const getEmployeeStatusColor = (status: string | TNullish) => {
  if (!status) {
    return "statusDefault";
  }
  const statusToLowerCase = status.toLowerCase();
  switch (statusToLowerCase) {
    case "checked in":
      return "statusGreen";
    case "not checked in":
      return "statusError";
    case "admin":
    case "co-admin":
    case "bar":
      return "statusIndigo";
    case "guestlist":
    case "promoter":
      return "statusBlue";
    case "employee":
      return "statusBlue";
    case "bar tender":
    case "bartender":
      return "mulberryRose";
    case "customer":
      return "statusGreen";
    case "published":
      return "statusGreen";
    case "inactive":
      return "statusError";
    case "pending":
    case "coatcheck":
    case "coat check":
      return "statusYellow";
    case "scheduled":
    case "vip host":
      return "statusOrange";
    default:
      return "statusDefault";
  }
};

export const getChallengeStatusColor = (status: string) => {
  if (!status) {
    return "statusDefault";
  }
  const statusToLowerCase = status.toLowerCase();
  switch (statusToLowerCase) {
    case "active":
      return "statusGreen";
    case "inactive":
      return "statusError";
    default:
      return "statusDefault";
  }
};
export const getPaymentStatusColor = (
  status: TTransactionStatus | TNullish,
) => {
  if (!status) {
    return "statusDefault";
  }
  const statusToLowerCase = status.toLowerCase();
  switch (statusToLowerCase) {
    case "pending":
      return "statusYellow";
    case "completed":
      return "statusGreen";
    case "failed":
      return "statusError";
    default:
      return "statusDefault";
  }
};

export const getStripeStatusColor = (
  status: TPaymentIntentStatus | "Refunded" | "Partially Refunded" | TNullish,
) => {
  if (!status) {
    return "statusDefault";
  }
  const statusToLowerCase = status.toLowerCase();
  switch (statusToLowerCase) {
    case "succeeded":
      return "statusGreen";
    case "failed":
    case "canceled":
    case "refunded":
      return "statusError";
    case "processing":
      return "statusYellow";
    default:
      return "statusDefault";
  }
};
