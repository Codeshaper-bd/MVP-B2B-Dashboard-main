import { memo } from "react";

import BooleanContext from "@/contexts/BooleanContext";
import FilterContent from "@/components/filter-content";
import FilterLinesIcon from "@/components/icons/FilterLinesIcon";
import { Button } from "@/components/ui/button";

import CustomerLookupFilterContent from "./customer-lookup-filter-content";

function InventoryManagementFilter() {
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
              size={"icon"}
              className=""
            >
              <FilterLinesIcon className="h-4 w-4" />
            </Button>
          }
        >
          <CustomerLookupFilterContent />
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default memo(InventoryManagementFilter);
