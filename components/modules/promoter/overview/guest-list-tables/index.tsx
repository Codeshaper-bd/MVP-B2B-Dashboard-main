"use client";
import BooleanContext from "@/contexts/BooleanContext";
import useBooleanState from "@/hooks/useBooleanState";
import useManageStateParams from "@/hooks/useManageStateParams";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetPromotersAdminTicketSoldListQuery } from "@/store/api/promoters/promoters-api";
import type { TGetPromotersAdminTicketSoldListArgs } from "@/store/api/promoters/promoters.types";
import FilterContent from "@/components/filter-content";
import SearchComponent from "@/components/ui/search-component";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import GuestListFilter from "./guest-list-filter";
import GuestListFilterValue from "./guest-list-filter-value";
import GuestTable from "./table";
import { tabs } from "./utils";
interface IEventCoordinationProps {
  getAnEventData: TEvent | TNullish;
  ticketTierId?: string;
  promoterId?: TIdOrSlugOrIdentifier<"id">["id"];
}
function GuestListTables({
  getAnEventData,
  ticketTierId,
  promoterId,
}: IEventCoordinationProps) {
  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();

  // manage state params
  const manageStateParams =
    useManageStateParams<Exclude<TGetPromotersAdminTicketSoldListArgs, void>>();

  const {
    getAParamValue,
    updateAParam,
    updateMultipleParam,
    getAllParamValue,
  } = manageStateParams;

  const tab = getAParamValue("type") || "individual";
  const {
    search,
    ticketTierId: filerTicketTierId,
    hasAddons,
    hasDiscount,
    revenueAmount,
    startDate,
    endDate,
  } = getAllParamValue();

  const { data: getTicketSoldListRes, ...getTicketSoldListApiState } =
    useGetPromotersAdminTicketSoldListQuery(
      {
        promoterId,
        eventId: getAnEventData?.details.id,
        type: tab,
        ticketTierId: filerTicketTierId ? filerTicketTierId : ticketTierId,
        search,
        hasAddons,
        hasDiscount,
        startDate,
        endDate,
        ...(revenueAmount ? { revenueAmount } : {}),
      },
      {
        skip: !getAnEventData?.details.id || promoterId === "-1",
      },
    );
  const getTicketSoldListData = getTicketSoldListRes?.data;
  const getTicketSoldListPagination = getTicketSoldListRes?.pagination;
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-default-1000">Guest List</h2>

      <Tabs defaultValue={tab} className="w-full">
        <div className="flex flex-wrap justify-between gap-5 md:flex-nowrap">
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
          <div className="flex gap-3">
            <BooleanContext>
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
              <FilterContent
                open={isFilterOpen}
                onClick={toggleFilterOpen()}
                onClose={closeFilter()}
                triggerButtonClassName="h-11"
              >
                <GuestListFilter
                  onClose={closeFilter()}
                  manageStateParams={manageStateParams}
                />
              </FilterContent>
            </BooleanContext>
          </div>
        </div>
        <GuestListFilterValue manageStateParams={manageStateParams} />
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

export default GuestListTables;
