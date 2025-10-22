/**
 * Compare date ranges and detect specific changes
 * Returns true if start date increased OR end date decreased
 */

export interface DateRangeComparison {
  formStartDate: string | null;
  formEndDate: string | null;
  apiStartDate: string | null;
  apiEndDate: string | null;
  isStartDateIncreased: boolean;
  isEndDateDecreased: boolean;
  isDateRangeChanged: boolean;
}

export interface TCompareReturnType {
  isStartDateIncreased: boolean;
  isEndDateDecreased: boolean;
  isDateRangeChanged: boolean;
}

export const compareDateRanges = (
  formDateRange: { from?: Date; to?: Date } | undefined,
  apiStartDate: string | undefined,
  apiEndDate: string | undefined,
): TCompareReturnType => {
  // Convert to date strings for comparison
  const formStartDate = formDateRange?.from
    ? new Date(formDateRange.from).toDateString()
    : null;
  const formEndDate = formDateRange?.to
    ? new Date(formDateRange.to).toDateString()
    : null;

  const apiStartDateStr = apiStartDate
    ? new Date(apiStartDate).toDateString()
    : null;
  const apiEndDateStr = apiEndDate ? new Date(apiEndDate).toDateString() : null;

  // Check specific conditions
  const isStartDateIncreased = Boolean(
    formStartDate &&
      apiStartDateStr &&
      new Date(formStartDate) > new Date(apiStartDateStr),
  );
  const isEndDateDecreased = Boolean(
    formEndDate &&
      apiEndDateStr &&
      new Date(formEndDate) < new Date(apiEndDateStr),
  );

  const isDateRangeChanged = isStartDateIncreased || isEndDateDecreased;

  return {
    isStartDateIncreased,
    isEndDateDecreased,
    isDateRangeChanged,
  };
};
export const compareDateRangesWithTime = ({
  formDateRange,
  apiStartDate,
  apiEndDate,
}: {
  formDateRange: { from?: Date; to?: Date } | undefined;
  apiStartDate: string | undefined;
  apiEndDate: string | undefined;
}): TCompareReturnType => {
  // Convert to ISO strings for comparison (includes both date and time)
  const formStartDate = formDateRange?.from
    ? new Date(formDateRange.from).toISOString()
    : null;
  const formEndDate = formDateRange?.to
    ? new Date(formDateRange.to).toISOString()
    : null;

  const apiStartDateStr = apiStartDate
    ? new Date(apiStartDate).toISOString()
    : null;
  const apiEndDateStr = apiEndDate ? new Date(apiEndDate).toISOString() : null;

  // Check if any date has changed
  const isStartDateChanged = Boolean(
    formStartDate &&
      apiStartDateStr &&
      new Date(formStartDate).getTime() !== new Date(apiStartDateStr).getTime(),
  );
  const isEndDateChanged = Boolean(
    formEndDate &&
      apiEndDateStr &&
      new Date(formEndDate).getTime() !== new Date(apiEndDateStr).getTime(),
  );

  const isDateRangeChanged = isStartDateChanged || isEndDateChanged;

  return {
    isStartDateIncreased: isStartDateChanged,
    isEndDateDecreased: isEndDateChanged,
    isDateRangeChanged,
  };
};
