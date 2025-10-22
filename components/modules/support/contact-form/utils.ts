import type { TNullish } from "@/store/api/common-api-types";
import type {
  TCreateSupportTicketsArgs,
  TSupportTicketSubjectType,
  TSupportTicketType,
} from "@/store/api/support-tickets/support-tickets.types";

// subject options
export type TSubjectOptionsType = {
  label: string;
  value: TSupportTicketSubjectType;
};

export const subjectOptions: TSubjectOptionsType[] = [
  { label: "Billing Issues", value: "BILLING_ISSUES" },
  { label: "Technical Support", value: "TECHNICAL_SUPPORT" },
  { label: "Account Management", value: "ACCOUNT_MANAGEMENT" },
  { label: "Event Management", value: "EVENT_MANAGEMENT" },
  // { label: "Other", value: "OTHER" },
];

// support ticket type
export type TSupportTicketTypeOptions = {
  label: string;
  value: TSupportTicketType;
};

export const supportTicketTypeOptions: TSupportTicketTypeOptions[] = [
  { label: "Questions", value: "QUESTION" },
  { label: "Incidents", value: "INCIDENT" },
  { label: "Problems", value: "PROBLEM" },
  { label: "Refunds", value: "REFUND" },
];

// feedback type

export type TFeedbackOption = { value: string; label: string };
export const feedbackType: TFeedbackOption[] = [
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "neutral", label: "Neutral" },
];

// tag options
export type TTagOptions = {
  label: string;
  value: string;
};

export const tagOptions: TTagOptions[] = [
  { value: "urgent", label: "Urgent" },
  { value: "payment", label: "Payment" },
];

export type TContactFormInputs = Omit<
  TCreateSupportTicketsArgs,
  "media" | "tags" | "organizationId"
> & {
  images?: File[] | TNullish;
  tags: { value: string }[];
};
export const initialContactFormInputs: TContactFormInputs = {
  description: "",
  priority: "LOW",
  subject: "BILLING_ISSUES",
  type: "QUESTION",
  tags: [],
  images: null,
};
