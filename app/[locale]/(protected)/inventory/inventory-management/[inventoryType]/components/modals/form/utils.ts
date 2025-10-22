import type { TSoldBy } from "@/store/api/inventory-item/inventory-item.types";

import type { TCreateShipmentFormInput } from "./types";

export type TSoldByFilter = TSoldBy | "All";
type TSoldByFilterOption = {
  label: string;
  value: TSoldByFilter;
};
export const soldByFilters: TSoldByFilterOption[] = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Volume",
    value: "VOLUME",
  },
  {
    label: "Unit",
    value: "UNIT",
  },
];

export const initialFormState: TCreateShipmentFormInput = {
  soldBy: "VOLUME",
  casesReceived: 1,
  unitReceived: 1,
  price: 0,
  shipments: [
    {
      currentStock: 0,
      unitReceived: 0,
      casesReceived: 0,
      unitPerCase: 0,
      price: 0,
    },
  ],
};
