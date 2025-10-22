import dayjs from "dayjs";

type TCompareResult = "before" | "after" | "equal" | "invalid";

type TCompareDateTimesReturn = {
  status: TCompareResult;
  result: number;
};

export const compareDateTimes = ({
  baseDateTime,
  providedDateTime,
  comparisonUnit = "milliseconds",
}: {
  baseDateTime?: dayjs.ConfigType;
  providedDateTime: dayjs.ConfigType | null | undefined;
  comparisonUnit?: dayjs.QUnitType | dayjs.OpUnitType;
}): TCompareDateTimesReturn => {
  try {
    if (!providedDateTime) {
      return { status: "invalid", result: 0 };
    }

    const baseDate = dayjs(baseDateTime);
    const providedDate = dayjs(providedDateTime);
    const compareResult = baseDate.diff(providedDate, comparisonUnit);

    if (compareResult > 0) {
      return { status: "before", result: compareResult };
    } else if (compareResult < 0) {
      return { status: "after", result: compareResult };
    } else {
      return { status: "equal", result: compareResult };
    }
  } catch (error) {
    console.error("Error comparing date-times:", error);
    return { status: "invalid", result: 0 };
  }
};
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
