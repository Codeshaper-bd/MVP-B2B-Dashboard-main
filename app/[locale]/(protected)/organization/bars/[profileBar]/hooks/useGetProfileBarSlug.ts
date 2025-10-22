import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";

type TPageParams = Params & {
  locale: string;
  profileBar: string;
};

export type TUseProfileBarReturn = {
  barSlug: string | undefined;
  isValidSlug: boolean;
};

export function useGetProfileBarSlug(): TUseProfileBarReturn {
  const { profileBar: barSlug } = useParams<TPageParams>();
  const isValidSlug = checkIsValidId(barSlug, {
    type: "string",
  });
  return {
    barSlug,
    isValidSlug,
  };
}
