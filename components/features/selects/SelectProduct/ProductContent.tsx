import { useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useManageStateParams from "@/hooks/useManageStateParams";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetAllInventoryItemQuery } from "@/store/api/inventory-item/inventory-item-api";
import type { TGetAllInventoryItemArgs } from "@/store/api/inventory-item/inventory-item.types";
import RenderData from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import InventoryCategoryOption from "./InventoryCategoryOption";
import SearchProduct from "./SearchProduct";
import SelectedItem from "./SelectedItem";
import { useSelectInputContext } from "./SelectProvider";

function ProductContent() {
  const { isOpen } = useBooleanContext();
  const { filterBy } = useSelectInputContext();
  const [selectedSlug, setSelectedSlug] = useState<
    TIdOrSlugOrIdentifier<"slug">["slug"] | null
  >(null);

  const manageStateParams =
    useManageStateParams<Exclude<TGetAllInventoryItemArgs, void>>();
  const { getAllParamValue } = manageStateParams;
  const { search } = getAllParamValue();
  const { data: getAllInventoryItemRes, ...getAllInventoryItemApiState } =
    useGetAllInventoryItemQuery({
      search,
      pageSize: 10,
      categories: selectedSlug ? `${selectedSlug}` : undefined,
      soldBy: filterBy === "All" ? undefined : filterBy,
    });
  const getAllInventoryItemData = getAllInventoryItemRes?.data;
  if (isOpen) {
    return (
      <Card className="absolute top-full z-50 mt-4 w-full rounded-md border-[#1F242F] bg-default-50">
        <CardContent className="p-0">
          <SearchProduct manageStateParams={manageStateParams} />
          <div className="border-b border-default-200"></div>
          <InventoryCategoryOption
            selectedSlug={selectedSlug}
            onSelect={setSelectedSlug}
          />
          <ScrollArea className="mt-3 h-[200px]">
            <RenderData
              expectedDataType="array"
              data={getAllInventoryItemData}
              {...getAllInventoryItemApiState}
            >
              {getAllInventoryItemData?.map((item) => (
                <SelectedItem key={item?.id} item={item} />
              ))}
            </RenderData>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }
  return null;
}

export default ProductContent;
