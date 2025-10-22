import { cn } from "@/lib/utils";
import RenderData from "@/components/render-data";

import AddonItem, { type TAddonItemProps } from "./addon-item";

type TAddonsListProps = Pick<
  TAddonItemProps,
  "onDelete" | "handleEditAddon"
> & {
  selectedAddons: TAddonItemProps["item"][] | null | undefined;
  isAddOnEnabled: boolean;
};

function AddonsList({
  onDelete,
  selectedAddons,
  handleEditAddon,
  isAddOnEnabled,
}: TAddonsListProps) {
  return (
    <RenderData
      data={selectedAddons ?? []}
      expectedDataType="array"
      isError={false}
      error={null}
      isLoading={false}
      isFetching={false}
      isSuccess={true}
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-6 transition-opacity duration-300 lg:grid-cols-2",
          {
            "pointer-events-none opacity-50": !isAddOnEnabled,
          },
        )}
      >
        {selectedAddons?.map((item) => (
          <AddonItem
            key={item?.id}
            item={item}
            onDelete={onDelete}
            handleEditAddon={handleEditAddon}
          />
        ))}
      </div>
    </RenderData>
  );
}

export default AddonsList;
