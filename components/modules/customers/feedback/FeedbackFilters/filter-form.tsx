"use client";

import dayjs from "dayjs";
import { useState } from "react";
import ReactSelect from "react-select";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getFeedbackColors } from "@/lib/get-status-colors";
import type {
  TFeedbackRating,
  TGetAllFeedbackArgs,
} from "@/store/api/feedback/feedback.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DateRangePicker from "@/components/date-time/date-range-picker";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import Rating from "@/components/ui/Rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { feedbackType } from "./utils";

export interface IFeedbackFilterForm {
  setClose: () => () => void;
}

function FilterForm({ setClose }: IFeedbackFilterForm) {
  // Manage search params
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllFeedbackArgs, void>>();

  const { rating, startDate, endDate, sentiments } = getAllParamValue();

  // Manage Form State
  const [ratingState, setRatingState] = useState<string | null>(
    rating?.toString() ?? null,
  );
  const [startDateState, setStartDateState] = useState<Date | null>(
    startDate ? dayjs(startDate).toDate() : null,
  );
  const [endDateState, setEndDateState] = useState<Date | null>(
    endDate ? dayjs(endDate).toDate() : null,
  );
  const [sentimentState, setSentimentState] = useState<string[] | undefined>(
    sentiments ?? undefined,
  );

  // Check if any value exists
  const isValueExists =
    (ratingState || startDateState || endDateState) !== null;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent Default
    e.preventDefault();

    // Convert rating to number
    const rating = ratingState
      ? (Number(ratingState) as TFeedbackRating)
      : undefined;

    // Convert rating to number
    const startDate = startDateState ? startDateState.toISOString() : undefined;

    // Convert rating to number
    const endDate = endDateState ? endDateState.toISOString() : undefined;
    // Update search parameters
    updateMultipleParam({
      rating,
      startDate,
      endDate,
      sentiments: sentimentState,
    });

    // Close the form after submission
    setClose()();
  };

  // handle Cancel
  const handleCancel = () => {
    if (isValueExists) {
      updateMultipleParam({
        rating: undefined,
        startDate: undefined,
        endDate: undefined,
        sentiments: undefined,
      });
    }
    setClose()();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <LabelErrorWrapper label="Feedback Type">
        <ReactSelect
          options={feedbackType}
          isMulti
          className="react-select"
          classNamePrefix="select"
          onChange={(selected) => {
            setSentimentState(selected.map((item) => item.value));
          }}
          classNames={{
            multiValue: (props) => `${getFeedbackColors(props.data.value)} `,
          }}
        />
      </LabelErrorWrapper>

      <LabelErrorWrapper label="Rating" className="relative">
        <Select
          value={ratingState ?? undefined}
          onValueChange={(value) => {
            setRatingState(value);
          }}
        >
          <SelectTrigger>
            <SelectValue
              className="text-primary"
              placeholder="Select rating type"
            />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((rating) => (
              <SelectItem key={rating} value={rating.toString()}>
                <div className="flex gap-1.5">
                  <Rating rating={rating} className="size-4" />
                  <span>{rating}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </LabelErrorWrapper>

      <DateRangePicker
        triggerClassName="w-full justify-start bg-transparent border-default-200 h-11 md:px-3.5"
        onApply={(data) => {
          setStartDateState(data?.from ?? null);
          setEndDateState(data?.to ?? null);
        }}
        label="Date Range"
        isShowQuickTime
      />

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button
          color="secondary"
          fullWidth
          type="button"
          onClick={() => handleCancel()}
        >
          {isValueExists ? "Clear" : "Cancel"}
        </Button>

        <Button fullWidth color="primary" type="submit">
          <ButtonLoadingContent isLoading={false} actionContent="Apply" />
        </Button>
      </div>
    </form>
  );
}

export default FilterForm;
