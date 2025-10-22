import type { TFormInputs, TGroupOptionType } from "./types";

export const initialState: TFormInputs = {
  title: "",
  description: "",
  dueDate: null,
  status: "NOT_COMPLETED",
  tags: [],
  priority: false,
};

export const tagOptions: TGroupOptionType[] = [
  {
    label: "Priority",
    options: [
      { value: "buy", label: "Buy" },
      { value: "compareEvents", label: "Compare Events" },
      { value: "drink", label: "Drink" },
      { value: "tickets", label: "Tickets" },
      { value: "challenge", label: "Challenge" },
      { value: "food", label: "Food" },
    ],
  },
];
