import React, { Fragment } from "react";

import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./components/page-content";

function ClosingDutiesPage() {
  return (
    <Fragment>
      <PageHeader title="Closing Duties" />
      <div className="mt-4 flex flex-col-reverse justify-between gap-2 md:flex-row">
        <DynamicBreadcrumb className="!mb-0" />
        <div>
          <BackButton label="Return to Fennec Live" />
        </div>
      </div>
      <PageContent />
    </Fragment>
  );
}

export default ClosingDutiesPage;
