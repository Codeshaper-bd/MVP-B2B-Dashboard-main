"use client";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllCustomerLookupQuery } from "@/store/api/customer-lookup/customer-lookup-api";
import type { TGetAllCustomerLookupArgs } from "@/store/api/customer-lookup/customer-lookup.types";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import SearchComponent from "@/components/ui/search-component";

import { columns } from "./columns";
import CustomerListFilter from "../../Filters/CustomerListFilter";
import FiltersValue from "../../Filters/FiltersValue";
import CustomerInviteDialog from "../../modals/customer-invite-dialog";

interface ICustomerListTableProps {
  isHeaderShow?: boolean;
  tableClassName?: string;
}
function CustomerListTable({
  isHeaderShow = true,
  tableClassName,
}: ICustomerListTableProps) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllCustomerLookupArgs, void>>();
  const {
    page,
    search,
    sortBy,
    sortOrder,
    gender,
    birthdayMonth,
    endDate,
    lastPurchase,
    pageSize,
    startDate,
  } = getAllParamValue();

  const { data: allCustomerLookupRes, ...allCustomerLookupApiState } =
    useGetAllCustomerLookupQuery({
      page: page || contentPerPageOptions.initialPage,
      pageSize: pageSize || contentPerPageOptions[10],
      search,
      sortBy,
      sortOrder,
      gender,
      birthdayMonth,
      endDate,
      lastPurchase,
      startDate,
    });
  const allCustomerLookupData = allCustomerLookupRes?.data;
  const allCustomerLookupPagination = allCustomerLookupRes?.pagination;

  return (
    <div>
      {isHeaderShow && (
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <DynamicBreadcrumb className="mb-0 w-fit lg:mb-0" />

          <div className="flex flex-none flex-wrap items-center gap-3">
            <SearchComponent className="min-h-11" />

            <div className="flex flex-row-reverse gap-4 md:flex-row">
              <CustomerListFilter />

              <CustomerInviteDialog />
            </div>
          </div>
        </div>
      )}

      <FiltersValue />
      <div className="h-6"></div>
      <RenderData
        data={allCustomerLookupData}
        expectedDataType="array"
        {...allCustomerLookupApiState}
        loadingSkeleton={<TableSkeleton />}
      >
        <DefaultTable
          data={allCustomerLookupData}
          columns={columns}
          className={tableClassName}
        >
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                allCustomerLookupApiState.isLoading ||
                allCustomerLookupApiState?.isFetching
              }
              totalPages={allCustomerLookupPagination?.totalPages || 1}
              hideForTotalPagesOne
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default CustomerListTable;
