import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import { convertToNumber } from "@/lib/data-types/number";
import { useGetPastEventRevenueOverviewQuery } from "@/store/api/past-event/past-event-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import { DollarIcon as DollarIcon } from "@/components/icons";
import PieChartIcon from "@/components/icons/PieChartIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import RevenueCardSkeleton from "@/components/skeleton/revenue-card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticsBlock } from "@/components/widgets/statistics-block";

function TopCards() {
  const { getAnEventData } = useFetchAnEventData();
  const eventSlug = getAnEventData?.details?.slug;
  const {
    data: getPastEventRevenueOverviewRes,
    ...getPastEventRevenueOverviewApiState
  } = useGetPastEventRevenueOverviewQuery({
    slug: eventSlug,
  });

  const {
    barRevenue,
    barRevenueGraph,
    guestlistRevenue,
    revenueGraph,
    ticketRevenueGraph,
    totalRevenue,
    revenueOverTime,
  } = getPastEventRevenueOverviewRes?.data || {};

  const getPastEventRevenueOverviewData = getPastEventRevenueOverviewRes?.data;

  const totalRevenueValue = convertToNumber({
    value: totalRevenue,
  });
  const barRevenueValue = convertToNumber({
    value: barRevenue,
  });
  const ticketRevenueValue = convertToNumber({
    value: guestlistRevenue,
  });

  return (
    <>
      <RenderData
        expectedDataType="object"
        data={getPastEventRevenueOverviewData}
        {...getPastEventRevenueOverviewApiState}
        loadingSkeleton={
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <RevenueCardSkeleton />
            <RevenueCardSkeleton />
            <RevenueCardSkeleton />
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-6 overflow-hidden pt-3 lg:grid-cols-3">
          <StatisticsBlock
            title="Total Revenue"
            total={totalRevenueValue}
            chartColor="#F97066"
            icon={<DollarIcon className="h-5 w-5 text-default-1000" />}
            percentage="10"
            isIncrease={false}
            hasFooter={false}
            titleClassName="mb-2.5"
            series={[
              {
                name: "Total Revenue",
                data: revenueGraph?.series || [],
              },
            ]}
            chartCategories={revenueGraph?.category || []}
          />

          <StatisticsBlock
            title="Bar Revenue"
            total={barRevenueValue}
            chartColor="#47CD89"
            icon={<PieChartIcon className="h-5 w-5 text-default-1000" />}
            percentage="40"
            series={[
              {
                name: "Bar Revenue",
                data: barRevenueGraph?.series || [],
              },
            ]}
            hasFooter={false}
            titleClassName="mb-2.5"
          />

          <StatisticsBlock
            title="Ticket Revenue"
            total={ticketRevenueValue}
            chartColor="#47CD89"
            icon={<TicketIcon className="h-5 w-5 text-default-1000" />}
            percentage="10"
            isIncrease={true}
            series={[
              {
                name: "Ticket Revenue",
                data: ticketRevenueGraph?.series || [],
              },
            ]}
            hasFooter={false}
            titleClassName="mb-2.5"
          />
        </div>
      </RenderData>
      <Card>
        <CardHeader>
          <CardTitle className="text-center"> Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <RenderData
            expectedDataType="object"
            data={getPastEventRevenueOverviewData}
            {...getPastEventRevenueOverviewApiState}
            loadingSkeleton={<AreaChartSkeleton />}
          >
            <ApexAreaChart
              categories={revenueOverTime?.category || []}
              series={[
                {
                  name: revenueOverTime?.revenue?.[2]?.name || "",
                  data: revenueOverTime?.revenue?.[2]?.data || [],
                },
              ]}
              colors={["#17B26A", "#F79009", "#D92D20"]}
              height={200}
            />
          </RenderData>
        </CardContent>
      </Card>
    </>
  );
}

export default TopCards;
