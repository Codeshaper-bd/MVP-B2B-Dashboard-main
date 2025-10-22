"use client";
import { useMemo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import BooleanContext from "@/contexts/BooleanContext";
import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useBooleanState from "@/hooks/useBooleanState";
import useManageStateParams from "@/hooks/useManageStateParams";
import { convertToNumber } from "@/lib/data-types/number";
import { useGetPastEventTransactionsQuery } from "@/store/api/past-event/past-event-api";
import type { TGetPastEventTransactionArgs } from "@/store/api/past-event/past-event.types";
import FilterContent from "@/components/filter-content";
import ExcelIcon from "@/components/icons/ExcelIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui/button";

import { getColumns } from "./columns";
import FilterForm from "./filter-form";
import FilteredValue from "./filter-value";
import TransactionsSearch from "./transactions-search";

function TransactionTable() {
  const { eventSlug } = useFetchAnEventData();
  const manageStateParams =
    useManageStateParams<Exclude<TGetPastEventTransactionArgs, void>>();
  const { getAllParamValue, updateAParam } = manageStateParams;
  const queryObject = getAllParamValue();
  const { state: isOpen, setOpen, setClose, toggle } = useBooleanState();

  const {
    data: getPastEventTransactionsRes,
    ...getPastEventTransactionsApiState
  } = useGetPastEventTransactionsQuery({
    slug: eventSlug,
    ...queryObject,
    page: queryObject?.page || contentPerPageOptions.initialPage,
    pageSize: queryObject?.pageSize || contentPerPageOptions[6],
  });
  const getPastEventTransactionsData = getPastEventTransactionsRes?.data;
  const getPastEventTransactionsPagination =
    getPastEventTransactionsRes?.pagination;

  const columns = useMemo(
    () =>
      getColumns({
        currentPage: getPastEventTransactionsPagination?.page || 1,
      }),
    [getPastEventTransactionsPagination?.page],
  );
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 md:items-center">
        <h3 className="flex-1 whitespace-nowrap text-xl font-semibold text-default-1000">
          Transaction History
        </h3>
        <div className="flex flex-none flex-col gap-3 md:flex-row md:items-center">
          <TransactionsSearch manageStateParams={manageStateParams} />
          <BooleanContext>
            {({ isOpen, toggle, setClose }) => (
              <FilterContent
                open={isOpen}
                onClose={setClose}
                triggerContent={
                  <Button
                    color={isOpen ? "primary" : "secondary"}
                    onClick={toggle}
                    size="lg"
                    className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
                  >
                    <FilterIcon className="me-2 h-4 w-4" />
                    Filter
                  </Button>
                }
                className="left-0 min-w-[320px] lg:left-auto"
              >
                <FilterForm manageStateParams={manageStateParams} />
              </FilterContent>
            )}
          </BooleanContext>

          <Button color="secondary" className="inline-flex gap-3">
            <a
              className="flex items-center gap-3"
              href="/files/event.csv"
              download="event.csv"
              target="_blank"
            >
              <ExcelIcon />
              Download
            </a>
          </Button>
        </div>
      </div>
      <FilteredValue manageStateParams={manageStateParams} />
      <RenderData
        expectedDataType="array"
        data={getPastEventTransactionsData}
        loadingSkeleton={<TableSkeleton />}
        {...getPastEventTransactionsApiState}
      >
        <DefaultTable data={getPastEventTransactionsData} columns={columns}>
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getPastEventTransactionsApiState.isLoading ||
                getPastEventTransactionsApiState?.isFetching
              }
              totalPages={convertToNumber({
                value: getPastEventTransactionsPagination?.totalPages,
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
                value: queryObject?.page,
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

export default TransactionTable;
