import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAnEventOrdersQuery } from "@/store/api/order-history/order-history-api";
import type { TGetAnEventOrdersArgs } from "@/store/api/order-history/order-history.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
type TPageParams = Params & {
  locale: string;
  eventSlug: string;
};
function OrderListTable() {
  const { eventSlug } = useParams<TPageParams>();

  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAnEventOrdersArgs, void>>();
  const { page, pageSize } = getAllParamValue();
  const { data: getAnEventOrdersRes, ...getAnEventOrdersApiState } =
    useGetAnEventOrdersQuery(
      {
        slug: eventSlug,
        page: page || 1,
        pageSize: pageSize || 10,
      },

      {
        skip: !isProbableValidSlugFound,
      },
    );
  const getAnEventOrdersData = getAnEventOrdersRes?.data;
  const getAnEventOrdersPagination = getAnEventOrdersRes?.pagination;

  return (
    <RenderData
      data={getAnEventOrdersData}
      expectedDataType="array"
      {...getAnEventOrdersApiState}
      loadingSkeleton={<TableSkeleton />}
    >
      <DefaultTable data={getAnEventOrdersData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getAnEventOrdersApiState.isLoading ||
              getAnEventOrdersApiState.isFetching
            }
            totalPages={getAnEventOrdersPagination?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default OrderListTable;
