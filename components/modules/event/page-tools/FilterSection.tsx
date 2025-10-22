"use client";

import { useBooleanContext } from "@/contexts/BooleanContext";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";

export default function FilterSection() {
  const { isOpen: isFilterModalOpen, toggle: toggleFilterModal } =
    useBooleanContext();

  return (
    <Button
      onClick={toggleFilterModal}
      className="border border-solid border-border"
      color={isFilterModalOpen ? "primary" : "secondary"}
      size="md"
    >
      <FilterIcon className="mr-2 h-4 w-4" />
      Filter
    </Button>
  );
}
