import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { TMedia } from "../media/media.types";

/**
|--------------------------------------------------
|  Order History Start
|--------------------------------------------------
*/
export type TOrderStatus = {
  id: number;
  name: string;
};

export type TOrderCustomer = {
  id: number;
  name: string;
};

export type TOrder = {
  id: number;
  date: string;
  totalAmount: number;
  status: TOrderStatus;
  customer: TOrderCustomer;
};

export type TGetAnEventOrdersArgs = {
  slug: string;
} & TPaginationArgs<TOrder>;

export type TGetAnEventOrdersRes = TApiResponse<TOrder[]>;

/**
|--------------------------------------------------
| Order History End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Order Details Start
|--------------------------------------------------
*/

export type TOrderHistoryEventDetailsArgs = TIdOrSlugOrIdentifier<"slug"> & {
  orderId: number;
};

export type TOrderItemPurchased = {
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  media: TMedia | TNullish;
};
export type TOrderDetailsCustomer = {
  id: number | TNullish;
  firstName: string | TNullish;
  lastName: string | TNullish;
};
export type TEventOrderStatus = {
  id: string;
  name: string;
};
export type TOrderDetails = {
  orderId: number;
  orderDate: string;
  customer: TOrderDetailsCustomer;
  status: TEventOrderStatus;
  itemsPurchased: TOrderItemPurchased[];
  subtotal: number;
  total: number;
  tax: number;
};
export type TOrderHistoryEventDetailsRes = TApiResponse<TOrderDetails>;

/**
|--------------------------------------------------
| Order Details End
|--------------------------------------------------
*/
