import { useCallback, useMemo } from "react";

import { getAvatarFallbackName } from "@/lib/user/get-avatar-fallback-name";
import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import SquarePenIcon from "@/components/icons/SquarePenIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type TAddonItemProps = {
  item: TAddOn;
  onDelete?: (item: TAddOn) => void;
  handleEditAddon?: (addon: TAddOn | null) => void;
};

function AddonItem({ item, onDelete, handleEditAddon }: TAddonItemProps) {
  const { name, price, maxQty, media, id, slug } = item;

  const avatarFallbackName: string = useMemo(
    () => getAvatarFallbackName(name),
    [name],
  );

  const handleDeleteCallback = useCallback(
    ({ item, onDelete }: Pick<TAddonItemProps, "item" | "onDelete">) =>
      () => {
        onDelete?.(item);
      },
    [],
  );

  return (
    <Card className="px-4 py-6">
      <CardContent className="p-0">
        <div className="flex gap-3">
          <div className="flex flex-1 items-center gap-3">
            <Avatar className="size-10 cursor-pointer rounded-full border-2 border-transparent bg-default-100 p-2 hover:bg-default-200/50">
              <AvatarImage
                src={media?.url || ""}
                alt="icon"
                className="size-[22px]"
              />

              <AvatarFallback>{avatarFallbackName}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="mb-1 text-sm font-medium text-default-700">
                {name}
              </h3>

              <div className="flex gap-1 text-sm text-default-600">
                <span>${price}</span>
                <span>|</span>
                <span>Max: {maxQty}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-none items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              rounded="full"
              type="button"
              onClick={() => handleEditAddon?.(item)}
            >
              <SquarePenIcon className="size-5 text-[#F79009]" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              rounded="full"
              type="button"
              onClick={handleDeleteCallback({ item, onDelete })}
            >
              <DeleteIcon className="size-5 text-[#F04438]" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddonItem;
