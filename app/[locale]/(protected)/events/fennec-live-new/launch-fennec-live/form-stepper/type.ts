import type { TChallenge } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TPromotion } from "@/store/api/promotion/promotion.types";

import type { TEventDetailsInputs } from "./steps/step-one/types";

export type IStepFormInputs = {
  eventDetails: TEventDetailsInputs;
  table: void;
  challenges: TChallenge[] | TNullish;
  promotions: TPromotion[] | TNullish;
};
