import type { TNullish } from "@/store/api/common-api-types";
export type TFeedbackOption = { value: string; label: string };

export type IFeedbackFilterFormType = {
  feedbackType?: TFeedbackOption[] | TNullish;
  rating?: string | TNullish;
  startDate?: Date | TNullish;
  endDate?: Date | TNullish;
};

export const feedbackType: TFeedbackOption[] = [
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "neutral", label: "Neutral" },
];
