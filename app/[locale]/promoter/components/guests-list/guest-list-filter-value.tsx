import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TGetPromotersTicketSoldListArgs,
  TTicketData,
} from "@/store/api/promoter/promoter.types";
import { Tag } from "@/components/ui/tag";

interface IFilteredValueProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPromotersTicketSoldListArgs, void | undefined>
  >;
  getTicketTiersData: TTicketData[] | TNullish;
}

function GuestListFilterValue({
  manageStateParams,
  getTicketTiersData,
}: IFilteredValueProps) {
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

  // Get ticket tier name by ID from the map
  const ticketTier = ticketTierId
    ? getTicketTiersData?.find(
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
