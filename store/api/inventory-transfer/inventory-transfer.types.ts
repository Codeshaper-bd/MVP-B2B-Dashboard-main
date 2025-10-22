import type { TApiResponse, TPaginationArgs } from "../common-api-types";
import type { TMedia } from "../media/media.types";

export type TInventoryTransferItem = {
  productId: number;
  quantity: number;
};

export type TCreateInventoryTransferArgs = {
  sourceId: number | null;
  destinationId: number | null;
  notes?: string;
  items: TInventoryTransferItem[];
};

export type TInventoryTransferResponse = {
  id: number;
  sourceBar: {
    id: number;
    name: string;
    slug: string;
  } | null;
  destinationBar: {
    id: number;
    name: string;
    slug: string;
  } | null;
  items: Array<{
    product: {
      id: number;
      name: string;
      slug: string;
    };
    quantity: number;
  }>;
  notes?: string;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
};

export type TCreateInventoryTransferRes =
  TApiResponse<TInventoryTransferResponse>;

export type TInitiatedBy = {
  name: string;
  role: string;
};
export type TInventoryTransferHistoryData = {
  id: number;
  name: string;
  slug: string;
  date: string;
  source: string;
  quantity: number;
  media: TMedia | null;
  initiatedBy: TInitiatedBy;
};
export type TGetAnInventoryTransferHistoryArgs = TPaginationArgs & {
  barSlug?: string;
  inventoryItemId?: number;
};
export type TGetAnInventoryTransferHistoryRes = TApiResponse<
  TInventoryTransferHistoryData[]
>;
