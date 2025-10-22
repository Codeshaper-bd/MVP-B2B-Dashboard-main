"use client";

import { useParams } from "next/navigation";
import { memo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import {
  type TSoldBy,
  type TGetAllInventoryItemArgs,
} from "@/store/api/inventory-item/inventory-item.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns, handleSubComponent } from "./columns";
import { data } from "./data";

export interface ICurrentInventoryTable {
  barProductType?: string;
  // barBottleType?: TInventoryBottleType;
  soldBy?: TSoldBy;
}
function CashOutSummaryTable({ barProductType }: ICurrentInventoryTable) {
  const { inventoryType } = useParams();
  const { getAllParamValue } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemArgs, void | undefined>
    >();
  const queryObject = getAllParamValue();

  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.TitleContainer className="text-lg font-semibold text-default-900">
        Cashout Summary
      </DefaultTable.TitleContainer>
      <DefaultTable.Table renderSubComponent={handleSubComponent} />

      <DefaultTable.Footer>
        <BasicPagination
          isLoading={false}
          totalPages={1}
          hideForTotalPagesOne
        />
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default memo(CashOutSummaryTable);
