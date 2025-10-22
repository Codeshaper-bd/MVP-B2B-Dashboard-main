import { Fragment } from "react";

import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import FormStepper from "./form-stepper";

export const metadata = getSeoMeta({ title: "Host Event" });

function Page() {
  return (
    <Fragment>
      <PageHeader title="Host Event" />

      <DynamicBreadcrumb />

      <FormStepper />
    </Fragment>
  );
}

export default Page;
