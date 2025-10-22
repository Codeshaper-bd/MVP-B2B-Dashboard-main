"use Client";
import React, { useState } from "react";

import useManageStateParams from "@/hooks/useManageStateParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import { useGetPromoterRevenueQuery } from "@/store/api/promoters/promoters-api";
import type { TGetPromoterRevenueArgs } from "@/store/api/promoters/promoters.types";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataNotFound from "@/components/ui/data-not-found";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ComparePromoterForm from "./forms";
import RevenueChart from "./revenueChart";
import { revenueFilterOptions, type TRevenueOptions } from "./utils";
interface CompareModalContentProps {
  defaultPromoterId?: string | number | TNullish;
}

function CompareModalContent({ defaultPromoterId }: CompareModalContentProps) {
  // state
  const [selectedPromoterId, setSelectedPromoterId] = useState<
    TIdOrSlugOrIdentifier<"id">["id"] | TNullish
  >(defaultPromoterId);
  const [selectedCategory, setSelectedCategory] = useState<TRevenueOptions>(
    revenueFilterOptions[0],
  );
  const manageStateParams =
    useManageStateParams<Exclude<TGetPromoterRevenueArgs, void>>();
  const { getAllParamValue, updateAParam } = manageStateParams;
  const { id, timeRange = "12h", type = "revenue" } = getAllParamValue();
  // get api data
  const { data: getPromoterRevenueRes, ...getPromoterRevenueApiState } =
    useGetPromoterRevenueQuery(
      {
        id: selectedPromoterId ?? -1,
        type,
        timeRange,
      },
      {
        skip: !checkIsValidId(selectedPromoterId),
      },
    );
  const getPromoterRevenueData = getPromoterRevenueRes?.data;

  return (
    <div className="space-y-5 rounded-[12px] bg-[#121722] p-5">
      <ComparePromoterForm
        defaultPromoterId={defaultPromoterId}
        onPromoterChange={setSelectedPromoterId}
      />

      <Tabs
        defaultValue={type}
        className="w-full"
        onValueChange={(value) => {
          updateAParam({
            key: "type",
            value,
          });
        }}
      >
        <TabsList className="mb-5 grid w-full grid-cols-2 border bg-default">
          <TabsTrigger className="active:bg-default-50" value="revenue">
            Revenue
          </TabsTrigger>
          <TabsTrigger className="active:bg-default-50" value="guestlist">
            Guest List
          </TabsTrigger>
        </TabsList>
        <RenderData
          expectedDataType="object"
          data={getPromoterRevenueData}
          {...getPromoterRevenueApiState}
          loadingSkeleton={<AreaChartSkeleton />}
          uninitializedSkeleton={<DataNotFound />}
        >
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart
                  getPromoterRevenueData={getPromoterRevenueData}
                  manageStateParams={manageStateParams}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="guestlist">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex flex-1 flex-col p-4">
                  <span className="text-xs font-medium text-default-600">
                    Total Guestlist
                  </span>
                  {getPromoterRevenueData?.totalGuestlist ?? 0}
                </CardTitle>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        color="secondary"
                        className="flex items-center gap-1 [&[data-state=open]>svg]:rotate-180"
                      >
                        {selectedCategory?.label}
                        <ChevronDownIcon className="mt-[3px] h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-fit rounded-[8px] bg-default-50 sm:w-[200px]"
                      align="end"
                    >
                      {revenueFilterOptions?.map((item, index) => (
                        <DropdownMenuItem
                          key={`revenue-filter-${index}`}
                          onClick={() => setSelectedCategory?.(item)}
                          className="cursor-pointer rounded-[6px] px-2.5 py-2 data-[state=active]:bg-default-100 data-[state=active]:text-primary"
                          data-state={
                            selectedCategory?.value === item.value
                              ? "active"
                              : "inactive"
                          }
                        >
                          {item?.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <RevenueChart
                  getPromoterRevenueData={getPromoterRevenueData}
                  manageStateParams={manageStateParams}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </RenderData>
      </Tabs>
    </div>
  );
}

export default CompareModalContent;
