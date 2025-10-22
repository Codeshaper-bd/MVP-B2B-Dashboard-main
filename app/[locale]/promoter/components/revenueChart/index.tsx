"use client";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetPromotersTicketSoldRevenueQuery } from "@/store/api/promoter/promoter-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export type TPageParams = Params & {
  locale: string;
  eventSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  organizationId: string;
};
function RevenueChart() {
  const { eventSlug } = useParams<TPageParams>();
  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });
  const { getAParamValue } = useManageSearchParams<{
    ticketTierId: TIdOrSlugOrIdentifier<"id">["id"];
  }>();
  const ticketTierId = getAParamValue("ticketTierId");
  const {
    data: getPromotersTicketSoldRevenueRes,
    ...getPromotersTicketSoldRevenueApiState
  } = useGetPromotersTicketSoldRevenueQuery(
    {
      slug: eventSlug,
      ticketTierId: ticketTierId ? [Number(ticketTierId)] : undefined,
    },
    {
      skip: !isProbableValidSlugFound,
    },
  );
  const getPromotersTicketSoldRevenueData =
    getPromotersTicketSoldRevenueRes?.data;

  const chartCategories = getPromotersTicketSoldRevenueData?.category;
  const chartSeries = getPromotersTicketSoldRevenueData?.series?.map((item) =>
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
      <CardContent className="p-5 pt-2">
        <RenderData
          expectedDataType="object"
          data={getPromotersTicketSoldRevenueData}
          {...getPromotersTicketSoldRevenueApiState}
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

export default RevenueChart;
