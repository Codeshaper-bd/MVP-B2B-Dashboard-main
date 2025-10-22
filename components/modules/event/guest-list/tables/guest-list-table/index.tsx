"use client";
import { useMemo } from "react";

import useManageStateParams from "@/hooks/useManageStateParams";
import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import {
  useGetGuestListQuery,
  useLazyDownloadGuestListFileQuery,
} from "@/store/api/events/events-api";
import type { TEvent, TGuestListArgs } from "@/store/api/events/events.types";
import { useGetAllLinkTrackingQuery } from "@/store/api/link-tracking/link-tracking-api";
import ExcelIcon from "@/components/icons/ExcelIcon";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui/button";
import SearchComponent from "@/components/ui/search-component";

import { getColumns } from "./columns";
import GuestListFilter from "./guest-list-filter";
import FilteredValue from "./guest-list-filter/FilteredValue";
interface IGuestListTable {
  getAnEventData: TEvent | TNullish;
  getAnEventApiState: IApiStateInfo;
}
function GuestListTable({
  getAnEventData,
  getAnEventApiState,
}: IGuestListTable) {
  const eventSlug = getAnEventData?.details?.slug;
  const eventId = getAnEventData?.details.id;

  // manage state params
  const manageStateParams =
    useManageStateParams<Exclude<TGuestListArgs, void | undefined>>();

  const { getAllParamValue, updateAParam, updateMultipleParam } =
    manageStateParams;
  const queryParams = getAllParamValue();
  const { data: getGuestListRes, ...getGuestListApiState } =
    useGetGuestListQuery({
      slug: eventSlug,
      ...queryParams,
      pageSize: 5,
    });
  const getGuestListData = getGuestListRes?.data;
  const getGuestListPagination = getGuestListRes?.pagination;
  const columns = useMemo(
    () => getColumns(getGuestListPagination),
    [getGuestListPagination],
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

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <SearchComponent<"external">
            mode="external"
            search={queryParams?.search}
            setSearch={(value) => {
              updateMultipleParam({
                search: value,
                page: undefined,
              });
            }}
            className="max-w-full"
            placeholder="Search"
          />
        </div>

        <GuestListFilter
          manageStateParams={manageStateParams}
          ticketTiersOptions={ticketTiersOptions}
          ticketTierApiState={getAnEventApiState}
          promoterOptions={promoterOptions}
          promoterApiState={getAllPromotersApiState}
        />
        <Button
          onClick={handleFileDownload}
          color="secondary"
          className="flex gap-3"
          size="lg"
        >
          <ExcelIcon />
          Download
        </Button>
      </div>
      <FilteredValue
        manageStateParams={manageStateParams}
        ticketTierMap={ticketTierMap}
        promoterMap={promoterMap}
      />

      <RenderData
        expectedDataType="array"
        data={getGuestListData}
        {...getGuestListApiState}
        loadingSkeleton={<TableSkeleton length={5} />}
      >
        <DefaultTable data={getGuestListData} columns={columns}>
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getGuestListApiState?.isLoading ||
                getGuestListApiState?.isFetching
              }
              totalPages={convertToNumber({
                value: getGuestListPagination?.totalPages,
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
    </>
  );
}

export default GuestListTable;
