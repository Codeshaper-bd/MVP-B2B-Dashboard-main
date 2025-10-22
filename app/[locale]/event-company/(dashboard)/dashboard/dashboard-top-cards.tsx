"use client";
import { getFilterText } from "@/lib/getFilterText";
import { useGetDashboardRevenueAndPointsQuery } from "@/store/api/dashboard/dashboard-api";
import { selectFilter } from "@/store/features/dashboard";
import { useAppSelector } from "@/store/hooks";
import DollarIcon from "@/components/icons/DollarIcon";
import RenderData from "@/components/render-data";
import RevenueCardSkeleton from "@/components/skeleton/revenue-card-skeleton";
import { SalesBlock } from "@/components/widgets/sales-block";

function DashboardTopCards() {
  const activeTime = useAppSelector(selectFilter);
  const {
    data: getDashboardRevenueAndPointsRes,
    ...getDashboardRevenueAndPointsApiState
  } = useGetDashboardRevenueAndPointsQuery({
    range: activeTime,
  });
  const getDashboardRevenueAndPointsData =
    getDashboardRevenueAndPointsRes?.data;

  return (
    <RenderData
      expectedDataType="object"
      data={getDashboardRevenueAndPointsData}
      {...getDashboardRevenueAndPointsApiState}
      loadingSkeleton={
        <div className="mb-6">
          <RevenueCardSkeleton />
        </div>
      }
    >
      <div className="mb-6">
        <SalesBlock
          title="Sales Revenue"
          total={`${getDashboardRevenueAndPointsData?.salesRevenue ?? "0"}`}
          chartColor="#47CD89"
          icon={<DollarIcon className="h-4 w-4 text-default-1000" />}
          percentage={`${getDashboardRevenueAndPointsData?.revenueChangePercent ?? "0"}`}
          href="/event-company/sales-revenue"
          isIncrease={
            getDashboardRevenueAndPointsData?.isRevenueIncreased ?? false
          }
          chartType="area"
          series={[
            {
              name:
                getDashboardRevenueAndPointsData?.revenueOverTime?.name ?? "",
              data:
                getDashboardRevenueAndPointsData?.revenueOverTime?.series ?? [],
            },
          ]}
          filterLabel={getFilterText(activeTime)}
        />
      </div>
    </RenderData>
  );
}

export default DashboardTopCards;
