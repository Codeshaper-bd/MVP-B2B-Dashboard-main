"use client";

import { memo, useMemo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetAllChallengeQuery } from "@/store/api/challenges/challenges-api";
import type {
  TChallenge,
  TGetAllChallengeArgs,
} from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import { SearchIcon as SearchIcon } from "@/components/icons";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchComponent from "@/components/ui/search-component";
import { Separator } from "@/components/ui/separator";

import ChallengeItem from "./challenge-item";
export interface IChallengesContentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChallenges?: TChallenge[] | TNullish;
  onToggleChallengeSelect?: (challenge: TChallenge) => void;
}

function ChallengesContent({
  setOpen,
  selectedChallenges,
  onToggleChallengeSelect,
}: IChallengesContentProps) {
  const { getAllParamValue, updateAParam, updateMultipleParam } =
    useManageStateParams<Exclude<TGetAllChallengeArgs, void>>();
  const { page, search } = getAllParamValue();

  const { getAnEventData } = useFetchAnEventData();

  const { data: getAllChallengesRes, ...getAllChallengesApiState } =
    useGetAllChallengeQuery({
      search: search || undefined,
      page: page || contentPerPageOptions.initialPage,
      pageSize: contentPerPageOptions[10],
      startDate: getAnEventData?.details?.startTime,
      endDate: getAnEventData?.details?.endTime,
    });

  const getAllChallengesData = getAllChallengesRes?.data;
  const getAllChallengesPagination = getAllChallengesRes?.pagination;

  const selectedChallengesMap = useMemo(
    () =>
      new Map(
        selectedChallenges?.map((challenge) => [challenge.id, challenge]) ?? [],
      ),
    [selectedChallenges],
  );

  return (
    <>
      <div className="p-6">
        <SearchComponent<"external">
          mode="external"
          search={search}
          setSearch={(value) => {
            updateMultipleParam({
              search: value,
              page: undefined,
            });
          }}
          className="w-full"
          placeholder="Search"
          searchIcon={<SearchIcon className="size-5 text-default-600" />}
        />
      </div>

      <Separator />

      <div className="px-4 py-2">
        <RenderData
          {...getAllChallengesApiState}
          data={getAllChallengesData}
          expectedDataType="array"
        >
          <ScrollArea className="-mr-4 h-[calc(100vh_-_330px)]">
            <div className="grid grid-cols-1 gap-3 pb-4 pr-4 md:grid-cols-2 md:gap-x-3 md:gap-y-4">
              {getAllChallengesData?.map((item) => (
                <ChallengeItem
                  key={item?.id}
                  item={item}
                  setOpen={setOpen}
                  handleSelected={onToggleChallengeSelect}
                  isSelected={selectedChallengesMap.has(item?.id)}
                  isNotSelectable={item?.status === "Expired"}
                />
              ))}
            </div>
          </ScrollArea>
        </RenderData>

        <div className="custom-scrollbar !relative mt-4 overflow-x-auto">
          <BasicPagination
            isLoading={
              getAllChallengesApiState.isLoading ||
              getAllChallengesApiState.isFetching
            }
            totalPages={getAllChallengesPagination?.totalPages || 1}
            hideForTotalPagesOne
            disableUrlState
            onPageChange={(page) =>
              updateAParam({
                key: "page",
                value: page,
              })
            }
            currentPage={Number(page || 1)}
          />
        </div>
      </div>
    </>
  );
}

export default memo(ChallengesContent);
