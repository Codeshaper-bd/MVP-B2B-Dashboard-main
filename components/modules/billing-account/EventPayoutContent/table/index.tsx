"use client";
import type { TNullish, TPagination } from "@/store/api/common-api-types";
import type { TGetAnEventPayout } from "@/store/api/events/events.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
interface IPayoutTableProps {
  getAnEventPayoutData: TGetAnEventPayout[] | TNullish;
  getAnEventPayoutPagination: TPagination | undefined;
  getAnEventPayoutApiState: IApiStateInfo;
}
function EventPayoutTable({
  getAnEventPayoutData,
  getAnEventPayoutPagination,
  getAnEventPayoutApiState,
}: IPayoutTableProps) {
  return (
    <RenderData
      expectedDataType="array"
      data={getAnEventPayoutData}
      {...getAnEventPayoutApiState}
      loadingSkeleton={<TableSkeleton />}
      dataNotFoundTitle="No Event Payout Found"
      dataNotFoundDescription="There has been no event payout yet"
    >
      <div className="mt-4">
        <DefaultTable data={getAnEventPayoutData} columns={columns}>
          <DefaultTable.Table />
          <DefaultTable.Footer className="px-6 py-3">
            <BasicPagination
              isLoading={
                getAnEventPayoutApiState.isLoading ||
                getAnEventPayoutApiState.isFetching
              }
              totalPages={getAnEventPayoutPagination?.totalPages || 1}
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </div>
    </RenderData>
  );
}

export default EventPayoutTable;
