export type TReviewStep = {
  dateTime: Date | string;
  name: string;
  formDataOption: "postNow" | "schedulePost" | "saveAsDraft";
};
