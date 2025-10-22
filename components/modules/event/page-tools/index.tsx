"use client";

import BooleanContext from "@/contexts/BooleanContext";

import FilterSection from "./FilterSection";
import FiltersModal, { type IFiltersModalProps } from "./Modal/FiltersModal";

interface IPageToolsProps extends IFiltersModalProps {}

function PageTools({ type }: IPageToolsProps) {
  return (
    <BooleanContext>
      {({ isOpen: isFilterModalOpen }) => (
        <div>
          <FilterSection />

          {isFilterModalOpen && <FiltersModal type={type} />}
        </div>
      )}
    </BooleanContext>
  );
}

export default PageTools;
