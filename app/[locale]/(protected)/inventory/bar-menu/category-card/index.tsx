"use client";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TBarMenu } from "@/store/api/bar-menu/bar-menu.types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import DotVerticalIcon from "@/components/icons/DotVerticalIcon";
import RepeatIcon from "@/components/icons/RepeatIcon";
import TextInputIcon from "@/components/icons/TextInputIcon";
import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import ChangeImageDialog from "./change-image-dialog";
import DeleteCategoryDialog from "./delete-category-dialog";
import RenameDialog from "./rename-dialog";

function CategoryCard({ item }: { item: TBarMenu }) {
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
  const {
    state: isDeleteDialogOpen,
    setOpen: openDeleteDialog,
    setClose: closeDeleteDialog,
  } = useBooleanState();
  const {
    state: isRenameDialogOpen,
    setOpen: openRenameDialog,
    setClose: closeRenameDialog,
  } = useBooleanState();

  const { id, name, totalProducts, slug, media, isDefault } = item;
  const router = useRouter();

  return (
    <>
      <Card
        className="group cursor-pointer rounded-lg border-default-200 bg-default-50"
        onClick={() => router.push(`./bar-menu/${slug}`)}
      >
        <CardContent className="relative p-0">
          <div className="absolute right-2 top-2 z-50">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownState}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <DotVerticalIcon className="size-6 text-default-1000" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="space-y-0 bg-default-100 px-2 py-2"
                align="end"
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openRenameDialog()();
                    closeDropdown()();
                  }}
                  className="group cursor-pointer bg-transparent px-1 py-2 font-medium"
                >
                  <TextInputIcon className="me-2 size-5 text-default-600 group-hover:text-primary-foreground" />
                  <span>Rename</span>
                </DropdownMenuItem>

                <Separator className="bg-default-200" />
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
                  <span> Change Image</span>
                </DropdownMenuItem>

                <Separator className="bg-default-200" />

                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openDeleteDialog()();
                    closeDropdown()();
                  }}
                  className={cn(
                    "cursor-pointer bg-transparent px-1 py-2 font-medium text-destructive",
                    {
                      hidden: isDefault,
                    },
                  )}
                >
                  <DeleteIcon className="me-2 size-5" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative h-[180px] w-full overflow-hidden rounded-t-lg">
            <div className="absolute start-0 top-0 h-full w-full bg-gradient-to-b from-black/50 to-black/0"></div>
            <Image
              src={getImageFallback({
                src: media?.url,
                fallbackImageSize: 500,
              })}
              alt={`${name} image`}
              width={256}
              height={256}
              className="h-full w-full rounded-t-lg object-cover"
            />
          </div>

          <div className="p-4">
            <h3 className="mb-1 text-lg font-semibold text-default-900">
              <Link
                href={`./bar-menu/${slug}`}
                className="cursor-pointer hover:text-primary group-hover:text-primary"
              >
                {name}
              </Link>
            </h3>

            <p className="text-base font-medium text-default-700">
              {totalProducts} Product
            </p>
          </div>
        </CardContent>
      </Card>

      <RenameDialog
        item={item}
        open={isRenameDialogOpen}
        setOpen={closeRenameDialog()}
      />
      <ChangeImageDialog
        item={item}
        open={isChangeImageDialogOpen}
        setOpen={closeChangeImageDialog()}
      />
      <DeleteCategoryDialog
        slug={slug}
        name={name}
        open={isDeleteDialogOpen}
        setOpen={closeDeleteDialog()}
      />
    </>
  );
}

export default memo(CategoryCard);
