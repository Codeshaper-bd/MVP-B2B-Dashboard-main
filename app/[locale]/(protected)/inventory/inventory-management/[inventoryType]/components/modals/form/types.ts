import type { TSoldBy } from "@/store/api/inventory-item/inventory-item.types";

export type TCreateShipmentFormInput = {
  soldBy?: TSoldBy;
  currentStock?: number;
  unitReceived: number;
  casesReceived: number;
  unitPerCase?: number;
  price: number;
  shipments: {
    selectedChildItemId?: number;
    currentStock?: number;
    unitReceived: number;
    casesReceived: number;
    unitPerCase?: number;
    price: number;
  }[];
};
