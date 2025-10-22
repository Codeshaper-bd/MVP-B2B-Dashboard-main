import Link from "next/link";

import { useGetAllBarInventoryItemQuery } from "@/store/api/bars/bars-api";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import type { TUseProfileBarReturn } from "../../hooks/useGetProfileBarSlug";

function InventoryTable({ barSlug, isValidSlug }: TUseProfileBarReturn) {
  const { data: getAllBarInventoryRes, ...getAllBarInventoryApiState } =
    useGetAllBarInventoryItemQuery({ slug: barSlug }, { skip: !isValidSlug });
  const getAllBarInventoryData = getAllBarInventoryRes?.data;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-default-700">Inventory</h3>
        <Button color="primary" asChild>
          <Link
            href={`/en/inventory/inventory-management/bar-inventory/${barSlug}`}
          >
            View All
          </Link>
        </Button>
      </div>

      <RenderData
        expectedDataType="array"
        {...getAllBarInventoryApiState}
        data={getAllBarInventoryData}
        loadingSkeleton={<TableSkeleton length={5} />}
      >
        <DefaultTable data={getAllBarInventoryData} columns={columns}>
          <DefaultTable.Table />
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default InventoryTable;
