"use client";

import { memo, useMemo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageStateParams from "@/hooks/useManageStateParams";
import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetAllPromotionQuery } from "@/store/api/promotion/promotion-api";
import type {
  TGetAllPromotionsArgs,
  TPromotion,
} from "@/store/api/promotion/promotion.types";
import { SearchIcon as SearchIcon } from "@/components/icons";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchComponent from "@/components/ui/search-component";
import { Separator } from "@/components/ui/separator";

import PromotionItem from "./promotion-item";
import { useEventStepperForm } from "../../../../useEventStepperForm";

export interface IPromotionsContentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPromotions?: TPromotion[] | TNullish;
  onTogglePromotionSelect?: (challenge: TPromotion) => void;
}

function PromotionsContent({
  setOpen,
  selectedPromotions,
  onTogglePromotionSelect,
}: IPromotionsContentProps) {
  const { getAllParamValue, updateAParam, updateMultipleParam } =
    useManageStateParams<Exclude<TGetAllPromotionsArgs, void>>();
  const { page, search } = getAllParamValue();
  const { getAnEventData } = useEventStepperForm();

  const { data: getAllPromotionsRes, ...getAllPromotionsApiState } =
    useGetAllPromotionQuery({
      search: search || undefined,
      page: page || contentPerPageOptions.initialPage,
      pageSize: contentPerPageOptions[10],
      startDate: getAnEventData?.details?.startTime,
      endDate: getAnEventData?.details?.endTime,
    });

  const getAllPromotionsData = getAllPromotionsRes?.data;
  const getAllPromotionsPagination = getAllPromotionsRes?.pagination;

  const selectedPromotionsMap = useMemo(
    () =>
      new Map(
        selectedPromotions?.map((challenge) => [challenge.id, challenge]) ?? [],
      ),
    [selectedPromotions],
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
        <ScrollArea className="-mr-4 h-[calc(100vh_-_330px)]">
          <RenderData
            data={getAllPromotionsData}
            {...getAllPromotionsApiState}
            expectedDataType="array"
            dataNotFoundMessage="No promotions found"
          >
            <div className="grid grid-cols-1 gap-3 pb-4 pr-4 md:grid-cols-2 md:gap-x-3 md:gap-y-4">
              {getAllPromotionsData?.map((item) => {
                const { status } = compareDateTimes({
                  providedDateTime: item?.endDate,
                  comparisonUnit: "seconds",
                });
                return (
                  <PromotionItem
                    key={item?.id}
                    item={item}
                    setOpen={setOpen}
                    handleSelected={onTogglePromotionSelect}
                    isSelected={selectedPromotionsMap.has(item?.id)}
                    isNotSelectable={
                      status !== "after" || item?.status === "Expired"
                    }
                  />
                );
              })}
            </div>
          </RenderData>
        </ScrollArea>

        <div className="custom-scrollbar !relative mt-4 overflow-x-auto">
          <BasicPagination
            isLoading={
              getAllPromotionsApiState.isLoading ||
              getAllPromotionsApiState?.isFetching
            }
            totalPages={getAllPromotionsPagination?.totalPages || 1}
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

export default memo(PromotionsContent);
