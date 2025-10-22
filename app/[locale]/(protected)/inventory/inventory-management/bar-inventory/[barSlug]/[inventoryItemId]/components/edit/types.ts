import type {
  TUpdateBarInventoryPayload,
  TUpdateBarInventoryVolumeInput,
} from "@/store/api/bar-inventory/bar-inventory.types";
import type { TNullish } from "@/store/api/common-api-types";

export type TBarInventoryFormType = Omit<
  TUpdateBarInventoryPayload,
  "media" | "volumes"
> & {
  media: File[] | TNullish;
  volumes: (Omit<TUpdateBarInventoryVolumeInput, "id"> & {
    _id: number;
    currentStock?: number;
  })[];
};
