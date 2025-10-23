import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useDeleteAnInventoryItemMutation } from "@/store/api/inventory-item/inventory-item-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { useRouter } from "@/components/navigation";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface IPageParams extends Params {
  locale?: string;
  inventoryType?: "alcoholic" | "non-alcoholic";
  productSlug?: string;
}

interface IDeleteInventoryItemProps {
  inventoryItemSlug?: string;
  isUpdateLoading?: boolean;
}

function DeleteInventoryItem({
  inventoryItemSlug,
  isUpdateLoading,
}: IDeleteInventoryItemProps) {
  const [deleteAnInventoryItem, { isLoading: isDeleteLoading }] =
    useDeleteAnInventoryItemMutation();
  const { toast } = useToast();
  const router = useRouter();
  const { inventoryType } = useParams<IPageParams>();
  const isLoading = isUpdateLoading || isDeleteLoading;

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Deleting Inventory Product...",
      description: "Please wait while we delete the inventory product.",
    });

    try {
      if (!checkIsValidId(inventoryItemSlug, { type: "string" })) {
        throw new Error("Inventory item slug is required to delete!");
      }
      const res = await deleteAnInventoryItem({
        slug: inventoryItemSlug,
      }).unwrap();

      if (!res?.success) {
        throw new Error(res?.message || "Something went wrong!");
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Inventory product deleted",
        description: "Inventory product has been successfully deleted",
      });
      router.replace(`/inventory/inventory-management/${inventoryType}`);
    } catch (error) {
      console.error("🚀 ~ handleDelete ~ error:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Failed to delete bar.",
        description: getApiErrorMessage(error, "Something went wrong!"),
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" className="gap-2 text-[#F97066]">
          <ButtonLoadingContent
            actionContent={
              <>
                <DeleteIcon className="size-5" />
                Delete Inventory
              </>
            }
            isLoading={isLoading}
          />
        </Button>
      </AlertDialogTrigger>

      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<DeleteIcon className="size-5" />}
        title="Delete Inventory Product"
        description="Are you sure you want to delete this inventory product?"
      >
        <StatusAlert.Buttons>
          <StatusAlert.Buttons.SecondaryButton disabled={isLoading}>
            Cancel
          </StatusAlert.Buttons.SecondaryButton>

          <StatusAlert.Buttons.PrimaryButton
            disabled={isLoading}
            onClick={handleDelete}
          >
            <ButtonLoadingContent
              actionContent="Delete"
              isLoading={isLoading}
            />
          </StatusAlert.Buttons.PrimaryButton>
        </StatusAlert.Buttons>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DeleteInventoryItem;
