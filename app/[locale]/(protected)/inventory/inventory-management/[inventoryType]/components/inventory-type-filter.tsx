"use client";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { useRouter } from "@/components/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface IInventoryFilterOptions {
  label: string;
  value: "alcoholic" | "non-alcoholic";
}
const filterOptions: IInventoryFilterOptions[] = [
  { label: "Alcoholic", value: "alcoholic" },
  { label: "Non Alcoholic", value: "non-alcoholic" },
];

export type TInventoryPageParams = Params & {
  locale: string;
  inventoryType: IInventoryFilterOptions["value"];
};

function InventoryTypeFilter() {
  const { inventoryType } = useParams<TInventoryPageParams>();
  const router = useRouter();

  return (
    <div className="w-fit">
      <Tabs
        value={inventoryType}
        className="w-full"
        onValueChange={(value) => {
          const type = value as IInventoryFilterOptions["value"];
          router.replace(`/inventory/inventory-management/${type}`, {
            scroll: true,
          });
        }}
      >
        <TabsList className="w-full border border-default-100">
          {filterOptions.map((filter) => (
            <TabsTrigger key={filter.value} value={filter.value}>
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

export default InventoryTypeFilter;
