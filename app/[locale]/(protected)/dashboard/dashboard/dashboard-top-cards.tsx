"use client";
import { getFilterText } from "@/lib/getFilterText";
import { useGetDashboardRevenueAndPointsQuery } from "@/store/api/dashboard/dashboard-api";
import { selectFilter } from "@/store/features/dashboard";
import { useAppSelector } from "@/store/hooks";
import { DatabaseIcon as DataBaseIcon } from "@/components/icons";
import { DollarIcon as DollarIcon } from "@/components/icons";
import RenderData from "@/components/render-data";
import PointsGivenSkeleton from "@/components/skeleton/points-given-skeleton";
import RevenueCardSkeleton from "@/components/skeleton/revenue-card-skeleton";
import { PointsBlock } from "@/components/widgets/points-block";
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
  const clientEnv = {
    NEXT_PUBLIC_NODE_ENV: process.env["NEXT_PUBLIC_NODE_ENV"],
    API_BASE_URL: process.env["NEXT_PUBLIC_API_BASE_URL"],
    firebase: {
      FIREBASE_API_KEY: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
      FIREBASE_AUTH_DOMAIN: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
      FIREBASE_DATABASE_URL: process.env["NEXT_PUBLIC_FIREBASE_DATABASE_URL"],
      FIREBASE_PROJECT_ID: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
      FIREBASE_STORAGE_BUCKET:
        process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
      FIREBASE_MESSAGING_SENDER_ID:
        process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
      FIREBASE_APP_ID: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
      FIREBASE_MEASUREMENT_ID:
        process.env["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"],
    },
    SITE_URL: process.env["NEXT_PUBLIC_SITE_URL"],
    GOOGLE_MAP_API_KEY:
      process.env["NEXT_PUBLIC_GOOGLE_MAP_API_KEY"] ||
      "AIzaSyAeawqzVqzLkwy_aaWUTwkwd21psfUqczo",
  } as const;
  console.log("clientEnv", clientEnv);
  return (
    <RenderData
      expectedDataType="object"
      data={getDashboardRevenueAndPointsData}
      {...getDashboardRevenueAndPointsApiState}
      loadingSkeleton={
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <RevenueCardSkeleton />
          <PointsGivenSkeleton />
        </div>
      }
    >
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <SalesBlock
          title="Sales Revenue"
          total={`${getDashboardRevenueAndPointsData?.salesRevenue ?? "0"}`}
          chartColor="#47CD89"
          icon={<DollarIcon className="h-4 w-4 text-default-1000" />}
          percentage={`${getDashboardRevenueAndPointsData?.revenueChangePercent ?? "0"}`}
          href="/dashboard/sales-revenue"
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

        <PointsBlock
          title="Points Given Out"
          total={getDashboardRevenueAndPointsData?.pointsGiven}
          icon={<DataBaseIcon className="h-4 w-4 text-default-1000" />}
          href="/dashboard/promotions"
          // filterLabel={getFilterText(activeTime)}
        />
      </div>
    </RenderData>
  );
}

export default DashboardTopCards;
