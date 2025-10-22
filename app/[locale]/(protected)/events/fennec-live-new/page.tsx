import Link from "next/link";
import { Fragment } from "react";

import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";
import { Button } from "@/components/ui/button";

import PageContent from "./components/page-content";

export const metadata = getSeoMeta({ title: "Launch Fennec Live" });

function FennecLivePage() {
  return (
    <Fragment>
      <PageHeader title="Fennec Live" />
      <div className="mt-4 flex flex-col justify-between md:flex-row">
        <DynamicBreadcrumb className="!mb-0" />
        <Button color="primary">
          <Link href="/en/events/host-event">Host an Event</Link>
        </Button>
      </div>
      <PageContent />
    </Fragment>
  );
}

export default FennecLivePage;
