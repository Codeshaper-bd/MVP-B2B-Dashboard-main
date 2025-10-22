"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import CompareEmployeeDialog from "@/components/modules/employees/modals/CompareEmployeeDialog";
import type { TCompareIdProps } from "@/components/modules/employees/modals/CompareEmployeeDialog/compare-form";

import ComparedContent from "./ComparedContent";
import DefaultContent from "./DefaultContent";

function PageOverview() {
  const { getAParamValue } = useManageSearchParams<TCompareIdProps>();
  const isCompareEmployeeId = getAParamValue("compareEmployeeId");
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <DynamicBreadcrumb className="lg:mb-0" />
        <div className="flex items-center gap-3">
          <BackButton />

          <CompareEmployeeDialog />
        </div>
      </div>

      <div className="mt-6">
        {isCompareEmployeeId ? <ComparedContent /> : <DefaultContent />}
      </div>
    </div>
  );
}

export default PageOverview;
