"use client";

import { memo } from "react";

import BooleanContext from "@/contexts/BooleanContext";
import FilterContent from "@/components/filter-content";

import ChallengePointsFilterForm from "./ChallengePointsFilterForm";
import type { TFiltersProps } from "./type";

function Filters({ manageStateParamsProps }: TFiltersProps) {
  return (
    <BooleanContext>
      {({ isOpen, setClose, toggle }) => (
        <FilterContent
          className="-right-44 md:right-0"
          open={isOpen}
          onClick={toggle}
          onClose={setClose}
          triggerButtonClassName="h-11"
        >
          <ChallengePointsFilterForm
            manageStateParamsProps={manageStateParamsProps}
          />
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default memo(Filters);
