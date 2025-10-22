"use client";

import { memo, useMemo } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useManageStateParams, {
  type TUseManageStateParamsReturnType,
} from "@/hooks/useManageStateParams";
import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { cn } from "@/lib/utils";
import type { TNullish, TPagination } from "@/store/api/common-api-types";
import { useLazyDownloadGuestListFileQuery } from "@/store/api/events/events-api";
import { useGetAllLinkTrackingQuery } from "@/store/api/link-tracking/link-tracking-api";
import { useGetPastEventGuestListCheckInQuery } from "@/store/api/past-event/past-event-api";
import type {
  TGetPastEventGuestListCheckIn,
  TGetPastEventGuestListCheckInArgs,
} from "@/store/api/past-event/past-event.types";
import ExcelIcon from "@/components/icons/ExcelIcon";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui/button";

import { getColumns } from "./columns";
import GuestListFilter from "./guest-list-filter";
import FilteredValue from "./guest-list-filter/filter-value";
import GuestListTableSearch from "./guestlist-table-search";

type TRenderPropsData = {
  data: TNullish | TGetPastEventGuestListCheckIn[];
  pagination: TPagination | undefined;
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPastEventGuestListCheckInArgs, void>
  >;
};

type TGuestListTableProps = {
  filter?: (props: TRenderPropsData) => React.ReactNode;
  title?: string;
  hideTitle?: boolean;
  headerRightSideContent?: (props: TRenderPropsData) => React.ReactNode;
  headerLeftSideContent?: (props: TRenderPropsData) => React.ReactNode;
  hideDownloadButton?: boolean;
  tableClassName?: string;
};

function GuestListTable({
  filter,
  headerLeftSideContent,
  headerRightSideContent,
  title = "Guest List",
  hideTitle,
  hideDownloadButton,
  tableClassName,
}: TGuestListTableProps) {
  const manageStateParams =
    useManageStateParams<
      Exclude<TGetPastEventGuestListCheckInArgs, void | undefined>
    >();

  const { updateAParam, getAllParamValue } = manageStateParams;
  const queryParams = getAllParamValue();

  const { eventSlug, getAnEventData, getAnEventApiState } =
    useFetchAnEventData();
  const eventId = getAnEventData?.details.id;
  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });

  const {
    data: getPastEventGuestListCheckInRes,
    ...getPastEventGuestListCheckInApiState
  } = useGetPastEventGuestListCheckInQuery(
    {
      ...queryParams,
      slug: eventSlug,
      guestListFilter: "guestList",

      page: queryParams?.page || 1,
      pageSize: 6,
    },
    {
      skip: !isProbableValidSlugFound,
    },
  );
  const getPastEventGuestListCheckInData =
    getPastEventGuestListCheckInRes?.data;
  const getPastEventGuestListCheckInPagination =
    getPastEventGuestListCheckInRes?.pagination;

  const columns = useMemo(
    () => getColumns(getPastEventGuestListCheckInPagination),
    [getPastEventGuestListCheckInPagination],
  );

  const { data: getAllPromotersRes, ...getAllPromotersApiState } =
    useGetAllLinkTrackingQuery(
      {
        eventId,
      },
      {
        skip: !checkIsValidId(eventId),
      },
    );

  const getAllPromotersData = getAllPromotersRes?.data;

  // Shared ticket tier data
  const ticketTiersOptions = useMemo(
    () =>
      getAnEventData?.ticketTiers?.map((tier) => ({
        label: tier.name,
        value: tier.id,
      })),
    [getAnEventData],
  );

  const promoterOptions: { label: string; value: number }[] = useMemo(
    () =>
      (getAllPromotersData ?? [])
        .filter(
          (item) =>
            item.promoter !== null &&
            typeof item.promoter?.name === "string" &&
            item.promoter?.id !== null &&
            item.promoter?.id !== undefined,
        )
        .map((item) => ({
          label: item.promoter?.name ?? "",
          value: Number(item.promoter?.id) || 0,
        })),
    [getAllPromotersData],
  );

  // Create a map for quick lookup by ID
  const ticketTierMap = useMemo(
    () =>
      getAnEventData?.ticketTiers?.reduce(
        (acc, tier) => {
          acc[tier.id] = tier.name;
          return acc;
        },
        {} as Record<number, string>,
      ) || {},
    [getAnEventData],
  );

  const promoterMap = useMemo(() => {
    const map: Record<number, string> = {};

    (getAllPromotersData ?? []).forEach((item) => {
      if (
        item.promoter !== null &&
        typeof item.promoter?.id === "number" &&
        typeof item.promoter?.name === "string"
      ) {
        map[item.promoter.id] = item.promoter.name;
      }
    });

    return map;
  }, [getAllPromotersData]);

  const [triggerDownload] = useLazyDownloadGuestListFileQuery();
  const handleFileDownload = async () => {
    if (!eventSlug) {
      return;
    }
    const blobUrl = await triggerDownload(eventSlug?.toString()).unwrap();

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${eventSlug}-guestList-data.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className={cn("xl:-mt-16", tableClassName)}>
      <div className="mb-6 flex flex-wrap gap-3 lg:items-center 2xl:flex-row">
        <div className="flex-1">
          {!hideTitle && (
            <h3 className="whitespace-nowrap text-xl font-semibold">{title}</h3>
          )}
        </div>

        <div className="flex flex-none gap-3">
          {typeof headerLeftSideContent === "function" &&
            headerLeftSideContent({
              data: getPastEventGuestListCheckInData,
              pagination: getPastEventGuestListCheckInPagination,
              manageStateParams,
            })}

          <GuestListTableSearch manageStateParams={manageStateParams} />
          {typeof filter === "function" ? (
            filter({
              data: getPastEventGuestListCheckInData,
              pagination: getPastEventGuestListCheckInPagination,
              manageStateParams,
            })
          ) : (
            <GuestListFilter
              manageStateParams={manageStateParams}
              ticketTiersOptions={ticketTiersOptions}
              ticketTierApiState={getAnEventApiState}
              promoterOptions={promoterOptions}
              promoterApiState={getAllPromotersApiState}
            />
          )}
          {!hideDownloadButton && (
            <Button onClick={handleFileDownload} color="secondary" size="lg">
              <ExcelIcon className="size-5" /> Download
            </Button>
          )}
          {typeof headerRightSideContent === "function" &&
            headerRightSideContent({
              data: getPastEventGuestListCheckInData,
              pagination: getPastEventGuestListCheckInPagination,
              manageStateParams,
            })}
        </div>
      </div>
      <FilteredValue
        manageStateParams={manageStateParams}
        ticketTierMap={ticketTierMap}
        promoterMap={promoterMap}
      />

      <RenderData
        expectedDataType="array"
        data={getPastEventGuestListCheckInData}
        {...getPastEventGuestListCheckInApiState}
        loadingSkeleton={<TableSkeleton length={6} />}
      >
        <DefaultTable
          data={getPastEventGuestListCheckInData}
          className="rounded-b-none"
          columns={columns}
        >
          <DefaultTable.Table />

          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getPastEventGuestListCheckInApiState.isLoading ||
                getPastEventGuestListCheckInApiState?.isFetching
              }
              totalPages={convertToNumber({
                value: getPastEventGuestListCheckInPagination?.totalPages,
                digit: 0,
                fallback: 1,
              })}
              hideForTotalPagesOne
              disableUrlState
              onPageChange={(page) =>
                updateAParam({
                  key: "page",
                  value: page,
                })
              }
              currentPage={convertToNumber({
                value: queryParams?.page,
                digit: 0,
                fallback: 1,
              })}
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default memo(GuestListTable);
