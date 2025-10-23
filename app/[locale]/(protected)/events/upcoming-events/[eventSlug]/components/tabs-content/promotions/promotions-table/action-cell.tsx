"üse client";

import type { CellContext } from "@tanstack/react-table";
import { memo } from "react";

import EditPromotionModal from "@/app/[locale]/(protected)/dashboard/promotions/components/Modals/EditPromotionModal";
import useBooleanState from "@/hooks/useBooleanState";
import { cn } from "@/lib/utils";
import type { TPromotion } from "@/store/api/promotion/promotion.types";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { EditIcon as EditPenIcon } from "@/components/icons";
import QrCodeIcon from "@/components/icons/QrCodeIcon";
import { usePathname } from "@/components/navigation";
import ViewQrCodeModal from "@/components/qr-code-modal";
import { Button } from "@/components/ui/button";

import { usePromotionContext } from "../promotion-context";

function ActionCell({ row: { original } }: CellContext<TPromotion, unknown>) {
  const pathname = usePathname();

  const isPastEvents = pathname.includes("/past-events");
  const { promotions, removePromotion, updatePromotion, addPromotion } =
    usePromotionContext();
  const {
    state: isEditModalOpen,
    setOpen: setIsEditModalOpen,
    setClose: setIsEditModalClose,
  } = useBooleanState();
  const {
    state: isViewQrModalOpen,
    setState: setViewQrModalState,
    setOpen: setViewQrModalOpen,
  } = useBooleanState();

  const handleEditSuccess = async (data: TPromotion) => {
    try {
      let isExisting: boolean = false;
      let updatedPromotions = promotions?.map((promotion) => {
        // update mode
        if (!!promotion?.id && !!data?.id && promotion?.id === data?.id) {
          isExisting = true;
          return data;
        }

        return promotion;
      });

      // create mode
      if (!isExisting) {
        updatedPromotions = [
          ...(Array.isArray(updatedPromotions) ? updatedPromotions : []),
          data,
        ];
      }

      if (isExisting) {
        updatePromotion(data?.id, data);
      } else {
        addPromotion(data, "start");
      }
    } catch (error) {
      console.error("🚀 ~ error:", error);
    }
  };

  return (
    <div className="flex w-fit items-center gap-1">
      <div className="flex items-center justify-end">
        <Button
          type="button"
          className="flex items-center"
          onClick={setViewQrModalOpen()}
        >
          <span className="me-1 flex size-5 flex-shrink-0 items-center justify-center">
            <QrCodeIcon className="size-5" />
          </span>
          <span>Display QR</span>
        </Button>
        <ViewQrCodeModal
          open={isViewQrModalOpen}
          onOpenChange={setViewQrModalState}
          qrCode={original?.qrCode}
        />
      </div>
      <div className="flex size-[40px] items-center justify-end">
        <EditPenIcon
          onClick={isPastEvents ? undefined : setIsEditModalOpen()}
          className={cn(
            "size-[20px] shrink-0 cursor-pointer hover:text-primary",
            {
              "cursor-not-allowed": isPastEvents,
            },
          )}
        />

        <EditPromotionModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalClose()}
          editItemSlug={original?.slug}
          onSuccess={handleEditSuccess}
        />
      </div>

      <div className="flex size-[40px] items-center justify-end">
        <DeleteIcon
          onClick={
            isPastEvents ? undefined : () => removePromotion(original?.id)
          }
          className={cn(
            "size-[20px] shrink-0 cursor-pointer hover:text-destructive",
            {
              "cursor-not-allowed": isPastEvents,
            },
          )}
        />
      </div>
    </div>
  );
}

export default memo(ActionCell);
