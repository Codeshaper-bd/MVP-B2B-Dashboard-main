import useBooleanState from "@/hooks/useBooleanState";
import FilterContent from "@/components/filter-content";

function EmployeeFilters() {
  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();
  return (
    <div>
      <FilterContent
        open={isFilterOpen}
        onClick={toggleFilterOpen()}
        onClose={closeFilter()}
        triggerButtonClassName="h-11"
      >
        Coming Soon...
      </FilterContent>
    </div>
  );
}

export default EmployeeFilters;
