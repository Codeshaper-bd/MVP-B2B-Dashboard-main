"use client";

import useBooleanState from "@/hooks/useBooleanState";
import FilterContent from "@/components/filter-content";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";

import FilterForm from "./filter-form";

function FeedbackFilters() {
  const { state: isOpen, setClose, toggle } = useBooleanState();

  return (
    <FilterContent
      open={isOpen}
      onClose={setClose()}
      triggerContent={
        <Button
          color={isOpen ? "primary" : "secondary"}
          onClick={toggle()}
          size="lg"
          className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
        >
          <FilterIcon className="me-2 h-4 w-4" />
          Filter
        </Button>
      }
      className="left-0 min-w-[320px] lg:left-auto"
    >
      <FilterForm setClose={setClose} />
    </FilterContent>
  );
}

export default FeedbackFilters;
