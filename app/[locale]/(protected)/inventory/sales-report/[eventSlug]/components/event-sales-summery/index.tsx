import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetSalesReportByAnEventQuery } from "@/store/api/sales-report/sales-report-api";
import BankNoteIcon from "@/components/icons/BankNoteIcon";
import { DollarIcon as DollarIcon } from "@/components/icons";
import TicketIcon from "@/components/icons/TicketIcon";
import WineIcon from "@/components/icons/WineIcon";
import RenderData from "@/components/render-data";
import RevenueCardSkeleton from "@/components/skeleton/revenue-card-skeleton";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { StatisticsBlock } from "@/components/widgets/statistics-block";

import BarSalesChart from "./bar-sales-chart";

function EventSalesSummery({
  eventSlug,
}: {
  eventSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
}) {
  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });

  const {
    data: getSalesReportByAnEventRes,
    ...getSalesReportByAnEventApiState
  } = useGetSalesReportByAnEventQuery(
    {
      slug: eventSlug,
    },
    {
      skip: !isProbableValidSlugFound,
    },
  );
  const getSalesReportByAnEventData = getSalesReportByAnEventRes?.data;
  return (
    <div>
      <RenderData
        expectedDataType="object"
        data={getSalesReportByAnEventData}
        {...getSalesReportByAnEventApiState}
        loadingSkeleton={
          <SkeletonWrapper size={1}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <RevenueCardSkeleton />
              <RevenueCardSkeleton />
              <RevenueCardSkeleton />
              <RevenueCardSkeleton />
            </div>
          </SkeletonWrapper>
        }
      >
        <div className="grid grid-cols-1 gap-6 overflow-hidden pt-3 lg:grid-cols-2">
          <StatisticsBlock
            title="Total Revenue"
            total={getSalesReportByAnEventData?.totalRevenue}
            chartColor="#47CD89"
            icon={<DollarIcon className="h-5 w-5 text-default-1000" />}
            hasFooter={false}
          />

          <StatisticsBlock
            title="Average Customer Spend"
            total={getSalesReportByAnEventData?.averageCustomerSpend}
            chartColor="#47CD89"
            icon={<TicketIcon className="h-5 w-5 text-default-1000" />}
            series={[
              {
                name: "Average Customer Spend",
                data: [1000, 600, 1000, 800, 600, 1000, 800, 0],
              },
            ]}
            hasFooter={false}
          />

          <StatisticsBlock
            title="Lost Revenue"
            total={getSalesReportByAnEventData?.lostRevenue}
            isNegative={true}
            chartColor="#F97066"
            icon={<BankNoteIcon className="h-5 w-5 text-default-1000" />}
            series={[
              {
                name: "Lost Revenue",
                data: [1000, 600, 1000, 800, 600, 1000, 800, 0],
              },
            ]}
            hasFooter={false}
          />

          <StatisticsBlock
            title="Wastage/Theft"
            total={getSalesReportByAnEventData?.wastageRevenue}
            chartColor="#47CD89"
            unit="Oz"
            icon={<WineIcon className="h-5 w-5 text-default-1000" />}
            series={[
              {
                name: "Wastage/Theft",
                data: [1000, 600, 1000, 800, 600, 1000, 800, 0],
              },
            ]}
            hasFooter={false}
          />
        </div>
      </RenderData>
      <div className="h-6"></div>
      <BarSalesChart eventSlug={eventSlug} />
    </div>
  );
}

export default EventSalesSummery;
