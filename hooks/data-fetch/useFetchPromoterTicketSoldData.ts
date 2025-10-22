import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetAPromoterTicketSoldQuery } from "@/store/api/promoters/promoters-api";

function useFetchPromoterTicketSoldData(
  eventId?: TIdOrSlugOrIdentifier<"id">["id"],
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"],
) {
  const { getAParamValue } = useManageSearchParams<{ promoterId?: string }>();
  const promoterId: string = getAParamValue("promoterId") || "-1";

  const { data: promoterTicketSoldResponse, ...promoterTicketSoldApiState } =
    useGetAPromoterTicketSoldQuery(
      {
        promoterId,
        eventId,
        ticketTierId,
      },
      {
        skip: !eventId || promoterId === "-1",
      },
    );

  const promoterTicketSoldData = promoterTicketSoldResponse?.data;

  return {
    promoterTicketSoldData,
    promoterTicketSoldApiState,
  };
}

export default useFetchPromoterTicketSoldData;
