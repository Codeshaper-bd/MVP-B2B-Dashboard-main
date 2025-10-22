"use client";

import BooleanContext from "@/contexts/BooleanContext";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import { cn } from "@/lib/utils";
import type { TGuestListArgs } from "@/store/api/events/events.types";
import FilterContent from "@/components/filter-content";
import type { IApiStateInfo } from "@/components/render-data";

import FilterForm from "./filter-form";

export interface IGuestListFilterSearchProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGuestListArgs, void>
  >;
  ticketTiersOptions?: Array<{ label: string; value: number }>;
  ticketTierApiState: IApiStateInfo;
  promoterOptions?: Array<{ label: string; value: number }>;
  promoterApiState: {
    isLoading: boolean;
    isFetching: boolean;
  };
}

function GuestListFilter({
  manageStateParams,
  ticketTiersOptions,
  ticketTierApiState,
  promoterOptions,
  promoterApiState,
}: IGuestListFilterSearchProps) {
  return (
    <BooleanContext>
      {({ isOpen, toggle, setClose }) => (
        <FilterContent
          open={isOpen}
          onClick={toggle}
          onClose={setClose}
          targetButtonProps={{
            color: isOpen ? "primary" : "secondary",
            className: cn("h-10", {
              "ring-[4px] ring-opacity-25 ring-primary": isOpen,
            }),
          }}
          triggerButtonClassName="h-11"
        >
          <FilterForm
            manageStateParams={manageStateParams}
            ticketTiersOptions={ticketTiersOptions}
            ticketTierApiState={ticketTierApiState}
            promoterOptions={promoterOptions}
            promoterApiState={promoterApiState}
          />
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default GuestListFilter;
