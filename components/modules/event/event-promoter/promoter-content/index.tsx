import Link from "next/link";

import { contentPerPageOptions } from "@/config/client-config";
import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import useManageStateParams from "@/hooks/useManageStateParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish, TPaginationArgs } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetAllLinkTrackingQuery } from "@/store/api/link-tracking/link-tracking-api";
import SettingsIcon from "@/components/icons/sidebar/SettingsIcon";
import CreatePromoterDialog from "@/components/modules/event/event-promoter/assign-promoter/create-promoter-dialog";
import OutlinePagination from "@/components/pagination/outline-pagination";
import RenderData from "@/components/render-data";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import PromoterItem from "./promoter-item";
interface IPromoterContentProps {
  getAnEventData: TEvent | TNullish;
  isPastEvent?: boolean;
}
function PromoterContent({
  getAnEventData,
  isPastEvent,
}: IPromoterContentProps) {
  const isEventCompany = useIsEventCompany();
  const eventId = getAnEventData?.details?.id;
  const { getAllParamValue, updateMultipleParam } =
    useManageStateParams<Exclude<TPaginationArgs, void | undefined>>();
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
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <h3 className="flex-1 text-lg font-semibold text-default-900">
          Event Promoters
        </h3>

        {!isPastEvent && (
          <>
            <Button
              type="button"
              color="secondary"
              className="flex-none"
              asChild
            >
              <Link
                href={
                  isEventCompany
                    ? `/en/event-company/organization/promoter-management`
                    : `/en/organization/promoter-management`
                }
              >
                <SettingsIcon className="me-1 size-5" /> Configure promoters
              </Link>
            </Button>

            <CreatePromoterDialog
              eventId={Number(eventId)}
              triggerClassName="h-10 text-sm font-semibold"
            />
          </>
        )}
      </div>
      <RenderData
        expectedDataType="array"
        data={getAllLinkTrackingData}
        {...getAllLinkTrackingApiState}
        loadingSkeleton={
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} length={1} />
            ))}
          </div>
        }
      >
        <div className="mb-6 space-y-4">
          {getAllLinkTrackingData?.map((item) => (
            <PromoterItem
              key={item.id}
              getAnPromoterItem={item}
              getAnEventData={getAnEventData}
              isPastEvent={isPastEvent}
            />
          ))}
        </div>
      </RenderData>
      <Separator className="my-3" />

      <OutlinePagination
        isLoading={
          getAllLinkTrackingApiState.isLoading ||
          getAllLinkTrackingApiState.isFetching
        }
        currentPage={Number(queryObject.page || 1)}
        totalPages={getAllLinkTrackingPagination?.totalPages || 1}
        hideForTotalPagesOne
        disableUrlState
        onPageChange={(value) => {
          updateMultipleParam({ page: value <= 1 ? undefined : value });
        }}
      />
    </div>
  );
}

export default PromoterContent;
