"use client";

import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import useBooleanState from "@/hooks/useBooleanState";
import { localStorageUtil } from "@/lib/localStorageUtil";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import PromotionsContent from "./promotions-content";
import type { IStepFormInputs } from "../../../../type";

function AddPromotionDialog() {
  const {
    state: isAddPromotionOpen,
    setOpen: setAddPromotionOpen,
    setClose: setAddPromotionClose,
  } = useBooleanState();

  const { control, setValue } = useFormContext<IStepFormInputs>();

  const selectedPromotions = useWatch({
    control,
    name: "promotions",
    defaultValue: [],
  });

  return (
    <Dialog open={isAddPromotionOpen} onOpenChange={setAddPromotionClose()}>
      <Button
        type="button"
        className="h-10 bg-secondary"
        onClick={setAddPromotionOpen()}
      >
        <PlusIcon className="me-2 h-4 w-4" /> Add Promotion
      </Button>

      <DialogContent className="p-0 md:max-w-[512px]" hideInternalClose>
        <PromotionsContent
          open={isAddPromotionOpen}
          setOpen={setAddPromotionClose()}
          selectedPromotions={selectedPromotions}
          onTogglePromotionSelect={async (promotion) => {
            try {
              const selectedPromotionsMap = new Map(
                selectedPromotions?.map((promotion) => [
                  promotion.id,
                  promotion,
                ]),
              );

              if (selectedPromotionsMap.has(promotion.id)) {
                selectedPromotionsMap.delete(promotion.id);
              } else {
                selectedPromotionsMap.set(promotion.id, promotion);
              }

              const updatedPromotionsArr = Array.from(
                selectedPromotionsMap.values(),
              );

              if (!updatedPromotionsArr?.length) {
                const updateLocalPromotionsRes =
                  await localStorageUtil.removeItemAsync("promotions");
                if (!updateLocalPromotionsRes?.success) {
                  throw new Error(
                    "Failed to remove promotions from local storage",
                  );
                }
                setValue("promotions", null);
              } else {
                const updateLocalPromotionsRes =
                  await localStorageUtil.setItemAsync(
                    "promotions",
                    updatedPromotionsArr,
                  );

                if (!updateLocalPromotionsRes?.success) {
                  throw new Error(
                    "Failed to update promotions in local storage",
                  );
                }
                setValue("promotions", updatedPromotionsArr);
              }

              setValue(
                "promotions",
                Array.from(selectedPromotionsMap.values()),
              );
            } catch (error) {
              console.error("Failed to toggle challenge select", error);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddPromotionDialog);
