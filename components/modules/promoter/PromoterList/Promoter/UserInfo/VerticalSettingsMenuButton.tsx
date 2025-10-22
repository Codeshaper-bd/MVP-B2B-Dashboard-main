"use client";

import { memo, useCallback } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import { useDeletePromoterMutation } from "@/store/api/promoters/promoters-api";
import DeleteConfirmationDialog from "@/components/features/alert-dialog/DeleteConfirmationDialog";
import VerticalThreeDotIcon from "@/components/icons/VerticalThreeDotIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import CompareModal from "./CompareModal/CompareModal";
import EditPromoterModal from "../../../Modals/EditPromoterModal";

export interface IVerticalSettingsMenuButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  dataId: string | number | null | undefined;
  userId: string | number | null | undefined;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    dataId: IVerticalSettingsMenuButtonProps["dataId"],
  ) => void;
  onCompare?: (dataId: IVerticalSettingsMenuButtonProps["dataId"]) => void;
}

export type TProcessHandleButtonClick = (props: {
  dataId: IVerticalSettingsMenuButtonProps["dataId"];
  onClick: IVerticalSettingsMenuButtonProps["onClick"];
}) => (e: React.MouseEvent<HTMLButtonElement>) => void;

function VerticalSettingsMenuButton({
  dataId,
  userId,
  onClick,
  onCompare,
}: IVerticalSettingsMenuButtonProps) {
  const { toast } = useToast();
  const [deletePromoter, { isLoading: isDeletingPromoter }] =
    useDeletePromoterMutation();
  const processHandleButtonClick: TProcessHandleButtonClick = useCallback(
    ({ dataId, onClick }) =>
      (e) => {
        onClick?.(e, dataId);
      },
    [],
  );

  const {
    state: isDropdownOpen,
    setClose: closeDropdown,
    setState: setDropdownState,
  } = useBooleanState();

  const {
    state: isCompareDialogOpen,
    setOpen: openCompareDialog,
    setClose: closeCompareDialog,
    setState: setCompareDialogState,
  } = useBooleanState();

  const {
    state: isDeleteDialogOpen,
    setOpen: openDeleteDialog,
    setClose: closeDeleteDialog,
  } = useBooleanState();

  const {
    state: isEditDialogOpen,
    setOpen: openEditDialog,
    setClose: closeEditDialog,
    setState: setIsEditDialogOpen,
  } = useBooleanState();

  const handleDeletePromoter = useCallback(async () => {
    // console.log("User ID:", userId);
    const toastId = toast({
      variant: "loading",
      title: "Deleting Promoter",
      description: "Please wait while we delete the promoter.",
    });
    try {
      await deletePromoter({
        id: dataId,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Promoter deleted successfully",
        description: "Promoter deleted successfully",
      });
      closeDeleteDialog()();
    } catch (error) {
      console.error("Error deleting promoter:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error deleting promoter",
        description: "An error occurred while deleting the promoter.",
      });
    }
  }, [closeDeleteDialog, dataId, deletePromoter, toast]);

  return (
    <>
      <div>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownState}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="z-10 rounded-full border border-solid border-default-200 bg-default-100 p-2.5 transition-all duration-200 hover:bg-default-100/80"
              onClick={processHandleButtonClick({ dataId, onClick })}
            >
              <VerticalThreeDotIcon className="h-5 w-5 text-default-1000" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="mt-2 w-48 space-y-0 rounded-[12px] bg-default-50 px-2 py-2"
            align="end"
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openEditDialog()();
                closeDropdown()();
              }}
              className="group cursor-pointer bg-transparent px-2.5 py-2.5 font-medium"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onCompare?.(userId);
                openCompareDialog()();
                closeDropdown()();
              }}
              className="group cursor-pointer bg-transparent px-2.5 py-2.5 font-medium"
            >
              Compare
            </DropdownMenuItem>

            <Separator className="bg-default-200" />

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openDeleteDialog()();
                closeDropdown()();
              }}
              className="cursor-pointer bg-transparent px-2.5 py-2.5 font-medium text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CompareModal
          open={isCompareDialogOpen}
          setOpen={setCompareDialogState}
          dataId={userId}
        />
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={() => {
            closeDeleteDialog()();
          }}
          onConfirmClick={handleDeletePromoter}
          isLoading={isDeletingPromoter}
          confirmText="Delete"
          title="Delete Promoter"
          description="Are you sure you want to delete this promoter? You cannot undo this action"
        />
        <EditPromoterModal
          userId={userId}
          open={isEditDialogOpen}
          setOpen={setIsEditDialogOpen}
        />
      </div>
    </>
  );
}

export default memo(VerticalSettingsMenuButton);
