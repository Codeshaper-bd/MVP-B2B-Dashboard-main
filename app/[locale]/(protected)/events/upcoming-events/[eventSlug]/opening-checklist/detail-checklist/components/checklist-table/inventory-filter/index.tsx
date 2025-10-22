import { memo } from "react";

import BooleanContext from "@/contexts/BooleanContext";
import FilterContent from "@/components/filter-content";
import FilterLinesIcon from "@/components/icons/FilterLinesIcon";
import { Button } from "@/components/ui/button";

function InventoryFilter() {
  return (
    <BooleanContext>
      {({
        isOpen: isFilterOpen,
        toggle: toggleFilterOpen,
        setClose: closeFilter,
      }) => (
        <FilterContent
          open={isFilterOpen}
          onClick={toggleFilterOpen}
          onClose={closeFilter}
          triggerContent={
            <Button
              color={isFilterOpen ? "primary" : "secondary"}
              className="!px-3.5 !py-2.5"
            >
              <FilterLinesIcon className="me-1 h-4 w-4" />
              Filter
            </Button>
          }
        >
          Coming soon
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default memo(InventoryFilter);
