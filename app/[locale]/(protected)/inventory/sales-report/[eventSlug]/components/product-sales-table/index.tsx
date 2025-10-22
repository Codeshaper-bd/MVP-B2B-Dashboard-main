"use client";
import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetSalesReportItemListQuery } from "@/store/api/sales-report/sales-report-api";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
import ProductSalesSearch from "./product-sales-search";

function ProductSalesTable() {
  const { getAllParamValue } = useManageSearchParams();
  const queryObject = getAllParamValue();
  const { data: getSalesReportItemListRes, ...getSalesReportItemListApiState } =
    useGetSalesReportItemListQuery({
      ...queryObject,
      pageSize: contentPerPageOptions[10],
    });
  const getSalesReportItemListData = getSalesReportItemListRes?.data;
  const getSalesReportItemListPagination =
    getSalesReportItemListRes?.pagination;
  return (
    <DefaultTable data={getSalesReportItemListData} columns={columns}>
      <DefaultTable.TitleContainer className="flex flex-wrap items-center gap-2 p-6">
        <span className="flex-1 whitespace-nowrap text-lg font-semibold text-default-900">
          Sales by Product
        </span>
        <ProductSalesSearch />
      </DefaultTable.TitleContainer>
      <RenderData
        data={getSalesReportItemListData}
        expectedDataType="array"
        {...getSalesReportItemListApiState}
        loadingSkeleton={<TableSkeleton />}
      >
        <DefaultTable.Table />

        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getSalesReportItemListApiState.isLoading ||
              getSalesReportItemListApiState.isFetching
            }
            totalPages={getSalesReportItemListPagination?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default ProductSalesTable;
