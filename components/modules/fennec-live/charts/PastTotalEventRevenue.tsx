import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetPastEventRevenueOverviewQuery } from "@/store/api/past-event/past-event-api";
import ApexDonutChart from "@/components/charts/apex-donut-chart";
import RenderData from "@/components/render-data";
import TotalEventRevenueSkeleton from "@/components/skeleton/total-revenue-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IPastTotalEventRevenue {
  eventSlug: string;
}
function PastTotalEventRevenue({ eventSlug }: IPastTotalEventRevenue) {
  const {
    data: getPastEventRevenueOverviewRes,
    ...getPastEventRevenueOverviewApiState
  } = useGetPastEventRevenueOverviewQuery(
    {
      slug: eventSlug,
    },
    {
      skip: !checkIsValidId(eventSlug, { type: "string" }),
    },
  );

  const getPastEventRevenueOverviewData = getPastEventRevenueOverviewRes?.data;

  // donut chart

  const { barRevenue, guestlistRevenue } =
    getPastEventRevenueOverviewData || {};

  const barRevenueNumber = convertToNumber({ value: barRevenue || 0 });
  const guestlistRevenueNumber = convertToNumber({
    value: guestlistRevenue || 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm md:text-lg">
          Total Event Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RenderData
          expectedDataType="object"
          data={getPastEventRevenueOverviewData}
          {...getPastEventRevenueOverviewApiState}
          loadingSkeleton={<TotalEventRevenueSkeleton />}
        >
          <ApexDonutChart
            labels={["GuestList", "Bar"]}
            series={[guestlistRevenueNumber, barRevenueNumber]}
            height={200}
            totalValueFormatterText="$"
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default PastTotalEventRevenue;
