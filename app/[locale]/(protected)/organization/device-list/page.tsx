import Link from "next/link";

import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";
import { Button } from "@/components/ui/button";

import DragAndDrop from "./components/drag-and-drop";

function DeviceListPage() {
  return (
    <>
      <PageHeader title="Manage Devices " description="List Device" />

      <div className="mb-6 flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-4">
        <DynamicBreadcrumb className="!mb-0 lg:mb-0" />

        <Button color="primary" rounded="lg" className="md:px-4" asChild>
          <Link href="./devices">View Devices</Link>
        </Button>
      </div>
      <DragAndDrop />
    </>
  );
}

export default DeviceListPage;
