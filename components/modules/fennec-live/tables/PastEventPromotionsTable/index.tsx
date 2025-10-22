"use client";

import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetPastEventPromotionsQuery } from "@/store/api/past-event/past-event-api";
import type { TGetPastEventPromotionArgs } from "@/store/api/past-event/past-event.types";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns } from "./columns";
const sortOptions = [
  { value: "uses", label: "Uses" },
  { value: "revenue", label: "Revenue" },
] as const;
interface IPastEventChallengesTable {
  eventSlug: string;
}
function PastEventPromotionsTable({ eventSlug }: IPastEventChallengesTable) {
  const { getAParamValue, updateAParam } =
    useManageStateParams<
      Exclude<TGetPastEventPromotionArgs, void | undefined>
    >();
  const sortBy = getAParamValue("sortBy") || "uses";

  const { data: getPastEventPromotionsRes, ...getPastEventPromotionsApiState } =
    useGetPastEventPromotionsQuery({
      slug: eventSlug,
      sortBy,
    });
  const getPromotionsData = getPastEventPromotionsRes?.data;

  return (
    <RenderData
      expectedDataType="array"
      data={getPromotionsData}
      {...getPastEventPromotionsApiState}
      loadingSkeleton={<TableSkeleton />}
      dataNotFoundTitle="No Live Promotions Found"
      dataNotFoundSubtitle="No live promotions found for this event."
    >
      <DefaultTable data={getPromotionsData} columns={columns}>
        <DefaultTable.TitleContainer className="flex-wrap gap-2">
          <DefaultTable.TitleContainer.Title className="flex-nowrap text-sm md:text-lg">
            Live Promotions
          </DefaultTable.TitleContainer.Title>

          <div className="flex items-center gap-1.5">
            <p className="text-nowrap text-sm font-medium leading-5 text-default-700">
              Sort By:
            </p>

            <Select
              onValueChange={(value) => {
                updateAParam({
                  key: "sortBy",
                  value,
                });
              }}
              value={sortBy}
            >
              <SelectTrigger className="min-w-[120px] capitalize">
                <SelectValue placeholder="Select">
                  <span className="mr-2 text-base font-medium leading-6 text-default-900">
                    {sortBy.toString() || "Select"}
                  </span>
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="bg-black">
                <SelectGroup className="bg-black bg-opacity-20">
                  {sortOptions?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="!bg-black !text-default-900 hover:!bg-white/20 hover:!text-default-900"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DefaultTable.TitleContainer>

        <DefaultTable.Table />
      </DefaultTable>
    </RenderData>
  );
}

export default PastEventPromotionsTable;
