"use client";
import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { useGetLatestRevenueQuery } from "@/store/api/sales-revenue/sales-revenue-api";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import { Link } from "@/components/navigation";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";

function LatestEventRevenueViewTable() {
  // get date range from context
  const {
    values: { dateRange, event, activeTime },
  } = useSalesRevenueFilterContext();
  // get total sales revenue from api
  const eventId = event?.value?.value;
  const { data: getLatestRevenueRes, ...getLatestRevenueApiState } =
    useGetLatestRevenueQuery({
      startDate:
        activeTime.value === "all"
          ? undefined
          : convertLocalToUTC({
              localDateTime: dateRange?.value?.from,
              type: "startOfDay",
            }),
      endDate:
        activeTime.value === "all"
          ? undefined
          : convertLocalToUTC({
              localDateTime: dateRange?.value?.to,
              type: "endOfDay",
            }),
      pageSize: 3,
      eventIds: eventId !== undefined ? [String(eventId)].join(",") : undefined,
    });

  const getLatestRevenueData = getLatestRevenueRes?.data;
  return (
    <DefaultTable data={getLatestRevenueData} columns={columns}>
      <DefaultTable.TitleContainer>
        <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
          Latest event revenue
        </DefaultTable.TitleContainer.Title>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={getLatestRevenueData}
        {...getLatestRevenueApiState}
        loadingSkeleton={<TableSkeleton length={3} />}
      >
        <DefaultTable.Table />
      </RenderData>

      <DefaultTable.Footer className="p-4">
        <Button asChild fullWidth color="secondary">
          <Link href="./sales-revenue/latest-event-revenue">
            View More <RightArrowIcon className="ms-2 size-3" />
          </Link>
        </Button>
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default LatestEventRevenueViewTable;
