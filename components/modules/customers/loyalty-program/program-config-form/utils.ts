import type {
  TCreateLoyaltyProgramArgs,
  TRewardType,
  TStreakType,
} from "@/store/api/loyalty-program/loyalty-program.types";
import type { IRadioProps } from "@/components/CustomRadioGroup/Radio";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

export type TLoyaltyProgramFormInput = TCreateLoyaltyProgramArgs;

export const initialLoyaltyFormValues: TLoyaltyProgramFormInput = {
  enabled: false,
  emailNotificationEnabled: false,
  pointsPerSpent: 0,
  rewardType: "DOLLAR",
  rewardValue: 0,
  redemptionType: "CONTINUOUS",
  notificationPoint: undefined,
  streakType: "DAY",
  streakValue: undefined,
  streakReward: undefined,
  redemptionThresholds: undefined,
};

export const enabledOptions: IRadioProps[] = [
  {
    label: "yes",
    value: "yes",
    radioProps: {
      mode: "label-left",
      textSize: "16px",
    },
  },
  {
    label: "no",
    value: "no",
    radioProps: {
      mode: "label-left",
      textSize: "16px",
    },
  },
];

type TRewardTypeOptions = Omit<IOption, "value"> & {
  value: TRewardType;
};

export const rewardTypeOptions: TRewardTypeOptions[] = [
  {
    label: "Dollar",
    value: "DOLLAR",
  },
  {
    label: "Promotion",
    value: "PROMOTION",
  },
];

type TStreakTypeOption = Omit<IOption, "value"> & {
  value: TStreakType;
};

export const streakOptions: TStreakTypeOption[] = [
  { label: "Day", value: "DAY" },
  { label: "Weeks", value: "WEEK" },
  { label: "Month", value: "MONTH" },
  { label: "Year", value: "YEAR" },
];
