import type { TApiResponse, TIdOrSlugOrIdentifier } from "../common-api-types";

/**
|--------------------------------------------------
| Get Employee Activity start
|--------------------------------------------------
*/
export type TGetAnEmployeeActivityData = {
  id: number;
  logName: string;
  description: string;
  subjectType: string;
  subjectId: string;
  event: string;
  causerType: string;
  causerId: number;
  batchUuid: string | null;
  createdAt: string;
  updatedAt: string;
  causer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  properties: {
    // Common fields
    itemId?: number;
    itemName?: string;
    type?: string;
    itemSlug?: string;
    employeeId?: number;
    organizationId?: number;
    timestamp?: string;

    // For stock adjustment
    barId?: number;
    reason?: string;
    newStock?: number;
    oldStock?: number;
    adjustment?: number;
    adjustmentId?: number;
    adjustmentType?: string;

    // For update
    newValues?: {
      name?: string;
      type?: string;
      soldBy?: string;
      status?: string;
      categoryId?: number;
    };
    oldValues?: {
      name?: string;
      type?: string;
      soldBy?: string;
      statusId?: number;
      categoryId?: number;
    };
    childCount?: number;
    updatedFields?: string[];
    hasMediaChanges?: boolean;

    // For creation
    soldBy?: string;
    status?: string;
    hasMedia?: boolean;
    itemType?: string;
    variants?: {
      unit: string;
      volume: number;
      productCode: string;
    }[];
    variantCount?: number;
  };
};

export type TGetAnEmployeeActivityArgs = {
  employeeId: TIdOrSlugOrIdentifier<"id">["id"];
  eventId?: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TGetAnEmployeeActivityRes = TApiResponse<
  TGetAnEmployeeActivityData[]
>;

/**
|--------------------------------------------------
| Get Employee Activity End
|--------------------------------------------------
*/
