"use client";

import EditBarDialog from "@/app/[locale]/(protected)/organization/bars/components/modals/edit-bar-dialog";
import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

import CompareDialog from "./compare-dialog";
import OverviewContent from "./overview-content";
import { useGetProfileBarSlug } from "../hooks/useGetProfileBarSlug";
import DeleteBarDialog from "./bar-header/delete-bar-dialog";

function BarPageContent() {
  const { barSlug } = useGetProfileBarSlug();

  return (
    <>
      <div className="flex flex-col justify-between lg:flex-row">
        <DynamicBreadcrumb className="py-0 lg:mb-0" />

        <div className="flex flex-wrap items-center gap-3">
          <BackButton />
          <EditBarDialog barSlug={barSlug} />
          <DeleteBarDialog slug={barSlug} />
          <CompareDialog />
        </div>
      </div>

      <div className="mt-6">
        <OverviewContent />
      </div>
    </>
  );
}

export default BarPageContent;
