"use client";

import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetFennecLiveB2BChallengesQuery } from "@/store/api/fennec-live/fennec-live-api";
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

function LiveChallengesTable() {
  const { getAParamValue, updateAParam } = useManageStateParams();
  const sortBy = getAParamValue<string>("sortBy") || "uses";

  const { data: getChallengesRes, ...getChallengesApiState } =
    useGetFennecLiveB2BChallengesQuery({
      sortBy,
    });
  const getChallengesData = getChallengesRes?.data;
  return (
    <DefaultTable data={getChallengesData} columns={columns}>
      <DefaultTable.TitleContainer className="flex-wrap gap-2">
        <DefaultTable.TitleContainer.Title className="flex-nowrap text-sm md:text-lg">
          Live Challenges
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
            value={sortBy as string}
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

      <div className="min-h-[240px]">
        <RenderData
          expectedDataType="array"
          data={getChallengesData}
          {...getChallengesApiState}
          loadingSkeleton={<TableSkeleton />}
          dataNotFoundTitle="No challenges found"
          dataNotFoundSubtitle="There are no challenges running for this event."
        >
          <DefaultTable.Table />
        </RenderData>
      </div>
    </DefaultTable>
  );
}

export default LiveChallengesTable;
