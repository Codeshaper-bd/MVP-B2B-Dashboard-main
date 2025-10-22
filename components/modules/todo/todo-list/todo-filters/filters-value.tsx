"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import type { TGetAllTodoArgs } from "@/store/api/todo/todo.types";
import { Tag } from "@/components/ui/tag";

function FiltersValue() {
  const { getAParamValue, updateMultipleParam } = useManageSearchParams<
    Exclude<TGetAllTodoArgs, void | undefined> & {
      completedTodoPageNumber?: number;
      notCompletedTodoPageNumber?: number;
    }
  >();

  const tags = getAParamValue("tags")?.split(",").filter(Boolean) ?? [];
  const sortOrderState = getAParamValue("sortOrder");
  const sortByState = getAParamValue("sortBy");
  const completedTodoPageNumber = getAParamValue("completedTodoPageNumber");
  const notCompletedTodoPageNumber = getAParamValue(
    "notCompletedTodoPageNumber",
  );
  const statusState = getAParamValue("status");
  const startDate = getAParamValue("startDate");
  const endDate = getAParamValue("endDate");

  const allFilters = [
    sortOrderState && {
      type: "sortOrder",
      label: sortOrderState === "desc" ? "Most Recent" : "Oldest",
    },
    sortByState &&
      sortByState !== "createdAt" && { type: "sortBy", label: sortByState },
    statusState === "COMPLETED" && { type: "status", label: "Completed" },
    statusState === "NOT_COMPLETED" && {
      type: "status",
      label: "Not Complete",
    },
    startDate && {
      type: "startDate",
      label: `${convertUTCToLocal({ format: "YYYY-MM-DD", utcDateTime: startDate })} - ${convertUTCToLocal({ format: "YYYY-MM-DD", utcDateTime: endDate })}`,
    },
    completedTodoPageNumber && { type: "completed", label: "Completed" },
    notCompletedTodoPageNumber && {
      type: "notCompleted",
      label: "Not Complete",
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
        tags: newTags.length ? newTags.join(",") : undefined,
      });
    } else if (filter.type === "sortOrder") {
      updateMultipleParam({ sortOrder: undefined });
    } else if (filter.type === "sortBy") {
      updateMultipleParam({ sortBy: undefined });
    } else if (filter.type === "status") {
      updateMultipleParam({ status: undefined });
    } else if (filter.type === "completed") {
      updateMultipleParam({ completedTodoPageNumber: undefined });
    } else if (filter.type === "notCompleted") {
      updateMultipleParam({ notCompletedTodoPageNumber: undefined });
    } else if (filter.type === "startDate") {
      updateMultipleParam({ startDate: undefined, endDate: undefined });
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {allFilters.map((filter, index) => (
        <Tag
          label={filter.label}
          key={`filter-${filter.type}-${index}`}
          onRemove={() => onRemove(filter)}
          className={cn("bg-[#1F235B]", {
            "border-[#93370D] bg-[#93370D]/20 text-[#FEC84B]":
              filter.label === "Not Complete",
            statusGreen: filter.label === "Completed",
            "border-[#9E165F] bg-[#9E165F]/20 text-[#FAA7E0]":
              filter.label === "Most Recent",
          })}
          iconClass={cn("", {
            "text-[#38C793]": filter.label === "Completed",
            "text-[#DC6803]": filter.label === "Not Complete",
            "text-[#DD2590]": filter.label === "Most Recent",
          })}
        />
      ))}
    </div>
  );
}

export default FiltersValue;
