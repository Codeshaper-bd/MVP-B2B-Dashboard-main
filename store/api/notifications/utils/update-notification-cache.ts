import { getUniqueArrayItems } from "@/lib/array/get-unique-array-items";

import type { TNullish, TPagination } from "../../common-api-types";
import type {
  TGetAllNotificationsRes,
  TNotification,
} from "../notifications.types";

type TUpdateNotificationsCache = (props: {
  newApiResponseData: TNotification[] | TNullish;
  newApiPaginationData: TPagination | TNullish;
  draft: TGetAllNotificationsRes | TNullish;
  dataUpdateMode:
    | "merge-start"
    | "merge-end"
    | "unique-merge-start"
    | "unique-merge-end";
  paginationUpdateMode: "update-page" | "don't-update-page";
}) => TGetAllNotificationsRes;

// Reusable function for updating the query data cache
export const updateNotificationsCache: TUpdateNotificationsCache = ({
  newApiResponseData,
  newApiPaginationData,
  draft,
  dataUpdateMode,
  paginationUpdateMode,
}) => {
  const newApiResponseDataArray = Array.isArray(newApiResponseData)
    ? newApiResponseData
    : [];
  const draftDataArray = Array.isArray(draft?.data) ? draft?.data : [];

  let updatedData: TNotification[] = [];
  if (
    dataUpdateMode === "merge-start" ||
    dataUpdateMode === "unique-merge-start"
  ) {
    updatedData = [...newApiResponseDataArray, ...draftDataArray];
    if (dataUpdateMode === "unique-merge-start") {
      updatedData = getUniqueArrayItems(updatedData, (item) => item.id);
    }
  }
  if (dataUpdateMode === "merge-end" || dataUpdateMode === "unique-merge-end") {
    updatedData = [...draftDataArray, ...newApiResponseDataArray];
    if (dataUpdateMode === "unique-merge-end") {
      updatedData = getUniqueArrayItems(updatedData, (item) => item.id);
    }
  }

  const fallbackPagination: TPagination = {
    page: 1,
    pageSize: Infinity,
    totalCount: 0,
    totalPages: 1,
  };
  const updatedPagination: TPagination = {
    page:
      paginationUpdateMode === "update-page"
        ? Number(newApiPaginationData?.page || fallbackPagination.page)
        : Number(draft?.pagination?.page || fallbackPagination.page),
    pageSize: Number(
      newApiPaginationData?.pageSize ||
        newApiPaginationData?.totalCount ||
        fallbackPagination.pageSize,
    ),
    totalCount: Number(
      newApiPaginationData?.totalCount || fallbackPagination.totalCount,
    ),
    totalPages: Number(
      newApiPaginationData?.totalPages || fallbackPagination.totalPages,
    ),
  };

  return {
    ...draft,
    success: !!draft?.success,
    message: draft?.message || "",
    statusCode: draft?.statusCode || 200,
    data: updatedData,
    pagination: updatedPagination,
  };
};
