import type { IOption } from "@/components/SelectInput/DropDown/Option";
import type { TTabOption } from "@/components/tab-card";

export type TTabValue = "alcohol" | "non-alcoholic";
export type TTabState = {
  tab?: TTabValue;
  soldBy?: "VOLUME" | "UNIT";
};

export const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Alcohol",
    value: "alcohol",
  },
  {
    label: "Non Alcoholic",
    value: "non-alcoholic",
  },
];

export const soldByOptions: IOption[] = [
  { value: "ALL", label: "All" },
  { value: "VOLUME", label: "Volume" },
  { value: "UNIT", label: "Unit" },
];
