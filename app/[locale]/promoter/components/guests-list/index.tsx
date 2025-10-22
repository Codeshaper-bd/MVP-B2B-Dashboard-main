"use client";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import BooleanContext from "@/contexts/BooleanContext";
import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import useManageStateParams from "@/hooks/useManageStateParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useGetPromotersTicketSoldListQuery,
  useGetPromoterTicketTiersQuery,
} from "@/store/api/promoter/promoter-api";
import type { TGetPromotersTicketSoldListArgs } from "@/store/api/promoter/promoter.types";
import FilterContent from "@/components/filter-content";
import SearchComponent from "@/components/ui/search-component";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import GuestListFilter from "./guest-list-filter";
import GuestListFilterValue from "./guest-list-filter-value";
import GuestTable from "./table";
import { tabs } from "./utils";

type TPageParams = {
  locale: string;
  eventSlug: string;
  organizationId: string;
};

function GuestsListTable() {
  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();

  // manage state params
  const manageStateParams =
    useManageStateParams<Exclude<TGetPromotersTicketSoldListArgs, void>>();

  const { updateAParam, updateMultipleParam, getAllParamValue } =
    manageStateParams;

  const {
    search,
    type = "individual",
    ticketTierId,
    hasAddons,
    hasDiscount,
    startDate,
    endDate,
    revenueAmount,
  } = getAllParamValue();
  const { getAParamValue } = useManageSearchParams<{ eventId: string }>();
  const eventId = getAParamValue("eventId");
  const { data: getTicketSoldListRes, ...getTicketSoldListApiState } =
    useGetPromotersTicketSoldListQuery({
      eventId,
      type,
      search,
      ticketTierId,
      hasAddons,
      hasDiscount,
      startDate,
      endDate,
      ...(revenueAmount ? { revenueAmount } : {}),
    });
  const getTicketSoldListData = getTicketSoldListRes?.data;
  const getTicketSoldListPagination = getTicketSoldListRes?.pagination;

  // Ticket Tiers API
  const params = useParams<TPageParams>();
  const { eventSlug } = params;
  const isProbableValidSlugFound = useMemo(
    () => checkIsValidId(eventSlug, { type: "string" }),
    [eventSlug],
  );

  const { data: getTicketTiersRes } = useGetPromoterTicketTiersQuery(
    {
      slug: eventSlug,
    },
    {
      skip: !isProbableValidSlugFound,
    },
  );
  const getTicketTiersData = useMemo(
    () => getTicketTiersRes?.data ?? [],
    [getTicketTiersRes?.data],
  );
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-default-1000">Guest List</h2>

      <Tabs defaultValue={type} className="w-full">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex-1">
            <TabsList className="w-fit border border-secondary">
              {tabs?.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="font-normal"
                  onClick={() =>
                    updateAParam({
                      key: "type",
                      value: tab?.value,
                    })
                  }
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex flex-none gap-3">
            <SearchComponent<"external">
              mode="external"
              search={search}
              setSearch={(value) => {
                updateMultipleParam({
                  search: value,
                  page: undefined,
                });
              }}
              placeholder="Search"
            />
            <BooleanContext>
              <FilterContent
                open={isFilterOpen}
                onClick={toggleFilterOpen()}
                onClose={closeFilter()}
                triggerButtonClassName="h-11"
              >
                <GuestListFilter
                  onClose={closeFilter()}
                  getTicketTiersData={getTicketTiersData}
                  manageStateParams={manageStateParams}
                />
              </FilterContent>
            </BooleanContext>
          </div>
        </div>
        <GuestListFilterValue
          manageStateParams={manageStateParams}
          getTicketTiersData={getTicketTiersData}
        />
        <div className="mt-4">
          <GuestTable
            getTicketSoldListData={getTicketSoldListData}
            getTicketSoldListPagination={getTicketSoldListPagination}
            getTicketSoldListApiState={getTicketSoldListApiState}
          />
        </div>
      </Tabs>
    </div>
  );
}

export default GuestsListTable;
