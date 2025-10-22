import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";

type TPageParams = Params & {
  locale: string;
  customerId: string;
};

export type TUseProfileBarReturn = {
  userId: number | undefined;
  isValidUserId: boolean;
};

export function useGetCustomerId(): TUseProfileBarReturn {
  const { customerId } = useParams<TPageParams>();
  const userId = convertToNumber({
    value: customerId,
    digit: 0,
  });
  const isValidUserId = checkIsValidId(userId, {
    type: "number",
  });
  return {
    userId,
    isValidUserId,
  };
}
