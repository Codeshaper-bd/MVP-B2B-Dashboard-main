import type { TExternalState } from "@/hooks/useBooleanState";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import type { TDeleteAPromotionMutation } from "@/store/api/promotion/promotion.types";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import type { TUseToastReturnType } from "@/components/ui/use-toast";
type THandleDelete = (props: {
  toastProps: TUseToastReturnType;
  deleteAPromotion: TDeleteAPromotionMutation;
  data: TCallbackData | undefined;
  setIsDeleteAlertClose: (props: Partial<TExternalState> | void) => () => void;
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
}) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;

export const handleDelete: THandleDelete =
  ({
    toastProps,
    data,
    deleteAPromotion,
    setIsDeleteAlertClose,
    setCardData,
  }) =>
  async () => {
    const toastId = toastProps.toast({
      title: "Deleting Promotion",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      if (!data?.id) {
        throw new Error("Promotion slug is required to delete challenge");
      }

      await deleteAPromotion({ slug: data.id?.toString() }).unwrap();
      toastId.update({
        id: toastId.id,
        title: "Promotion Deleted",
        description: "Promotion has been deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting challenge:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Deleting Promotion",
          description: "An error occurred while deleting the promotion.",
        }),
      });
    } finally {
      setIsDeleteAlertClose?.()?.();
      setCardData?.(undefined);
    }
  };

function useDeleteModal<T extends TIdOrSlugOrIdentifier>() {}

export default useDeleteModal;
