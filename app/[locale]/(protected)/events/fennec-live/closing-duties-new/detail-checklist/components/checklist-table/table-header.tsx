import SearchComponent from "@/components/ui/search-component";

import FiltersCard from "./filters-card";
import InventoryFilter from "./inventory-filter";

type Props = {};

function TableHeader(props: Props) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row">
      <h3 className="text-[20px] font-semibold">Overall</h3>
      <div className="mt-4 flex flex-col flex-wrap gap-2 lg:flex-row lg:items-center">
        <div className="flex flex-none flex-wrap items-center gap-3">
          <FiltersCard />
          <InventoryFilter />
        </div>
        <div className="flex-1">
          <SearchComponent className="max-w-[312px]" placeholder="Search" />
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
