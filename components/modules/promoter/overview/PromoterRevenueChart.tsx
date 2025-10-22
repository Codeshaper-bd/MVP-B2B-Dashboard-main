"use client";

import { convertToNumber } from "@/lib/data-types/number";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetAPromoterTicketSoldRevenueQuery } from "@/store/api/promoters/promoters-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IPromoterRevenueChart {
  eventSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"];
  promoterId?: TIdOrSlugOrIdentifier<"id">["id"];
}
function PromoterRevenueChart({
  eventSlug,
  ticketTierId,
  promoterId,
}: IPromoterRevenueChart) {
  const {
    data: promoterTicketSoldRevenueResponse,
    ...promoterTicketSoldRevenueApiState
  } = useGetAPromoterTicketSoldRevenueQuery(
    {
      promoterId,
      eventSlug: eventSlug || "",
      ticketTierId,
    },
    {
      skip: !eventSlug || promoterId === "-1",
    },
  );

  const promoterTicketSoldRevenueData = promoterTicketSoldRevenueResponse?.data;
  const chartCategories = promoterTicketSoldRevenueData?.category;
  const chartSeries = promoterTicketSoldRevenueData?.series?.map((item) =>
    convertToNumber({
      value: item,
      digit: 2,
    }),
  );
  return (
    <Card className="border border-default-100 bg-default">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <RenderData
          expectedDataType="object"
          data={promoterTicketSoldRevenueData}
          {...promoterTicketSoldRevenueApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            series={[
              {
                name: "Revenue",
                data: chartSeries || [],
              },
            ]}
            categories={chartCategories || []}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default PromoterRevenueChart;
