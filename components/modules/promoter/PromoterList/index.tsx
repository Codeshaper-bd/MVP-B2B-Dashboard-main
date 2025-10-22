"use client";
import { useCallback, useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllPromotersQuery } from "@/store/api/promoters/promoters-api";
import type {
  TGetAllPromotersArgs,
  TPromoter,
} from "@/store/api/promoters/promoters.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import PromoterCardSkeleton from "@/components/skeleton/promoter-card-skeleton";

import Promoter from "./Promoter";
import ShowListOfEventsModal from "../Modals/ShowListOfEventsModal";
import type { IActionButtonProps } from "./Promoter/AssignedEvents/Header/ActionButton";

function PromoterList() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllPromotersArgs, void>>();
  const queryParams = getAllParamValue();
  const { data: getAllPromoterRes, ...getAllPromoterApiState } =
    useGetAllPromotersQuery({
      page: 1,
      pageSize: contentPerPageOptions[9],
      ...queryParams,
    });

  const getAllPromoterData = getAllPromoterRes?.data;
  const getAllPromoterPagination = getAllPromoterRes?.pagination;

  const { state: isOpen, setOpen, setClose } = useBooleanState();

  const [promoter, setPromoter] = useState<TPromoter | null>(null);
  const onClickSeeAll =
    ({
      setOpen,
      setPromoter,
    }: {
      setPromoter: React.Dispatch<React.SetStateAction<TPromoter | null>>;
      setOpen: (props: Partial<TExternalState> | void) => () => void;
    }): IActionButtonProps["onClick"] =>
    (_, data) => {
      setPromoter(data);
      setOpen()();
    };

  const handleCloseModal = useCallback(
    ({
      setClose,
      setPromoter,
    }: {
      setClose: (props: Partial<TExternalState> | void) => () => void;
      setPromoter: React.Dispatch<React.SetStateAction<TPromoter | null>>;
    }) =>
      () => {
        setPromoter(null);
        setClose()();
      },
    [],
  );

  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold leading-[30px] text-[#F5F5F6]">
        Total {getAllPromoterPagination?.totalCount} Promoter
      </h3>

      <RenderData
        loadingSkeleton={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, idx) => (
              <PromoterCardSkeleton key={idx} />
            ))}
          </div>
        }
        data={getAllPromoterData}
        expectedDataType="array"
        {...getAllPromoterApiState}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getAllPromoterData?.map((promoter, index) => (
            <Promoter
              key={promoter?.id || index}
              {...promoter}
              header={{
                title: `Assigned Events (${promoter?.totalAssignedEvent || 0} total)`,
                actionButton: {
                  data: promoter,
                  title: "See All",
                  onClick: onClickSeeAll({ setPromoter, setOpen }),
                },
              }}
            />
          ))}
        </div>
      </RenderData>
      <BasicPagination
        totalPages={getAllPromoterPagination?.totalPages || 0}
        isLoading={
          getAllPromoterApiState.isLoading || getAllPromoterApiState.isFetching
        }
      />

      <ShowListOfEventsModal
        open={isOpen}
        promoter={promoter}
        onOpenChange={handleCloseModal({
          setClose,
          setPromoter,
        })}
      />
    </div>
  );
}

export default PromoterList;
