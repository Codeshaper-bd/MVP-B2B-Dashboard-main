"use client";

import BooleanContext from "@/contexts/BooleanContext";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import { cn } from "@/lib/utils";
import type { TGetFennecLiveNonGuestlistDetailsArgs } from "@/store/api/fennec-live/fennec-live.types";
import FilterContent from "@/components/filter-content";

import FilterForm from "./filter-form";

export interface IGuestListFilterSearchProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetFennecLiveNonGuestlistDetailsArgs, void>
  >;
}

function NonGuestListFilter({
  manageStateParams,
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
          <FilterForm manageStateParams={manageStateParams} />
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default NonGuestListFilter;
