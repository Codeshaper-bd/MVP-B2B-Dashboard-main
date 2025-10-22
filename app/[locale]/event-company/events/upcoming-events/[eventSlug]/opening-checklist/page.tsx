import React, { Fragment } from "react";

import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./components/page-content";

function OpeningChecklistPage() {
  return (
    <Fragment>
      <div className="flex items-center gap-4">
        <BackButton />
        <div className="flex-1">
          <PageHeader title="Fennec Opening Checklist" description=" " />
        </div>
      </div>

      <div className="relative my-4 flex w-full flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        <DynamicBreadcrumb className="!mb-0" />
      </div>
      <div className="mb-4 mt-6">
        <PageContent />
      </div>
    </Fragment>
  );
}

export default OpeningChecklistPage;
