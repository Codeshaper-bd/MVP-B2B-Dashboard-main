"use client";

import { useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllEventQuery } from "@/store/api/events/events-api";
import { type TGetAllEventArgs } from "@/store/api/events/events.types";
import SearchIcon from "@/components/icons/SearchIcon";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import PostCardSkeleton from "@/components/skeleton/post-card-skeleton";
import SearchComponent from "@/components/ui/search-component";

import EventCard from "./event-card";

function PastEventsSection() {
  const [search, setSearch] = useState<string | undefined>("");

  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllEventArgs, void>>();
  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    ...getAllParamValue(),
    pageSize: contentPerPageOptions[12],
    type: "past",
  });
  const getAllEventData = getAllEventRes?.data;
  const getAllEventPagination = getAllEventRes?.pagination;
  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-default-900">
            Event list
          </h2>
        </div>
        <div className="flex-none">
          {/* search component  */}
          <SearchComponent<"external">
            mode="external"
            search={search}
            placeholder="Search..."
            setSearch={setSearch}
            searchIcon={<SearchIcon />}
          />
        </div>
      </div>
      <RenderData
        {...getAllEventApiState}
        expectedDataType="array"
        data={getAllEventData}
        loadingSkeleton={<PostCardSkeleton />}
      >
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getAllEventData?.map((event, index) => (
            <EventCard key={`event-${index}`} event={event} />
          ))}
        </div>
      </RenderData>

      <BasicPagination
        isLoading={
          getAllEventApiState.isLoading || getAllEventApiState.isFetching
        }
        totalPages={getAllEventPagination?.totalPages || 1}
        hideForTotalPagesOne
      />
    </div>
  );
}

export default PastEventsSection;
