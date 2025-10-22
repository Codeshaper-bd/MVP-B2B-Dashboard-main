"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAllPromotionsArgs } from "@/store/api/promotion/promotion.types";
import { Tag } from "@/components/ui/tag";

export default function FiltersValue() {
  const { updateAParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllPromotionsArgs, void>>();
  const { status, type } = getAllParamValue();
  const handleRemoveStatus = () => {
    updateAParam({ key: "status", value: undefined });
  };
  const handleRemoveType = () => {
    updateAParam({ key: "type", value: undefined });
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

      {type && (
        <Tag
          label={type.replace(/_/g, " ")}
          onRemove={handleRemoveType}
          className="border-[#1849A9] bg-[#102A56] text-[#84CAFF]"
        />
      )}
    </div>
  );
}
