import type { TUnit } from "@/store/api/bar-menu-item/bar-menu-item.types";

import type { TSelectOption } from "./types";

export const volumeUnitOptions: TSelectOption<TUnit>[] = [
  {
    label: "oz",
    value: "oz",
  },
  {
    label: "ml",
    value: "ml",
  },
  {
    label: "g",
    value: "g",
  },
];
