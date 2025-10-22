import { Fragment } from "react";

import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import FennecLivePageContent from "./FennecLivePageContent";

export const metadata = getSeoMeta({ title: "Fennec Live" });

function FennecLivePage() {
  return (
    <Fragment>
      <PageHeader title="Fennec Live" description="Owner Dashboard" />
      <div className="mt-4 flex flex-col justify-between md:flex-row">
        <DynamicBreadcrumb className="!mb-0" />
      </div>
      <FennecLivePageContent />
    </Fragment>
  );
}

export default FennecLivePage;
