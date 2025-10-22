"use client";

import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TGetPromoterRevenueArgs,
  TPromoterRevenueData,
} from "@/store/api/promoters/promoters.types";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import { Button } from "@/components/ui/button";

import { timeRanges } from "./utils";

function RevenueChart({
  getPromoterRevenueData,
  manageStateParams,
}: {
  getPromoterRevenueData: TPromoterRevenueData | TNullish;
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPromoterRevenueArgs, void>
  >;
}) {
  const { updateAParam, getAllParamValue } = manageStateParams;
  const { timeRange = "12h" } = getAllParamValue();
  return (
    <div>
      <div className="flex flex-wrap items-center gap-0.5">
        {timeRanges?.map(({ label, value }, index) => (
          <Button
            key={`range-${index}`}
            onClick={() => {
              updateAParam({
                key: "timeRange",
                value,
              });
            }}
            data-state={timeRange === value ? "active" : "inactive"}
            className="border-none bg-transparent !px-3 text-default-600 hover:bg-secondary data-[state=active]:bg-secondary data-[state=active]:text-primary"
          >
            {label}
          </Button>
        ))}
      </div>
      <ApexAreaChart
        categories={getPromoterRevenueData?.revenue?.category || []}
        series={[
          {
            name: "Revenue",
            data: getPromoterRevenueData?.revenue?.series || [],
          },
        ]}
      />
    </div>
  );
}

export default RevenueChart;
