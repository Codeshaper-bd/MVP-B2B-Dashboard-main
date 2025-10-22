"use client";

import BackButton from "@/components/Buttons/back-button";
import CloudDownloadIcon from "@/components/icons/CloudDownloadIcon";
import { Button } from "@/components/ui/button";
import SearchComponent from "@/components/ui/search-component";

function PageToolbar() {
  return (
    <div className="flex flex-none flex-wrap items-center gap-3">
      <SearchComponent />
      <Button type="button" color="secondary">
        <CloudDownloadIcon className="me-1 size-5" />
        Download All
      </Button>
      <BackButton />
    </div>
  );
}

export default PageToolbar;
