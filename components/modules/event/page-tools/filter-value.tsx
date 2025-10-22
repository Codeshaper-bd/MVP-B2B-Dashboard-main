"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import type { TGetAllEventArgs } from "@/store/api/events/events.types";
import { Tag } from "@/components/ui/tag";

function FiltersValue() {
  const { getAParamValue, updateMultipleParam } =
    useManageSearchParams<Exclude<TGetAllEventArgs, void | undefined>>();

  const tags = getAParamValue("status")?.split(",").filter(Boolean) ?? [];
  const dateFilterState = getAParamValue("dateFilter");
  const startDate = getAParamValue("startDate");
  const endDate = getAParamValue("endDate");

  const allFilters = [
    dateFilterState && {
      type: "dateFilter",
      label:
        dateFilterState === "next7days"
          ? "Next 7 days"
          : dateFilterState === "next30days"
            ? "Next 30 days"
            : dateFilterState === "last7days"
              ? "Last 7 days"
              : dateFilterState === "last30days"
                ? "Last 30 days"
                : undefined,
    },
    startDate && {
      type: "startDate",
      label: `${convertUTCToLocal({ format: "DD/MM/YYYY", utcDateTime: startDate })} - ${convertUTCToLocal({ format: "DD/MM/YYYY", utcDateTime: endDate })}`,
    },
    ...tags.map((label) => ({ type: "tag", label })),
  ].filter(
    (filter): filter is { type: string; label: string } =>
      Boolean(filter) && typeof filter === "object" && "label" in filter,
  );

  const onRemove = (filter: { type: string; label: string }) => {
    if (filter.type === "tag") {
      const newTags = tags.filter((t) => t !== filter.label);
      updateMultipleParam({
        status: newTags.length ? newTags.join(",") : undefined,
      });
    } else if (filter.type === "dateFilter") {
      updateMultipleParam({ dateFilter: undefined });
    } else if (filter.type === "startDate") {
      updateMultipleParam({ startDate: undefined, endDate: undefined });
    }
  };

  return (
    <div className="my-4 flex flex-wrap justify-end gap-3">
      {allFilters.map((filter, index) => (
        <Tag
          label={filter.label}
          key={`filter-${filter.type}-${index}`}
          onRemove={() => onRemove(filter)}
          className={cn("border-[#333741] bg-[#161B26] text-[#CECFD2]", {
            "border-[#932F19] bg-[#511C10] text-[#F7B27A]":
              filter.label === "Scheduled",
            statusGreen: filter.label === "Published",
          })}
          dot={filter.label === "Published" || filter.label === "Scheduled"}
          iconClass={cn("text-[#CECFD2]", {
            "text-[#38C793]": filter.label === "Published",
            "text-[#DC6803]": filter.label === "Scheduled",
          })}
        />
      ))}
    </div>
  );
}

export default FiltersValue;
