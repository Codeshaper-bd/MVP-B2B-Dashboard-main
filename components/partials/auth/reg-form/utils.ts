import type { TUserSubscriptionPlan } from "@/store/api/auth/auth.types";

type TSubscriptionOptions = {
  label: string;
  value: TUserSubscriptionPlan;
};
export const subscriptionOptions: TSubscriptionOptions[] = [
  {
    label: "Night Club",
    value: "NIGHT_CLUB",
  },
  {
    label: "Event Company",
    value: "EVENT_COMPANY",
  },
];
