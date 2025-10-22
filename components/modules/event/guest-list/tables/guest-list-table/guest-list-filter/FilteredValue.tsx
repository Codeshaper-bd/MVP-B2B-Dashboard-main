import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import { cn } from "@/lib/utils";
import type { TGuestListArgs } from "@/store/api/events/events.types";
import { Tag } from "@/components/ui/tag";

interface IFilteredValueProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGuestListArgs, void | undefined>
  >;
  ticketTierMap: Record<number, string>;
  promoterMap: Record<number, string>;
}

function FilteredValue({
  manageStateParams,
  ticketTierMap,
  promoterMap,
}: IFilteredValueProps) {
  const { getAllParamValue, updateAParam } = manageStateParams;

  const { status, numberOfTickets, sex, ticketTierId, promoterId } =
    getAllParamValue();

  // Get ticket tier name by ID from the map
  const ticketTierName = ticketTierId
    ? ticketTierMap[Number(ticketTierId)]
    : null;

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-3 md:justify-end">
      {sex && (
        <Tag
          dot
          label={sex === "unisex" || sex === "NOT_SPECIFIED" ? "Other" : sex}
          onRemove={() => updateAParam({ key: "sex", value: undefined })}
          className={cn({
            statusBlue: sex === "male",
            statusPink: sex === "female",
            statusYellow: sex === "unisex" || sex === "NOT_SPECIFIED",
          })}
          iconClass="text-default-700"
        />
      )}
      {status && (
        <Tag
          dot
          label={status}
          onRemove={() => updateAParam({ key: "status", value: undefined })}
          className={`${status === "Entered" ? "statusGreen" : "statusError"}`}
          iconClass="text-default-700"
        />
      )}
      {numberOfTickets && (
        <Tag
          dot
          label={`${numberOfTickets} tickets`}
          onRemove={() =>
            updateAParam({ key: "numberOfTickets", value: undefined })
          }
          className="statusYellow"
          iconClass="text-default-700"
        />
      )}
      {ticketTierId && ticketTierName && (
        <Tag
          dot
          label={ticketTierName}
          onRemove={() =>
            updateAParam({ key: "ticketTierId", value: undefined })
          }
          className="statusIndigo"
          iconClass="text-default-700"
        />
      )}
      {typeof promoterId === "number" && promoterMap[promoterId] && (
        <Tag
          dot
          label={promoterMap[promoterId]}
          onRemove={() => updateAParam({ key: "promoterId", value: undefined })}
          className="statusIndigo"
          iconClass="text-default-700"
        />
      )}
    </div>
  );
}

export default FilteredValue;
