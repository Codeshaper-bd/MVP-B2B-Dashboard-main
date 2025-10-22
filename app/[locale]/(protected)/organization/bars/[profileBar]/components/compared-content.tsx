import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";

import BarHeader from "./bar-header";
import type { TCompareSlugProps } from "./compare-dialog";
import InventoryTable from "./inventory-table";
import RevenueGraph from "./revenue-graph";
import { useGetProfileBarSlug } from "../hooks/useGetProfileBarSlug";

function ComparedContent() {
  const { barSlug, isValidSlug } = useGetProfileBarSlug();
  const { getAParamValue } = useManageSearchParams<TCompareSlugProps>();
  const compareBarSlug = getAParamValue("compareBarSlug") || "";
  const isSlugValid = checkIsValidId(compareBarSlug, {
    type: "string",
  });
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <BarHeader barSlug={barSlug} isValidSlug={isValidSlug} isCompared />
        <RevenueGraph barSlug={barSlug} isValidSlug={isValidSlug} />
        <InventoryTable barSlug={barSlug} isValidSlug={isValidSlug} />
      </div>
      <div className="space-y-6">
        <BarHeader
          barSlug={compareBarSlug}
          isValidSlug={isSlugValid}
          isCompared
        />
        <RevenueGraph barSlug={compareBarSlug} isValidSlug={isSlugValid} />
        <InventoryTable barSlug={compareBarSlug} isValidSlug={isSlugValid} />
      </div>
    </div>
  );
}

export default ComparedContent;
