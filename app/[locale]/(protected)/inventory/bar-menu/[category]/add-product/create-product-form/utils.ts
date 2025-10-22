import type { TBarMenuItemFormType, TBarMenuItemTypeOption } from "./types";

export const initialValues: TBarMenuItemFormType = {
  name: "",
  subTitle: "",
  description: "",
  volume: 0,
  type: undefined,
  unit: undefined,
  price: 0,
  isSaleable: false,
  status: undefined,
  media: null,
  ingredients: [],
  alcoholicIngredientCheck: undefined,
};

export const productTypeOptions: TBarMenuItemTypeOption[] = [
  {
    label: "Alcoholic",
    value: "ALCOHOLIC",
  },
  {
    label: "Non-Alcoholic",
    value: "NON_ALCOHOLIC",
  },
];

/* static data need to remove start */
export const discountDummyData = {
  id: 1,
  title: "MANTA MANTAP",
  totalDiscount: "$20",
  duration: "2 hours",
  remainingDuration: "02:00:00 ( will be valid after saving )",
};

export const challengeDummyData = {
  id: 1,
  title: "Spent more than 100 dollars",
  points: "200",
  duration: "No time limit",
  description: "Lorem Ipsum dolor sit amet",
};
/* static data need to remove end */
