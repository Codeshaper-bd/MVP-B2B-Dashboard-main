"use client";

import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useDeleteBarMenuItemMutation } from "@/store/api/bar-menu-item/bar-menu-item-api";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import type { TDeleteAnInventoryItemMutation } from "@/store/api/inventory-item/inventory-item.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DeleteIcon from "@/components/icons/DeleteIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import { useRouter } from "@/components/navigation";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { type TUseToastReturnType, useToast } from "@/components/ui/use-toast";

type TPageParams = Params & {
  category?: string;
  locale?: string;
  productSlug?: string;
};

interface IDeleteBarMenuProductDialogProps {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
}

function DeleteBarMenuProductDialog({
  slug,
}: IDeleteBarMenuProductDialogProps) {
  const {
    state: isDeleteAlertOpen,
    setOpen: setIsDeleteAlertOpen,
    setClose: setIsDeleteAlertClose,
  } = useBooleanState();
  const [deleteBarMenuItem, { isLoading }] = useDeleteBarMenuItemMutation();
  const toastProps = useToast();
  const router = useRouter();
  const params = useParams<TPageParams>();

  const handleDelete =
    ({
      slug,
      toastProps: { toast },
      deleteBarMenuItem,
      setIsDeleteAlertClose,
      router,
      params: { category },
    }: {
      slug: TIdOrSlugOrIdentifier<"slug">["slug"];
      toastProps: TUseToastReturnType;
      deleteBarMenuItem: TDeleteAnInventoryItemMutation;
      setIsDeleteAlertClose: (
        props: Partial<TExternalState> | void,
      ) => () => void;
      router: ReturnType<typeof useRouter>;
      params: ReturnType<typeof useParams<TPageParams>>;
    }) =>
    async () => {
      const toastId = toast({
        variant: "loading",
        title: "Deleting Product",
        description: "Please wait...",
      });

      try {
        if (!checkIsValidId(slug, { type: "string" })) {
          throw new Error("Product ID is required to delete the produ");
        }

        const response = await deleteBarMenuItem({
          slug,
        }).unwrap();
        if (!response?.success) {
          throw new Error(response?.message || "Failed to delete the product.");
        }

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Product Deleted Successfully!",
          description: getApiErrorMessage(
            undefined,
            "Congratulations! You have successfully deleted an the product..",
          ),
        });
        setIsDeleteAlertClose()();
        router.replace(`/inventory/bar-menu/${category}`);
      } catch (error) {
        console.error("🚀 ~ error:", error);
        toastId.update({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: "Product Deletion Failed",
            description: "An error occurred while deleting the product..",
          }),
        });
      }
    };

  return (
    <AlertDialog open={isDeleteAlertOpen}>
      <Button
        color="secondary"
        className="gap-1.5"
        type="button"
        onClick={setIsDeleteAlertOpen()}
      >
        <DeleteIcon className="size-5 text-[#F97066]" />
        <span className="text-sm font-semibold text-[#F97066]">
          Delete Product
        </span>
      </Button>

      <StatusAlert
        status="destructive"
        withCloseButton
        disableInternallyClose
        onClose={
          !isLoading
            ? setIsDeleteAlertClose({
                // afterExecute: handleClearData(setCardData),
              })
            : () => {}
        }
        icon={<InfoIcon className="size-5" />}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      >
        <StatusAlert.Buttons.SecondaryButton
          disableInternallyClose
          onClick={setIsDeleteAlertClose()}
          disabled={isLoading}
        >
          Close
        </StatusAlert.Buttons.SecondaryButton>
        <StatusAlert.Buttons.PrimaryButton
          disabled={isLoading}
          onClick={handleDelete({
            slug,
            toastProps,
            deleteBarMenuItem,
            setIsDeleteAlertClose,
            router,
            params,
          })}
        >
          <ButtonLoadingContent
            actionContent="Continue"
            isLoading={isLoading}
          />
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DeleteBarMenuProductDialog;
