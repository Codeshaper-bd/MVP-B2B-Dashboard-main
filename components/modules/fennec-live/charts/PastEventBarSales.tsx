import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetPastEventBarQuery } from "@/store/api/past-event/past-event-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface IPastEventBarSalesProps {
  eventSlug: string | TNullish;
}
function PastEventBarSales({ eventSlug }: IPastEventBarSalesProps) {
  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });
  const { data: getPastEventBarRes, ...getPastEventBarApiState } =
    useGetPastEventBarQuery(
      {
        slug: eventSlug,
      },
      {
        skip: !isProbableValidSlugFound,
      },
    );
  const getPastEventBarData = getPastEventBarRes?.data;
  const { statistic } = getPastEventBarData || {};

  // area chart

  const chartCategories = statistic?.[0]?.time || [];
  const chartSeries = statistic?.map((item) => ({
    name: item?.name || "",
    data: item?.sales || [],
  }));

  return (
    <Card>
      <CardHeader className="md:pb-0">
        <CardTitle>Bar Sales</CardTitle>
      </CardHeader>
      <CardContent className="py-3 pt-0">
        <RenderData
          expectedDataType="object"
          data={getPastEventBarData}
          {...getPastEventBarApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={chartCategories}
            series={chartSeries || []}
            colors={["#17B26A", "#F04438", "#FEC84B", "#FDA29B"]}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default PastEventBarSales;
