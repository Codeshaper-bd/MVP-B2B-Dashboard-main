import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TGetPromotersAdminTicketSoldListArgs } from "@/store/api/promoters/promoters.types";
import { Tag } from "@/components/ui/tag";

interface IFilteredValueProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPromotersAdminTicketSoldListArgs, void | undefined>
  >;
}

function GuestListFilterValue({ manageStateParams }: IFilteredValueProps) {
  const { getAllParamValue, updateAParam, updateMultipleParam } =
    manageStateParams;

  const {
    ticketTierId,
    hasAddons,
    hasDiscount,
    revenueAmount,
    startDate,
    endDate,
  } = getAllParamValue();

  const { getAnEventData } = useFetchAnEventData();

  // Get ticket tier name by ID from the map
  const ticketTier = ticketTierId
    ? getAnEventData?.ticketTiers.find(
        (tier) => String(tier.id) === String(ticketTierId),
      ) || null
    : null;

  return (
    <div className="mt-4 flex flex-wrap justify-start gap-3 md:justify-end">
      {ticketTierId && ticketTier && (
        <Tag
          dot
          label={`${ticketTier.name}`}
          onRemove={() =>
            updateAParam({ key: "ticketTierId", value: undefined })
          }
          className="statusBlue"
          iconClass="statusBlue"
        />
      )}
      {hasAddons && (
        <Tag
          dot
          label={`Addons: ${hasAddons}`}
          onRemove={() => updateAParam({ key: "hasAddons", value: undefined })}
          className={"statusBlue"}
          iconClass="statusBlue"
        />
      )}
      {hasDiscount && (
        <Tag
          dot
          label={`Discount: ${hasDiscount}`}
          onRemove={() =>
            updateAParam({ key: "hasDiscount", value: undefined })
          }
          className={"statusBlue"}
          iconClass="statusBlue"
        />
      )}
      {revenueAmount && (
        <Tag
          dot
          label={`Revenue: ${revenueAmount}`}
          onRemove={() =>
            updateAParam({ key: "revenueAmount", value: undefined })
          }
          className={"statusBlue"}
          iconClass="statusBlue"
        />
      )}
      {startDate && endDate && (
        <Tag
          dot
          label={`${convertUTCToLocal({ utcDateTime: startDate, format: "DD/MM/YY" })} - ${convertUTCToLocal({ utcDateTime: endDate, format: "DD/MM/YY" })}`}
          onRemove={() =>
            updateMultipleParam({
              startDate: undefined,
              endDate: undefined,
            })
          }
          className={"statusBlue"}
          iconClass="statusBlue"
        />
      )}
    </div>
  );
}

export default GuestListFilterValue;
