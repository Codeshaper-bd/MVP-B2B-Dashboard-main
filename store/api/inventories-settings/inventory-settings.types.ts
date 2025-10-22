import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
} from "../common-api-types";

/**
|--------------------------------------------------
| Create Inventory Settings Start
|--------------------------------------------------
*/

export type TCreateInventorySettingsArgs = {
  thresholds: number[];
  notify_email: boolean;
  notify_phone: boolean;
  emails?: string[];
  phone_numbers?: string[];
};

export type TInventorySettings = TCreateInventorySettingsArgs & {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
};

export type TCreateInventorySettingsRes = TApiResponse<TInventorySettings>;

/**
|--------------------------------------------------
| Get A Inventory Notification Start
|--------------------------------------------------
*/

export type TGetAInventorySettingsNotificationArgs = void;

export type TGetAInventorySettingsNotificationRes =
  TApiResponse<TInventorySettings>;
