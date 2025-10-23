import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import { useSoftDeleteBarInventoryItemMutation } from "@/store/api/bar-inventory/bar-inventory-api";
import type { TTBarInventoryItemData } from "@/store/api/bar-inventory/bar-inventory.types";
import type { TNullish } from "@/store/api/common-api-types";
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
  barSlug?: string;
}

interface IDeleteInventoryItemProps {
  data: TTBarInventoryItemData | TNullish;
  isUpdateLoading?: boolean;
}

function DeleteInventoryItem({
  data,
  isUpdateLoading,
}: IDeleteInventoryItemProps) {
  const [deleteAnInventoryItem, { isLoading: isDeleteLoading }] =
    useSoftDeleteBarInventoryItemMutation();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<IPageParams>();
  const isLoading = isUpdateLoading || isDeleteLoading;

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Deleting Inventory Product...",
      description: "Please wait while we delete the inventory product.",
    });

    try {
      const ids = data?.children?.map((item) => item?.id);
      if (!ids?.length) {
        throw new Error("IDs are required to delete!");
      }
      const res = await deleteAnInventoryItem({
        body: { ids },
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
      router.replace(
        `/inventory/inventory-management/bar-inventory/${params?.barSlug || "-1"}`,
      );
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
