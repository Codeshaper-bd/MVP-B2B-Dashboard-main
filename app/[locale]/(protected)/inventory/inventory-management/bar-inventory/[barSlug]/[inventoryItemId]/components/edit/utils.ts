import { convertToNumber } from "@/lib/data-types/number";
import type {
  TTBarInventoryItemData,
  TUpdateBarInventoryPayload,
} from "@/store/api/bar-inventory/bar-inventory.types";
import type { TUnit } from "@/store/api/bar-menu-item/bar-menu-item.types";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TSoldBy,
  TInventoryItemType,
} from "@/store/api/inventory-item/inventory-item.types";
import type { TLinkAMediaToAModuleArgs } from "@/store/api/media/media.types";

import type { TBarInventoryFormType } from "./types";

export type TSelectOption<T extends string | number> = {
  label: string;
  value: T;
};

export const inventoryTypeOptions: TSelectOption<TInventoryItemType>[] = [
  {
    label: "Alcoholic",
    value: "ALCOHOLIC",
  },
  {
    label: "Non Alcoholic",
    value: "NON_ALCOHOLIC",
  },
];

export const soldByTypeOptions: TSelectOption<TSoldBy>[] = [
  {
    label: "Unit",
    value: "UNIT",
  },
  {
    label: "Volume",
    value: "VOLUME",
  },
];

export const volumeUnitOptions: TSelectOption<TUnit>[] = [
  {
    label: "oz",
    value: "oz",
  },
  {
    label: "ml",
    value: "ml",
  },
];

export const netWeightUnitOptions: TSelectOption<TUnit>[] = [
  {
    label: "g",
    value: "g",
  },
  {
    label: "oz",
    value: "oz",
  },
];

// Keep the original unitOptions for backward compatibility
export const unitOptions: TSelectOption<TUnit>[] = [
  {
    label: "oz",
    value: "oz",
  },
  {
    label: "ml",
    value: "ml",
  },
];
export const volumeOptions: TSelectOption<TUnit>[] = [
  {
    label: "oz",
    value: "oz",
  },
  {
    label: "g",
    value: "g",
  },
];

export interface TCreateInventoryAdjustmentInputs {
  barId?: number | null;
  items: {
    productId: number;
    quantity: number;
    perLevel?: number;
    adjustmentType: "increase" | "decrease";
  }[];
}

export const initialValues: TBarInventoryFormType = {
  name: "",
  categoryId: undefined as unknown as number,
  soldBy: "" as TSoldBy,
  type: "" as TInventoryItemType,
  status: "" as TBarInventoryFormType["status"],
  media: null,
  volumes: [],
};

export const transformApiDataToFormData = (
  apiData: TNullish | TTBarInventoryItemData,
): Omit<TBarInventoryFormType, "media"> => {
  if (!apiData) {
    return initialValues;
  }

  const formData: TBarInventoryFormType = {
    name: apiData.name,
    categoryId: apiData.categoryId ?? undefined,
    soldBy: apiData.soldBy,
    type: apiData.type,
    status: apiData.status,
    media: undefined,
    volumes:
      apiData?.children?.map((volume) => ({
        _id: volume.id,
        closedStock: volume?.currentStock,
        weightOfEmptyBottle: volume?.weightOfEmptyBottle,
        netWeight: volume?.netWeight,
        netWeightUnit: volume?.netWeightUnit,
        inventoryItemId: volume?.inventoryItemId,
        productCode: volume?.productCode ?? "",
        unit: volume?.unit ?? "",
        netWeightOfLiquid: volume?.netWeightOfLiquid ?? undefined,
        openStock: volume?.openingStock ?? undefined,
        pricePerUnit: volume?.pricePerUnit ?? undefined,
        threshold: volume?.threshold ?? 0,
        volume: volume?.volume ?? 0,
        currentStock: volume?.currentStock ?? 0,
      })) ?? [],
  };

  return formData;
};

export const transformFormDataToApiData = (
  formData: TBarInventoryFormType,
): Omit<TUpdateBarInventoryPayload, "media"> & {
  media?: TLinkAMediaToAModuleArgs[];
} => ({
  ...formData,
  media: undefined,
  volumes: formData?.volumes?.map(({ _id, ...volume }) => ({
    ...volume,
    id: _id,
    volume: Number(volume.volume) ?? undefined,
    netWeight: Number(volume.netWeight) ?? undefined,
    pricePerUnit: Number(volume.pricePerUnit) ?? undefined,
    netWeightOfLiquid: Number(volume.netWeightOfLiquid) ?? undefined,
    weightOfEmptyBottle: Number(volume.weightOfEmptyBottle) ?? undefined,
    openingStock: Number(volume.openStock) ?? undefined,
    closedStock: Number(volume.currentStock) ?? undefined,
    threshold:
      convertToNumber({
        value: volume.threshold,
        fallback: 0,
      }) || undefined,
  })),
});
