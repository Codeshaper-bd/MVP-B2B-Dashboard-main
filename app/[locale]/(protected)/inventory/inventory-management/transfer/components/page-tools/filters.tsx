"use client";

import BooleanContext from "@/contexts/BooleanContext";
import FilterContent from "@/components/filter-content";
import FilterLinesIcon from "@/components/icons/FilterLinesIcon";
import { Button } from "@/components/ui/button";

import TransferFiltersModal from "./TransferFiltersModal";

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
              onClick={toggle}
              size="lg"
              className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
            >
              <FilterLinesIcon className="me-2 h-4 w-4" />
            </Button>
          }
          className="left-0 min-w-[320px] lg:left-auto"
        >
          <TransferFiltersModal />
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default Filters;
