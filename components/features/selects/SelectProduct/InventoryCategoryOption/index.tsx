import { Loader } from "lucide-react";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetAllInventoryCategoryQuery } from "@/store/api/inventory-category/inventory-category-api";
import RenderData from "@/components/render-data";

import CategoryOption from "./CategoryOption";

export interface IInventoryCategoryOptionProps {
  selectedSlug: TIdOrSlugOrIdentifier<"slug">["slug"] | null;
  onSelect: (slug: TIdOrSlugOrIdentifier<"slug">["slug"]) => void;
}
function InventoryCategoryOption({
  selectedSlug,
  onSelect,
}: IInventoryCategoryOptionProps) {
  const {
    data: getAllInventoryCategoryRes,
    ...getAllInventoryCategoryApiState
  } = useGetAllInventoryCategoryQuery({});
  const getAllInventoryCategoryData = getAllInventoryCategoryRes?.data;
  return (
    <div className="custom-scrollbar flex items-center gap-2.5 overflow-x-auto py-4">
      <RenderData
        expectedDataType="array"
        data={getAllInventoryCategoryData}
        {...getAllInventoryCategoryApiState}
        loadingSkeleton={
          <div className="flex h-12 flex-col justify-center px-4">
            <Loader className="h-4 w-4 animate-spin" />
          </div>
        }
      >
        {getAllInventoryCategoryData?.map((category) => (
          <CategoryOption
            key={category?.id}
            category={category}
            onSelect={onSelect}
            selectedSlug={selectedSlug}
          />
        ))}
      </RenderData>
    </div>
  );
}

export default InventoryCategoryOption;
