import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAnEventQuery } from "@/store/api/events/events-api";

type TPageParams = Params & {
  locale: string;
  eventSlug: string;
};

function useFetchAnEventData() {
  const params = useParams<TPageParams>();
  const { eventSlug } = params;

  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });

  const { data: getAnEventRes, ...getAnEventApiState } = useGetAnEventQuery(
    {
      slug: eventSlug,
    },
    {
      skip: !isProbableValidSlugFound,
      // Refetch on window focus only if data is stale
      refetchOnFocus: false,
      // Refetch on reconnect only if data is stale
      refetchOnReconnect: false,
      // Polling disabled for better performance
      pollingInterval: 0,
    },
  );
  const getAnEventData = getAnEventRes?.data;
  const getAnEventPagination = getAnEventRes?.pagination;

  return {
    getAnEventData,
    getAnEventApiState,
    params,
    eventSlug,
    getAnEventRes,
    getAnEventPagination,
  };
}

export default useFetchAnEventData;
