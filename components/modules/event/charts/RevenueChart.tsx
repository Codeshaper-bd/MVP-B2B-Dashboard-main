import { useState, useMemo, useCallback } from "react";

import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import { useGetAnEventRevenueQuery } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TActiveItem = TIdOrSlugOrIdentifier<"id">["id"] | "all";

type TButtonItem = {
  id: TActiveItem;
  name: string;
};

interface IRevenueChartProps {
  event: TEvent | TNullish;
}

function RevenueChart({ event }: IRevenueChartProps) {
  const eventSlug = event?.details?.slug;
  const [activeItem, setActiveItem] = useState<TActiveItem>("all");

  const { data: revenueData, ...apiState } = useGetAnEventRevenueQuery({
    slug: eventSlug,
    ticketTierId: activeItem === "all" ? undefined : Number(activeItem),
  });

  const eventRevenueData = revenueData?.data;

  // Memoize button items to prevent unnecessary re-renders
  const buttonItems = useMemo((): TButtonItem[] => {
    const baseItems: TButtonItem[] = [{ id: "all", name: "View All Tier" }];

    const tierItems: TButtonItem[] =
      eventRevenueData?.ticketTiers?.map((tier) => ({
        id: tier?.id,
        name: tier?.name || `Tier ${tier?.id}`,
      })) || [];

    return [...baseItems, ...tierItems];
  }, [eventRevenueData?.ticketTiers]);

  // Memoize chart series data
  const chartSeries = useMemo(() => {
    if (!eventRevenueData?.series) {
      return [];
    }

    const seriesName =
      activeItem === "all"
        ? "All Tiers"
        : eventRevenueData.ticketTiers?.find((tier) => tier?.id === activeItem)
            ?.name || "Selected Tier";

    return [
      {
        name: seriesName,
        data: eventRevenueData.series,
      },
    ];
  }, [eventRevenueData?.series, eventRevenueData?.ticketTiers, activeItem]);

  // Memoize button click handler
  const handleButtonClick = useCallback((itemId: TActiveItem) => {
    setActiveItem(itemId);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filter Buttons */}
        <div className="inline-flex flex-wrap rounded-md border border-default-200">
          {buttonItems.map((item, index) => (
            <Button
              key={`revenue-button-${item.id}-${index}`}
              data-state={activeItem === item.id ? "active" : "inactive"}
              className="h-10 rounded-none border-r first:rounded-s-md last:rounded-e-md data-[state=active]:bg-[#1F242F] data-[state=active]:text-primary"
              onClick={() => handleButtonClick(item.id)}
            >
              {item.name}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <RenderData
          expectedDataType="object"
          data={eventRevenueData}
          {...apiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={eventRevenueData?.category || []}
            series={chartSeries}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
