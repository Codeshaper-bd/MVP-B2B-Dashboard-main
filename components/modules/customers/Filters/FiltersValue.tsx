"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TGetAllCustomerLookupArgs } from "@/store/api/customer-lookup/customer-lookup.types";
import { Tag } from "@/components/ui/tag";

import {
  genderStateOptions,
  monthOptions,
} from "./CustomerListFilter/CustomerListFilterContent";

const lastPurchaseOptions = {
  "24h": "24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
};

function FiltersValue() {
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllCustomerLookupArgs, void>>();

  const { gender, birthdayMonth, lastPurchase, startDate, endDate } =
    getAllParamValue();

  return (
    <div className="flex flex-wrap justify-start gap-3 md:justify-end">
      {gender && (
        <Tag
          label={
            genderStateOptions.find((option) => option.value === gender)
              ?.label || gender
          }
          onRemove={() => updateMultipleParam({ gender: undefined })}
          className="border-[#93370D] bg-[#93370D]/20 text-[#FEC84B]"
          iconClass="text-[#93370D]"
        />
      )}

      {lastPurchase && (
        <Tag
          label={
            lastPurchaseOptions[
              lastPurchase as keyof typeof lastPurchaseOptions
            ] || lastPurchase
          }
          onRemove={() => updateMultipleParam({ lastPurchase: undefined })}
          className="border-[#9E165F] bg-[#9E165F]/20 text-[#FAA7E0]"
          iconClass="text-[#9E165F]"
        />
      )}

      {birthdayMonth && (
        <Tag
          label={birthdayMonth
            .split(",")
            .map(
              (month) =>
                monthOptions.find((option) => option.value === month)?.label,
            )
            .join(", ")}
          onRemove={() => updateMultipleParam({ birthdayMonth: undefined })}
          className="border-[#38C793] bg-[#38C793]/20 text-[#38C793]"
          iconClass="text-[#38C793]"
        />
      )}

      {startDate && endDate && (
        <Tag
          label={`${convertUTCToLocal({ format: "DD/MM/YYYY", utcDateTime: startDate })} - ${convertUTCToLocal({ format: "DD/MM/YYYY", utcDateTime: endDate })}`}
          onRemove={() =>
            updateMultipleParam({ startDate: undefined, endDate: undefined })
          }
          className="border-[#F79009] bg-[#F79009]/20 text-[#F79009]"
          iconClass="text-[#F79009]"
        />
      )}
    </div>
  );
}

export default FiltersValue;
