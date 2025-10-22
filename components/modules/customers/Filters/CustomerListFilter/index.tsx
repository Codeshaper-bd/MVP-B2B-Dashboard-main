import BooleanContext from "@/contexts/BooleanContext";
import FilterContent from "@/components/filter-content";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";

import CustomerListFilterContent from "./CustomerListFilterContent";

function CustomerListFilter() {
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
            <Button color="primary" size="lg" className="md:px-5">
              <FilterIcon className="me-2 h-4 w-4" />
              Filters
            </Button>
          }
        >
          <CustomerListFilterContent />
        </FilterContent>
      )}
    </BooleanContext>
  );
}

export default CustomerListFilter;
