"use client";
import Link from "next/link";

import { useGetTopChallengesQuery } from "@/store/api/challenges/challenges-api";
import ViewAllButton from "@/components/Buttons/ViewAllButton";
import FlashIcon from "@/components/icons/FlashIcon";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
import type { TDateRange } from "../overview-content";

function TopChallengesTable({ dateRange }: { dateRange: TDateRange }) {
  const { data: getTopChallengesRes, ...getTopChallengesApiState } =
    useGetTopChallengesQuery({
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
  const getTopChallengesData = getTopChallengesRes?.data;
  return (
    <DefaultTable data={getTopChallengesData} columns={columns}>
      <DefaultTable.TitleContainer>
        <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
          <FlashIcon className="h-[21.6px] w-[15.3px] text-default-1000" />
          Top Challenges
        </DefaultTable.TitleContainer.Title>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={getTopChallengesData}
        {...getTopChallengesApiState}
        loadingSkeleton={<TableSkeleton />}
      >
        <DefaultTable.Table />
      </RenderData>
      <DefaultTable.Footer className="p-4">
        <Link href={"/en/dashboard/challenges/view-all-challenges"}>
          <ViewAllButton />
        </Link>
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default TopChallengesTable;
