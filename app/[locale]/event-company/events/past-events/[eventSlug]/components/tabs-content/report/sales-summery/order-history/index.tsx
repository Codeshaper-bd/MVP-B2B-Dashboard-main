import Image from "next/image";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetPastEventOrderQuery } from "@/store/api/past-event/past-event-api";
import type { TGetPastEventOrderArgs } from "@/store/api/past-event/past-event.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import OrderFilter from "./order-filter";
import OrdersSearch from "./orders-search";

function OrderHistory() {
  const { getAnEventData } = useFetchAnEventData();
  const eventSlug = getAnEventData?.details?.slug;
  // params
  const manageStateParams =
    useManageStateParams<Exclude<TGetPastEventOrderArgs, void>>();
  const { updateAParam, getAllParamValue } = manageStateParams;
  const queryObject = getAllParamValue();
  // get data from api
  const { data: getPastEventOrderRes, ...getPastEventOrderApiState } =
    useGetPastEventOrderQuery({
      slug: eventSlug,
      ...queryObject,
    });

  const getPastEventOrderData = getPastEventOrderRes?.data;
  const getPastEventOrderPagination = getPastEventOrderRes?.pagination;
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <h3 className="flex-1 whitespace-nowrap text-xl font-semibold text-default-900">
          Order History
        </h3>
        <div className="flex flex-none flex-wrap items-center gap-3">
          <OrdersSearch manageStateParams={manageStateParams} />
          <OrderFilter manageStateParams={manageStateParams} />
          <Button color="secondary" asChild className="h-11 flex-none">
            <a href="/files/event.csv" download="event.csv" target="_blank">
              <Image
                src="/images/all-img/pdf-icon.png"
                alt=""
                width={20}
                height={20}
                className="me-1.5 size-5"
              />
              Download
            </a>
          </Button>
        </div>
      </div>
      <RenderData
        expectedDataType="array"
        data={getPastEventOrderData}
        {...getPastEventOrderApiState}
        loadingSkeleton={<TableSkeleton />}
      >
        <DefaultTable data={getPastEventOrderData} columns={columns}>
          <DefaultTable.Table />

          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getPastEventOrderApiState.isLoading ||
                getPastEventOrderApiState.isFetching
              }
              totalPages={getPastEventOrderPagination?.totalPages || 1}
              hideForTotalPagesOne
              disableUrlState
              onPageChange={(page) =>
                updateAParam({
                  key: "page",
                  value: page,
                })
              }
              currentPage={Number(queryObject?.page || 1)}
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default OrderHistory;
