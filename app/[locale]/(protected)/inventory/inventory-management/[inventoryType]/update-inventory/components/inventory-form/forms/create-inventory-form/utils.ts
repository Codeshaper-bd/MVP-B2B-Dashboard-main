import { convertToNumber } from "@/lib/data-types/number";
import type {
  TBarMenuItemType,
  TUnit,
} from "@/store/api/bar-menu-item/bar-menu-item.types";
import type { TBar } from "@/store/api/bars/bars.types";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TSoldBy,
  TInventoryItemType,
  TBaseVolume,
  TCommonInventoryItemFields,
  TGroupInventoryItemData,
  TUnitItem,
  TVolumeItem,
  TUnitWithShipmentActive,
  TVolumeWithShipmentActive,
} from "@/store/api/inventory-item/inventory-item.types";
import {
  type TLinkAMediaToAModuleArgs,
  type TMedia,
} from "@/store/api/media/media.types";

import type {
  TInventoryItemFormType,
  TUnitNoShipmentVolumeForm,
  TUnitWithShipmentVolumeForm,
  TVolumeNoShipmentVolumeForm,
  TVolumeWithShipmentVolumeForm,
} from "./types";

/*  */
export enum EProductPackageType {
  bottleCanned = "BOTTLE_CANNED",
  hardLiquor = "HARD_LIQUOR",
}
export type TProductPackageType = `${EProductPackageType}`;

export enum EProductMenuType {
  inventory = "INVENTORY",
  bar = "BAR",
}
export type TProductMenuType = `${EProductMenuType}`;

export type TProduct = {
  id: number;
  name: string;
  slug: string;
  subTitle: string;
  description: string;
  unit: TUnit | TNullish;
  type: TBarMenuItemType;
  size: number;
  sellingPrice: number;
  purchasePrice: number;
  currentStock: number;
  openingStock: number;
  isSaleable: boolean;
  hasIngredients?: boolean;
  categoryName: string;
  statusName: string;
  createdAt: string;
  updatedAt: string;
  media?: TMedia[] | TNullish;
  Bar?: TBar;
};

export type TCreateProductArgs = {
  name: string;
  categorySlug: string;
  subTitle?: string;
  description?: string;
  unit: TUnit;
  type: TBarMenuItemType;
  size?: number;
  sellingPrice: number;
  //
  purchasePrice?: number;
  currentStock?: number;
  openingStock?: number;
  isSaleable: boolean;
  media?: TLinkAMediaToAModuleArgs[] | TNullish;
};

// export type TCreateProductRes = TApiResponse<TProduct>;
/*  */

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

export const getSoldByTypeOptions = (
  productType: TInventoryItemType | undefined,
) => {
  if (productType === "ALCOHOLIC") {
    return soldByTypeOptions;
  }
  return soldByTypeOptions.filter((option) => option.value === "UNIT");
};

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

export const initialValues: TInventoryItemFormType = {
  name: "",
  categoryId: 0,
  type: undefined as unknown as TInventoryItemType,
  media: null,
  soldBy: "" as TSoldBy,
  volumes: [
    // {
    //   volume: 1,
    //   unit: "oz",
    //   productCode: "",
    //   perLevel: 1,
    //   unitPerCase: 1,
    //   addShipment: false,
    // },
  ],
};

export function transformInventoryItemToFormInputData(
  data: TGroupInventoryItemData,
): TInventoryItemFormType {
  const unitVolumes: TUnitItem["volumes"] = [];
  const volumeVolumes: TVolumeItem["volumes"] = [];

  const dataVolumes: TGroupInventoryItemData["children"] = Array.isArray(
    data?.children,
  )
    ? data.children
    : [];

  for (const vol of dataVolumes) {
    const baseVolume: TBaseVolume = {
      productId: vol?.id,
      id: vol?.id,
      volume: convertToNumber({ value: vol?.volume, digit: 0, fallback: 0 }),
      unit: vol?.unit,
      productCode: vol?.productCode,
      netWeight: convertToNumber({
        value: vol?.netWeight,
        digit: 2,
        fallback: 0,
      }),
      netWeightUnit: vol?.netWeightUnit,
      perLevel: convertToNumber({
        value: vol?.perLevel,
        digit: 0,
        fallback: 0,
      }),
      unitPerCase: convertToNumber({
        value:
          !!vol && typeof vol === "object" && "unitPerCase" in vol
            ? vol?.unitPerCase
            : 0,
        digit: 0,
        fallback: 0,
      }),
    };

    /* unit start */
    if (vol?.soldBy === "UNIT") {
      const unitWithShipmentActive: TUnitWithShipmentActive = {
        addShipment: !!vol?.addShipment as true,
        casesReceived: convertToNumber({
          value:
            !!vol && typeof vol === "object" && "casesReceived" in vol
              ? vol?.casesReceived
              : 0,
          digit: 0,
          fallback: 0,
        }),
        pricePerCase: convertToNumber({
          value:
            !!vol && typeof vol === "object" && "pricePerCase" in vol
              ? vol?.pricePerCase
              : 0,
          digit: 2,
          fallback: 0,
        }),
        currentStockInCases: convertToNumber({
          value:
            !!vol && typeof vol === "object" && "currentStockInCases" in vol
              ? vol?.currentStockInCases
              : 0,
          digit: 0,
          fallback: 0,
        }),
      };

      if (!vol?.addShipment) {
        const unitNoShipmentVolume: TUnitNoShipmentVolumeForm = {
          ...baseVolume,
          currentStockInCases: convertToNumber({
            value:
              !!vol && typeof vol === "object" && "currentStockInCases" in vol
                ? vol?.currentStockInCases
                : 0,
            digit: 0,
            fallback: 0,
          }),
          addShipment: vol?.addShipment,
          apiData: unitWithShipmentActive,
        };
        unitVolumes?.push(unitNoShipmentVolume);
      } else {
        const unitWithShipmentVolume: TUnitWithShipmentVolumeForm = {
          ...baseVolume,
          ...unitWithShipmentActive,
          apiData: unitWithShipmentActive,
        };
        unitVolumes?.push(unitWithShipmentVolume);
      }
    }
    /* unit end */
    /* ------------------------------------------------------- */
    /* volume start */
    if (vol?.soldBy === "VOLUME") {
      const volumeWithShipmentActive: TVolumeWithShipmentActive = {
        addShipment: !!vol?.addShipment as true,
        pricePerUnit:
          !!vol &&
          typeof vol === "object" &&
          "pricePerUnit" in vol &&
          vol?.pricePerUnit
            ? convertToNumber({
                value: vol?.pricePerUnit,
                digit: 2,
                fallback: 0,
              })
            : 0,
        openingStock:
          !!vol && typeof vol === "object" && "openingStock" in vol
            ? convertToNumber({
                value: vol?.openingStock,
                digit: 2,
                fallback: 0,
              })
            : 0,
        currentStock:
          !!vol && typeof vol === "object" && "currentStock" in vol
            ? convertToNumber({
                value: vol?.currentStock,
                digit: 2,
                fallback: 0,
              })
            : 0,
      };

      if (!vol?.addShipment) {
        const volumeNoShipmentVolume: TVolumeNoShipmentVolumeForm = {
          ...baseVolume,
          currentStock: convertToNumber({
            value:
              !!vol && typeof vol === "object" && "currentStock" in vol
                ? vol?.currentStock
                : 0,
            digit: 2,
            fallback: 0,
          }),
          addShipment: vol?.addShipment,
          pricePerUnit:
            !!vol &&
            typeof vol === "object" &&
            "pricePerUnit" in vol &&
            vol?.pricePerUnit
              ? convertToNumber({
                  value: vol?.pricePerUnit,
                  digit: 2,
                  fallback: 0,
                })
              : 0,
          apiData: volumeWithShipmentActive,
        };
        volumeVolumes?.push(volumeNoShipmentVolume);
      } else {
        const volumeWithShipmentVolume: TVolumeWithShipmentVolumeForm = {
          ...baseVolume,
          ...volumeWithShipmentActive,
          apiData: volumeWithShipmentActive,
        };
        volumeVolumes?.push(volumeWithShipmentVolume);
      }
    }
    /* volume end */
  }

  const commonInventoryItemFields: Omit<TCommonInventoryItemFields, "media"> & {
    media: File[] | TNullish;
  } = {
    name: data?.name,
    categoryId: data?.categoryId,
    status: data?.status,
    type: data?.type,
    media: undefined,
  };

  const volumeItem: Omit<TVolumeItem, "media"> & {
    media: File[] | TNullish;
  } = {
    ...commonInventoryItemFields,
    soldBy: "VOLUME",
    volumes: volumeVolumes,
  };
  const unitItem: Omit<TUnitItem, "media"> & {
    media: File[] | TNullish;
  } = {
    ...commonInventoryItemFields,
    soldBy: "UNIT",
    volumes: unitVolumes,
  };
  return data?.soldBy === "VOLUME" ? volumeItem : unitItem;
}
