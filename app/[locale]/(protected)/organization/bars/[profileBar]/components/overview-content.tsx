"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";

import { type TCompareSlugProps } from "./compare-dialog";
import ComparedContent from "./compared-content";
import DefaultContent from "./default-content";

function OverviewContent() {
  const { getAParamValue } = useManageSearchParams<TCompareSlugProps>();
  const compareBarSlug = getAParamValue("compareBarSlug");
  const isProbableValidSlug = checkIsValidId(compareBarSlug, {
    type: "string",
  });

  if (isProbableValidSlug) {
    return <ComparedContent />;
  }

  return <DefaultContent />;
}

export default OverviewContent;
