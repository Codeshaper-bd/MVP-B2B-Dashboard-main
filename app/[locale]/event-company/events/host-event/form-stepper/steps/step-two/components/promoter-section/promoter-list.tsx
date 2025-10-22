import { memo, useCallback } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type {
  TIdOrSlugOrIdentifier,
  TPaginationArgs,
} from "@/store/api/common-api-types";
import {
  useDeleteALinkTrackingMutation,
  useGetAllLinkTrackingQuery,
} from "@/store/api/link-tracking/link-tracking-api";
import type {
  TDeleteALinkTrackingMutation,
  TLinkTracking,
} from "@/store/api/link-tracking/link-tracking.types";
import OutlinePagination from "@/components/pagination/outline-pagination";
import RenderData from "@/components/render-data";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import PromoterItem from "./promoter-item";

interface IPromoterListProps {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
}

function PromoterList({ eventId }: IPromoterListProps) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();
  const queryObject = getAllParamValue();

  const { data: getAllLinkTrackingRes, ...getAllLinkTrackingApiState } =
    useGetAllLinkTrackingQuery(
      {
        ...queryObject,
        pageSize: contentPerPageOptions[4],
        page: queryObject.page || contentPerPageOptions.initialPage,
        eventId,
      },
      {
        skip: !checkIsValidId(eventId),
      },
    );

  const getAllLinkTrackingData = getAllLinkTrackingRes?.data;
  const getAllLinkTrackingPagination = getAllLinkTrackingRes?.pagination;

  const [deleteALinkTracking] = useDeleteALinkTrackingMutation();
  const toastProps = useToast();

  const handleDelete = useCallback(
    ({
      deleteALinkTracking,
      toastProps: { toast },
    }: {
      deleteALinkTracking: TDeleteALinkTrackingMutation;
      toastProps: TUseToastReturnType;
    }) =>
      async (item: TLinkTracking) => {
        const toastId = toast({
          variant: "loading",
          title: "Deleting Event Promoter",
          description: "Please wait while we delete your event promoter",
        });

        try {
          if (!item?.identifier) {
            throw new Error("Promoter identifier is missing");
          }

          await deleteALinkTracking({ identifier: item?.identifier }).unwrap();

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: "Event Promoter Deleted",
            description: "The event promoter has been successfully deleted",
          });
        } catch (error) {
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Event Promoter Deletion Failed",
              description: "Failed to delete promoter. Please try again later",
            }),
          });
        }
      },
    [],
  );

  return (
    <div className="mt-4">
      <RenderData
        expectedDataType="array"
        data={getAllLinkTrackingData}
        {...getAllLinkTrackingApiState}
      >
        <div className="mb-6 space-y-4">
          {getAllLinkTrackingData?.map((item) => (
            <PromoterItem
              key={item?.id}
              item={item}
              onDeleteClick={handleDelete({
                deleteALinkTracking,
                toastProps,
              })}
            />
          ))}
        </div>
      </RenderData>

      <div className="mt-4">
        <OutlinePagination
          isLoading={
            getAllLinkTrackingApiState.isLoading ||
            getAllLinkTrackingApiState.isFetching
          }
          totalPages={getAllLinkTrackingPagination?.totalPages}
          hideForTotalPagesOne
        />
      </div>
    </div>
  );
}

export default memo(PromoterList);
