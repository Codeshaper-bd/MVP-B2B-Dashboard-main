"use client";

import { memo } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import type { TPromotion } from "@/store/api/promotion/promotion.types";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import PromotionsContent from "./promotions-content";
import { usePromotionContext } from "../promotion-context";

function AddPromotionDialog() {
  const {
    state: isAddPromotionOpen,
    setOpen: setAddPromotionOpen,
    setClose: setAddPromotionClose,
  } = useBooleanState();
  const { addPromotion, promotions } = usePromotionContext();

  const handleAddPromotion = (promotion: TPromotion) => {
    addPromotion(promotion);
  };

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
          selectedPromotions={promotions}
          onTogglePromotionSelect={handleAddPromotion}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddPromotionDialog);
