import { memo, useCallback, useMemo } from "react";

import { getAvatarFallbackName } from "@/lib/user/get-avatar-fallback-name";
import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type TAddonItemProps<T extends TAddOn> = {
  item: T;
  onToggleAddon?: (addon: T | null | undefined) => void;
  onDeleteAddon?: (addon: T | null | undefined) => void;
  isSelected?: boolean;
};

function AddonItem<T extends TAddOn>({
  item: { maxQty, media, name, price },
  item,
  onToggleAddon,
  onDeleteAddon,
  isSelected,
}: TAddonItemProps<T>) {
  const avatarFallbackName: string = useMemo(
    () => getAvatarFallbackName(name),
    [name],
  );

  const handleAddonSelect = useCallback(
    ({
      item,
      onToggleAddon,
      onDeleteAddon,
      actionForAddon,
    }: Pick<TAddonItemProps<T>, "item" | "onToggleAddon" | "onDeleteAddon"> & {
      actionForAddon: "delete" | "select";
    }) =>
      () => {
        switch (actionForAddon) {
          case "select":
            onToggleAddon?.(item);
            break;

          case "delete":
            onDeleteAddon?.(item);
            break;

          default:
            break;
        }
        onToggleAddon?.(item);
      },
    [],
  );

  return (
    <Card className="group cursor-pointer p-4">
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
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-default-700">
                  {name}
                </span>
              </div>
              <div className="text-sm text-default-600">
                <span>${price}</span>
              </div>
            </div>
          </div>

          <div className="relative flex flex-none items-center gap-2">
            <div className="group-hover:-translate-x-9">
              <span>Max QTY:</span>
              <span>{maxQty}</span>
            </div>

            <div className="absolute end-0 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              <Button
                size="icon"
                type="button"
                className="hidden size-5 self-start bg-primary text-primary-foreground hover:bg-primary group-hover:flex"
                onClick={handleAddonSelect({
                  item,
                  onToggleAddon,
                  onDeleteAddon,
                  actionForAddon: "select",
                })}
              >
                {isSelected ? (
                  <MinusIcon className="size-3.5" />
                ) : (
                  <PlusIcon className="size-3.5" />
                )}
              </Button>

              <Button
                size="icon"
                type="button"
                className="hidden size-5 self-start group-hover:flex"
                color="destructive"
                onClick={handleAddonSelect({
                  item,
                  onToggleAddon,
                  onDeleteAddon,
                  actionForAddon: "delete",
                })}
              >
                <DeleteIcon className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(AddonItem);
