"use client";

import { Loader2 } from "lucide-react";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { useDeleteBarMenuMutation } from "@/store/api/bar-menu/bar-menu-api";
import type {
  TDeleteABarMenuArgs,
  TBarMenu,
} from "@/store/api/bar-menu/bar-menu.types";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { InfoIcon as InfoIcon } from "@/components/icons";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import BgRings from "@/components/ui/BgRings";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface IDeleteCategoryDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  slug: TDeleteABarMenuArgs["slug"];
  name: TBarMenu["name"];
}

function DeleteCategoryDialog({
  open,
  setOpen,
  slug,
  name,
}: IDeleteCategoryDialogProps) {
  const [deleteBarMenu, { isLoading }] = useDeleteBarMenuMutation();
  const { toast } = useToast();

  const handleDelete = async (categorySlug: string) => {
    const toastId = toast({
      variant: "loading",
      title: "Deleting Category",
      description: "Please wait while we delete your category",
    });
    try {
      await deleteBarMenu({
        slug: categorySlug,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Category Deleted Successfully!",
        description: getApiErrorMessage(
          undefined,
          "Congratulations! You have successfully deleted a category.",
        ),
      });

      setOpen(false);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Category Delete Failed",
          description: "Something went wrong while deleting category.",
        }),
      });
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<DeleteIcon className="size-5" />}
        title={`Delete - ${name}?`}
        description="Are you sure you want to delete this category?"
      >
        <div className="space-y-8">
          <div className="flex items-center gap-4 overflow-hidden rounded-[12px] border border-[#F97066] bg-default-50 py-4 pe-4 ps-2">
            <BgRings className="transparent-with-rounded-border mx-auto flex size-8 items-center justify-center rounded-full border-[2px] border-warning border-opacity-30 bg-transparent p-6">
              <BgRings className="transparent-with-rounded-border mx-auto flex size-5 items-center justify-center rounded-full border-[2px] border-warning border-opacity-60 bg-transparent">
                <BgRings.Content>
                  <InfoIcon className="size-5 text-warning" />
                </BgRings.Content>
              </BgRings>
            </BgRings>
            <div>All products within this category will also be removed.</div>
          </div>
          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              fullWidth
              color="secondary"
              className="rounded-[8px] bg-default-50"
              size="lg"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              color="primary"
              className="rounded-[8px]"
              size="lg"
              onClick={() => handleDelete(slug || "")}
            >
              {isLoading ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-4 w-4 animate-spin" /> Deleting...
                </span>
              ) : (
                <span>Delete</span>
              )}
            </Button>
          </div>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DeleteCategoryDialog;
