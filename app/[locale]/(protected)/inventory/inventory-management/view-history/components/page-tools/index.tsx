import SearchComponent from "@/components/ui/search-component";

import Filters from "./filters";

function PageTools() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <SearchComponent />
      <div className="flex items-center gap-3">
        <Filters />
      </div>
    </div>
  );
}

export default PageTools;
