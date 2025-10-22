"use client";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { columns } from "./columns";
import { useEventOrderDetailsContext } from "../order-item-provider";

function OrderItemTable() {
  const { getAnEventOrderDetails, getAnEventOrderDetailsApiState } =
    useEventOrderDetailsContext();
  const { itemsPurchased } = getAnEventOrderDetails || {};

  return (
    <Card className="border border-default-100">
      <CardHeader className="space-y-1 !py-4">
        <CardTitle className="font-semibold">Items Purchased</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden !p-0">
        <RenderData
          expectedDataType="array"
          data={itemsPurchased}
          {...getAnEventOrderDetailsApiState}
          loadingSkeleton={<TableSkeleton />}
        >
          <DefaultTable
            className="rounded-t-none border-0"
            data={itemsPurchased || []}
            columns={columns}
          >
            <DefaultTable.Table />
          </DefaultTable>
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default OrderItemTable;
