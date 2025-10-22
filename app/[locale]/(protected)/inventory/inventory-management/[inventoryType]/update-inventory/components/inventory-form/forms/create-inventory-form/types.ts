import type { TNullish } from "@/store/api/common-api-types";
import type {
  TCommonInventoryItemFields,
  TSoldByUnit,
  TSoldByVolume,
  TUnitNoShipmentVolume,
  TUnitWithShipmentActive,
  TUnitWithShipmentVolume,
  TVolumeNoShipmentVolume,
  TVolumeWithShipmentActive,
  TVolumeWithShipmentVolume,
} from "@/store/api/inventory-item/inventory-item.types";

export type TTCommonInventoryItemFormFields = Omit<
  TCommonInventoryItemFields,
  "media" | "status"
> & {
  media: File[] | TNullish;
};

export type TUnitExtraApiData = {
  apiData?:
    | (TUnitWithShipmentActive & {
        addShipment: boolean;
      })
    | null;
};
export type TUnitNoShipmentVolumeForm = TUnitNoShipmentVolume &
  TUnitExtraApiData;
export type TUnitWithShipmentVolumeForm = TUnitWithShipmentVolume &
  TUnitExtraApiData;
export type TUnitFormItem = TTCommonInventoryItemFormFields & {
  soldBy: TSoldByUnit;
  volumes: (TUnitNoShipmentVolumeForm | TUnitWithShipmentVolumeForm)[];
};

export type TExtraVolumeApiData = {
  apiData?:
    | (TVolumeWithShipmentActive & {
        addShipment: boolean;
      })
    | null;
};
export type TVolumeNoShipmentVolumeForm = TVolumeNoShipmentVolume &
  TExtraVolumeApiData;
export type TVolumeWithShipmentVolumeForm = TVolumeWithShipmentVolume &
  TExtraVolumeApiData;
export type TVolumeFormItem = TTCommonInventoryItemFormFields & {
  soldBy: TSoldByVolume;
  volumes: (TVolumeNoShipmentVolumeForm | TVolumeWithShipmentVolumeForm)[];
};

export type TInventoryItemFormType = TUnitFormItem | TVolumeFormItem;
