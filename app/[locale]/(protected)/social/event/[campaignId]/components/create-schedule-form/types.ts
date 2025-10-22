// import { TDescribeYourEventStep } from "./Steps/DescribeYourEventStep/types";
// import { TGeneralInformationStep } from "./Steps/GeneralInformationStep/types";
// import { TGeneratedImagesStep } from "./Steps/GeneratedImagesStep/types";
// import { TReviewStep } from "./Steps/ReviewStep/types";

export type TAddTextStep = {
  text: string;
};

export type StepperItemProps = {
  label: string;
  icon: React.ReactNode;
};

export type TInitialState = {
  // generalInformation: TGeneralInformationStep | undefined | null;
  // describeYourEvent: TDescribeYourEventStep | undefined | null;
  // generatedImages: TGeneratedImagesStep | undefined | null;
  // addText: TAddTextStep | undefined | null;
  // review: TReviewStep | undefined | null;
};
