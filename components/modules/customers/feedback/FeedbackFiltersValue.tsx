"use client";

import dayjs from "dayjs";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import type { TGetAllFeedbackArgs } from "@/store/api/feedback/feedback.types";
import { Tag } from "@/components/ui/tag";

function FeedbackFiltersValue() {
  const { getAllParamValue, updateMultipleParam } =
    useManageSearchParams<Exclude<TGetAllFeedbackArgs, void | undefined>>();

  const { rating, startDate, endDate, sentiments } = getAllParamValue();

  const handleRemoveSentiment = (sentimentToRemove: string) => {
    const updatedSentiments = sentiments?.filter(
      (sentiment) => sentiment !== sentimentToRemove,
    );

    const finalSentiments = updatedSentiments?.length
      ? updatedSentiments
      : undefined;

    updateMultipleParam({ sentiments: finalSentiments });
  };

  const handleRemoveDate = () => {
    updateMultipleParam({ startDate: undefined, endDate: undefined });
  };
  const handleRemoveRating = () => {
    updateMultipleParam({ rating: undefined });
  };
  const hasNoFiltersActive =
    !startDate && !endDate && !rating && !sentiments?.length;
  if (hasNoFiltersActive) {
    return null;
  }
  return (
    <div className="flex flex-wrap justify-end gap-3">
      {startDate && endDate && (
        <Tag
          label={`${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(endDate).format("DD/MM/YYYY")}`}
          onRemove={handleRemoveDate}
          className="border-[#333741] bg-[#161B26] text-default-700"
          iconClass="text-default-700"
        />
      )}

      {rating && (
        <Tag
          label={`Rating: ${rating}`}
          onRemove={handleRemoveRating}
          className="border-[#085D3A] bg-[#053321] text-[#75E0A7]"
          iconClass="text-[#75E0A7]"
        />
      )}
      {!!sentiments?.length &&
        sentiments.map((sentiment, index) => (
          <Tag
            key={index}
            label={sentiment}
            onRemove={() => handleRemoveSentiment(sentiment)}
            className={cn(
              "mr-2 border-[#333741] bg-[#161B26] text-default-700",
              {
                "border-[#085D3A] bg-[#053321] text-[#75E0A7]":
                  sentiment === "positive",
                "border-[#912018] bg-[#55160C] text-[#FDA29B]":
                  sentiment === "negative",
              },
            )}
            iconClass={cn("text-default-700", {
              "text-[#75E0A7]": sentiment === "positive",
              "text-[#FDA29B]": sentiment === "negative",
            })}
          />
        ))}
    </div>
  );
}

export default FeedbackFiltersValue;
