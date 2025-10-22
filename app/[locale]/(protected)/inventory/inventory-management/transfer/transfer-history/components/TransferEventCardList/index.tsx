import { useEffect, useState } from "react";

import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetAllEventQuery } from "@/store/api/events/events-api";
import type { TGetAllEventArgs } from "@/store/api/events/events.types";
import RenderData from "@/components/render-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SearchComponent from "@/components/ui/search-component";

import TransferEventCard from "./TransferEventCard";
function TransferEventCardList() {
  const { getAllParamValue, updateMultipleParam } =
    useManageStateParams<Exclude<TGetAllEventArgs, void>>();
  const { search } = getAllParamValue();
  const [pageSize, setPageSize] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window?.innerWidth;
      if (width < 768) {
        setPageSize(1);
      } else if (width < 1024) {
        setPageSize(2);
      } else if (width < 1280) {
        setPageSize(3);
      } else {
        setPageSize(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    ...getAllParamValue(),
    pageSize,
    type: "past",
    search,
  });
  const getAllEventData = getAllEventRes?.data;
  const getAllEventPagination = getAllEventRes?.pagination;

  const totalPages = getAllEventPagination?.totalPages ?? 1;
  const currentPage = getAllEventPagination?.page ?? 1;

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      updateMultipleParam({ page: currentPage + 1 });
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      updateMultipleParam({ page: currentPage - 1 });
    }
  };
  return (
    <>
      <SearchComponent<"external">
        mode="external"
        search={search}
        setSearch={(value) => {
          updateMultipleParam({
            search: value,
            page: undefined,
          });
        }}
        className="max-w-[312px]"
        placeholder="Search Specific Event"
      />
      <RenderData
        expectedDataType="array"
        data={getAllEventData}
        {...getAllEventApiState}
      >
        <Carousel>
          <CarouselContent>
            {getAllEventData?.map((getAnEvent, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <TransferEventCard getAnEvent={getAnEvent} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="left-1"
            onClick={handlePreviousClick}
            disabled={currentPage <= 1}
          />
          <CarouselNext
            className="end-1"
            onClick={handleNextClick}
            disabled={currentPage >= totalPages}
          />
        </Carousel>
      </RenderData>
    </>
  );
}

export default TransferEventCardList;
