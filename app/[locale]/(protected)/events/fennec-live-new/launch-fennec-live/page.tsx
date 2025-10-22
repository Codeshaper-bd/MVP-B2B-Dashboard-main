import { Fragment } from "react";

import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import FormStepper from "./form-stepper";

export const metadata = getSeoMeta({ title: "Launch Fennec Live" });

function LaunchFennecLivePage() {
  return (
    <Fragment>
      <PageHeader title="Launch Fennec Live" />

      <DynamicBreadcrumb />

      <FormStepper />
    </Fragment>
  );
}

export default LaunchFennecLivePage;
