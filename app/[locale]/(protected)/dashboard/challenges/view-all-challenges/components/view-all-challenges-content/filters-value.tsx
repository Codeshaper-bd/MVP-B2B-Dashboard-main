"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAllChallengeArgs } from "@/store/api/challenges/challenges.types";
import { Tag } from "@/components/ui/tag";

export default function FiltersValue() {
  const { updateAParam, updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllChallengeArgs, void>>();
  const { status, sortOrder } = getAllParamValue();
  const handleRemoveStatus = () => {
    updateAParam({ key: "status", value: undefined });
  };
  const handleRemoveSortOrder = () => {
    updateMultipleParam({
      sortBy: undefined,
      sortOrder: undefined,
    });
  };
  return (
    <div className="mb-6 flex flex-wrap justify-start gap-3 md:justify-end">
      {status && (
        <Tag
          dot
          label={status}
          onRemove={handleRemoveStatus}
          className={`${status === "Active" ? "statusGreen" : "statusError"}`}
          iconClass="text-default-700"
        />
      )}

      {sortOrder && (
        <Tag
          label={sortOrder === "asc" ? "Low to High" : "High to Low"}
          onRemove={handleRemoveSortOrder}
        />
      )}
    </div>
  );
}
