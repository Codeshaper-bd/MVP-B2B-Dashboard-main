import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { TSingleInventoryItemData } from "../inventory-item/inventory-item.types";
import type { TMedia } from "../media/media.types";

/**
 |--------------------------------------------------
 | Create Shipment Start
 |--------------------------------------------------
 */

export type TShipmentItem = TSingleInventoryItemData;

export type TCreateShipmentItem = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  casesReceived?: number;
  unitReceived?: number;
  price?: number;
};

export type TCreateShipmentArgs = TCreateShipmentItem[];
export type TCreateShipmentRes = TApiResponse<TShipmentItem>;

/**
 |--------------------------------------------------
 | Create Shipment End
 |--------------------------------------------------
 */

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Shipments Start
|--------------------------------------------------
*/

export type TShipmentHistory = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  inventoryItemId: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  media: TMedia | TNullish;
  newStock: number | TNullish;
  volume: number | TNullish;
  unit: number | TNullish;
  soldBy: string | TNullish;
  currentStock: number | TNullish;
  cost: number | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  casesReceived: number | TNullish;
};
export type TGetShipmentsArgs = TPaginationArgs;
export type TGetShipmentsRes = TApiResponse<TShipmentHistory[]>;

/**
|--------------------------------------------------
| Get All Shipments End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
