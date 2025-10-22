"üse client";
import type { CellContext } from "@tanstack/react-table";
import { memo, useCallback } from "react";
import {
  useFormContext,
  useWatch,
  type UseFormSetValue,
} from "react-hook-form";

import EditPromotionModal from "@/app/[locale]/(protected)/dashboard/promotions/components/Modals/EditPromotionModal";
import useBooleanState from "@/hooks/useBooleanState";
import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TNullish } from "@/store/api/common-api-types";
import type { TPromotion } from "@/store/api/promotion/promotion.types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";

import type { IStepFormInputs } from "../../../../type";

function ActionCell({ row: { original } }: CellContext<TPromotion, unknown>) {
  const {
    state: isEditModalOpen,
    setOpen: setIsEditModalOpen,
    setClose: setIsEditModalClose,
  } = useBooleanState();

  const { setValue, control } = useFormContext<IStepFormInputs>();

  const promotionsFormState = useWatch({
    control,
    name: "promotions",
    defaultValue: [],
  });

  const handleDeleteClick = useCallback(
    ({
      actionData,
      promotionsFormState,
      setValue,
    }: {
      actionData: TPromotion;
      promotionsFormState: TPromotion[] | TNullish;
      setValue: UseFormSetValue<IStepFormInputs>;
    }) =>
      async () => {
        try {
          const updatedPromotions = promotionsFormState?.filter(
            (promotion) => promotion?.id !== actionData?.id,
          );

          if (!updatedPromotions?.length) {
            const deleteALocalChallengeRes =
              await localStorageUtil.removeItemAsync("promotions");
            if (!deleteALocalChallengeRes?.success) {
              throw new Error("Error deleting promotion from local storage");
            }
            setValue("promotions", null);
          } else {
            const deleteLocalChallengesRes =
              await localStorageUtil.setItemAsync<TPromotion[]>(
                "promotions",
                updatedPromotions,
              );
            if (!deleteLocalChallengesRes?.success) {
              throw new Error("Error updating promotions in local storage");
            }
            setValue("promotions", updatedPromotions);
          }
        } catch (error) {
          console.error("🚀 ~ error:", error);
        }
      },
    [],
  );

  return (
    <div className="flex w-fit items-center gap-1">
      <div className="flex size-[40px] items-center justify-end">
        <EditPenIcon
          onClick={setIsEditModalOpen()}
          className="size-[20px] shrink-0 cursor-pointer hover:text-primary"
        />

        <EditPromotionModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalClose()}
          editItemSlug={original?.slug}
          onSuccess={async (data) => {
            try {
              let isExisting: boolean = false;
              let updatedPromotions = promotionsFormState?.map((promotion) => {
                // update mode
                if (
                  !!promotion?.id &&
                  !!data?.id &&
                  promotion?.id === data?.id
                ) {
                  isExisting = true;
                  return data;
                }

                return promotion;
              });

              // create mode
              if (!isExisting) {
                updatedPromotions = [
                  ...(Array.isArray(updatedPromotions)
                    ? updatedPromotions
                    : []),
                  data,
                ];
              }

              if (updatedPromotions?.length) {
                const localUpdatedChallengesRes =
                  await localStorageUtil.setItemAsync<TPromotion[]>(
                    "promotions",
                    updatedPromotions,
                  );
                if (!localUpdatedChallengesRes?.success) {
                  throw new Error("Error updating promotions in local storage");
                }
                setValue("promotions", updatedPromotions);
              }
            } catch (error) {
              console.error("🚀 ~ error:", error);
            }
          }}
        />
      </div>

      <div className="flex size-[40px] items-center justify-end">
        <DeleteIcon
          onClick={handleDeleteClick({
            actionData: original,
            promotionsFormState,
            setValue,
          })}
          className="size-[20px] shrink-0 cursor-pointer hover:text-destructive"
        />
      </div>
    </div>
  );
}

export default memo(ActionCell);
