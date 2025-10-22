"use client";

import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

function PageTop() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <DynamicBreadcrumb className="mb-0 lg:mb-0" />
      <div className="flex-none">
        <BackButton />
      </div>
    </div>
  );
}

export default PageTop;
