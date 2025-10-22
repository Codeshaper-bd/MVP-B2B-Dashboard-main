import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { getFilterText, getFilterTextDetails } from "@/lib/getFilterText";
import { useGetTotalSalesRevenueQuery } from "@/store/api/sales-revenue/sales-revenue-api";
import DollarIcon from "@/components/icons/DollarIcon";
import PieChartIcon from "@/components/icons/PieChartIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import RenderData from "@/components/render-data";
import { StatisticsBlock } from "@/components/widgets/statistics-block";

import TopCardSkeleton from "./top-card-skeleton";

function TopCards() {
  // get date range from context
  const {
    values: { dateRange, event, activeTime },
  } = useSalesRevenueFilterContext();
  // get total sales revenue from api
  const eventId = event?.value?.value;
  const { data: getTotalSalesRevenueRes, ...getTotalSalesRevenueApiState } =
    useGetTotalSalesRevenueQuery({
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
      eventIds: eventId !== undefined ? [String(eventId)].join(",") : undefined,
    });
  const getTotalSalesRevenueData = getTotalSalesRevenueRes?.data;
  const {
    totalRevenue,
    barRevenue,
    ticketRevenue,
    barRevenueGraph,
    revenueGraph: totalRevenueGraph,
    ticketRevenueGraph,
  } = getTotalSalesRevenueData || {};

  return (
    <RenderData
      expectedDataType="object"
      data={getTotalSalesRevenueData}
      {...getTotalSalesRevenueApiState}
      loadingSkeleton={<TopCardSkeleton />}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <StatisticsBlock
          title="Total Revenue"
          total={totalRevenue?.value}
          chartColor={totalRevenue?.increased ? "#47CD89" : "#F97066"}
          icon={<DollarIcon className="h-5 w-5 text-default-1000" />}
          percentage={`${totalRevenue?.percentage ?? "0"}`}
          isIncrease={totalRevenue?.increased ?? false}
          series={[
            {
              name: "Revenue",
              data: totalRevenueGraph?.series || [],
            },
          ]}
          filterLabel={getFilterText(activeTime.value)}
          tooltipContent={getFilterTextDetails(activeTime.value)}
        />

        <StatisticsBlock
          title="Bar Revenue"
          total={barRevenue?.value}
          chartColor={barRevenue?.increased ? "#47CD89" : "#F97066"}
          icon={<PieChartIcon className="h-5 w-5 text-default-1000" />}
          percentage={`${barRevenue?.percentage ?? "0"}`}
          isIncrease={barRevenue?.increased ?? false}
          series={[
            {
              name: "Bar Revenue",
              data: barRevenueGraph?.series || [],
            },
          ]}
          filterLabel={getFilterText(activeTime.value)}
          tooltipContent={getFilterTextDetails(activeTime.value)}
        />

        <StatisticsBlock
          title="Ticket Revenue"
          total={ticketRevenue?.value}
          chartColor={ticketRevenue?.increased ? "#47CD89" : "#F97066"}
          icon={<TicketIcon className="h-5 w-5 text-default-1000" />}
          percentage={`${ticketRevenue?.percentage ?? "0"}`}
          isIncrease={ticketRevenue?.increased ?? false}
          series={[
            {
              name: "Ticket Revenue",
              data: ticketRevenueGraph?.series || [],
            },
          ]}
          filterLabel={getFilterText(activeTime.value)}
          tooltipContent={getFilterTextDetails(activeTime.value)}
        />
      </div>
    </RenderData>
  );
}

export default TopCards;
