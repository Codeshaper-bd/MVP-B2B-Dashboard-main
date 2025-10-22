"use client";

import useBooleanState from "@/hooks/useBooleanState";
import type { TBarMenuItem } from "@/store/api/bar-menu-item/bar-menu-item.types";
import type { TNullish } from "@/store/api/common-api-types";
import DotVerticalIcon from "@/components/icons/DotVerticalIcon";
import RepeatIcon from "@/components/icons/RepeatIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ChangeImageDialog from "./change-image-dialog";

interface IChangeImageProps {
  item: TBarMenuItem | TNullish;
}

function ChangeImage({ item }: IChangeImageProps) {
  const {
    state: isDropdownOpen,
    // setOpen: openDropdown,
    setClose: closeDropdown,
    setState: setDropdownState,
  } = useBooleanState();
  const {
    state: isChangeImageDialogOpen,
    setOpen: openChangeImageDialog,
    setClose: closeChangeImageDialog,
  } = useBooleanState();

  return (
    <div className="absolute right-2 top-2 z-50">
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownState}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20"
          >
            <DotVerticalIcon className="size-6 text-default-1000" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="space-y-0 bg-default-100 px-2 py-2"
          align="end"
        >
          {/* <Separator className="bg-default-200" /> */}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              openChangeImageDialog()();
              closeDropdown()();
            }}
            className="group cursor-pointer bg-transparent px-1 py-2 font-medium"
          >
            <RepeatIcon className="me-2 size-5 text-default-600 group-hover:text-primary-foreground" />
            <span>Change Image</span>
          </DropdownMenuItem>

          {/* <Separator className="bg-default-200" /> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangeImageDialog
        item={item}
        open={isChangeImageDialogOpen}
        setOpen={closeChangeImageDialog()}
      />
    </div>
  );
}

export default ChangeImage;
