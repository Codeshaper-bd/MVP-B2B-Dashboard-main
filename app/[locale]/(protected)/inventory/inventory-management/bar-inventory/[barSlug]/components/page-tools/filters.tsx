"use client";

import BooleanContext from "@/contexts/BooleanContext";
import FilterContent from "@/components/filter-content";
import FilterLinesIcon from "@/components/icons/FilterLinesIcon";
import { Button } from "@/components/ui/button";

import StockFiltersModal from "./StockFiltersModal";

function Filters() {
  return (
    <BooleanContext>
      {({ isOpen, toggle, setClose }) => (
        <FilterContent
          open={isOpen}
          onClose={setClose}
          triggerContent={
            <Button
              color={isOpen ? "primary" : "secondary"}
              size={"icon"}
              onClick={toggle}
              className="h-11 w-11"
            >
              <FilterLinesIcon className="h-4 w-4" />
            </Button>
          }
          className="left-0 min-w-[320px] lg:left-auto"
        >
          <StockFiltersModal />
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default Filters;
