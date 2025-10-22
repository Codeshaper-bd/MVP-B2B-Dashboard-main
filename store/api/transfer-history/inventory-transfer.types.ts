import type {
  TApiResponse,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { TMedia } from "../media/media.types";

export type TInventoryTransferHistoryData = {
  id: number;
  name: string;
  slug: string;
  date: string;
  source: string;
  quantity: number;
  media: TMedia | null;
  barback: string | TNullish;
  role: string | TNullish;
  eventId: number | TNullish;
  from: string | TNullish;
  to: string | TNullish;
  sourceMedia: TMedia[] | TNullish;
  destinationMedia: TMedia[] | TNullish;
  status: string | TNullish;
  formattedDate: string | TNullish;
  createdAt: string;
};

export type TGetInventoryTransferHistoryArgs = TPaginationArgs & {
  barSlug?: string;
  inventoryItemId?: number;
  sourceSlug?: string;
  destinationSlug?: string;
  groupByDate?: boolean;
  eventSlug?: string;
  role?: "ADMIN" | "Barback";
  fennecLive?: boolean;
  name?: string;
};
export type TGetInventoryTransferHistoryRes = TApiResponse<
  TInventoryTransferHistoryData[]
>;
