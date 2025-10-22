import { memo, useEffect, useMemo, useRef, useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useBooleanState from "@/hooks/useBooleanState";
import { useGetAllAddOnQuery } from "@/store/api/add-ons/add-ons-api";
import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";

import AddonItem, { type TAddonItemProps } from "./addon-item";
import DeleteAddonDialog from "./delete-addon-dialog";

export type TAddonsListProps = Pick<
  TAddonItemProps<TAddOn>,
  "onToggleAddon"
> & {
  selectedAddons?: TAddOn[] | TIdOrSlugOrIdentifier<"id">["id"][] | null;
  onDeleteAddonSuccess?: (data: TAddOn | TNullish) => void;
};

function AddonsList({
  selectedAddons,
  onToggleAddon,
  onDeleteAddonSuccess,
}: TAddonsListProps) {
  const [targetAddon, setTargetAddon] = useState<TAddOn | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(true);
  const {
    state: isDeleteDialogOpen,
    setOpen: setDeleteDialogOpen,
    setState: setIsOpenDeleteDialog,
  } = useBooleanState();

  const { data: getAllAddOnRes, ...getAllAddOnApiState } = useGetAllAddOnQuery({
    pageSize: contentPerPageOptions[10],
  });
  const getAllAddonData = getAllAddOnRes?.data;

  const selectedAddonsSet = useMemo(() => {
    const selectedAddonsSet = new Set<string | number>();
    const selectedAddonsLength = selectedAddons?.length ?? 0;

    for (let index = 0; index < selectedAddonsLength; index++) {
      const selectedAddon = selectedAddons?.[index];
      if (typeof selectedAddon === "object" && selectedAddon?.id) {
        selectedAddonsSet.add(selectedAddon?.id);
      } else if (
        typeof selectedAddon === "string" ||
        typeof selectedAddon === "number"
      ) {
        selectedAddonsSet.add(selectedAddon);
      }
    }

    return selectedAddonsSet;
  }, [selectedAddons]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }

    const checkOverflowAndPosition = () => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1;
      setAtBottom(!isScrollable || isAtBottom);
    };

    checkOverflowAndPosition();

    el.addEventListener("scroll", checkOverflowAndPosition);
    window.addEventListener("resize", checkOverflowAndPosition);

    return () => {
      el.removeEventListener("scroll", checkOverflowAndPosition);
      window.removeEventListener("resize", checkOverflowAndPosition);
    };
  }, [getAllAddonData]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };
  return (
    <div
      ref={scrollRef}
      className="custom-scrollbar relative mb-4 mt-6 h-[160px] overflow-y-scroll pr-2.5"
    >
      <RenderData
        {...getAllAddOnApiState}
        data={getAllAddonData}
        expectedDataType="array"
      >
        <div className="space-y-3">
          {getAllAddonData?.map((item) => (
            <AddonItem
              key={item?.id || item?.slug}
              item={item}
              isSelected={!!item?.id && selectedAddonsSet.has(item?.id)}
              onToggleAddon={onToggleAddon}
              onDeleteAddon={setDeleteDialogOpen({
                beforeExecute: () => setTargetAddon(item),
              })}
            />
          ))}
        </div>
      </RenderData>

      <DeleteAddonDialog
        open={isDeleteDialogOpen}
        setOpen={setIsOpenDeleteDialog}
        data={targetAddon}
        onDelete={onDeleteAddonSuccess}
      />
      {!atBottom && (
        <Button
          onClick={scrollToBottom}
          size="icon"
          variant="ghost"
          className="sticky bottom-0 left-1/2 z-50 -translate-x-1/2 transform animate-bounce rounded-full !p-0 shadow-md"
        >
          <ChevronDownIcon className="h-4 w-4 text-primary" />
        </Button>
      )}
    </div>
  );
}

export default memo<typeof AddonsList>(AddonsList);
