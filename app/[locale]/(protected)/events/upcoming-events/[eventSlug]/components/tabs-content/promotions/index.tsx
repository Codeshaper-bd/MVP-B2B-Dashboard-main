import { useMemo } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventRelationMutation } from "@/store/api/events/events-api";
import type { TPromotion } from "@/store/api/promotion/promotion.types";
import BackButton from "@/components/Buttons/back-button";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import SeparatorLabel from "@/components/separator-label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import AddPromotionDialog from "./add-promotion-dialog";
import ConfigurePromotion from "./ConfigurePromotions";
import PromotionProvider from "./promotion-context";
import PromotionsTable from "./promotions-table";

export default function Promotions() {
  const { getAnEventData } = useFetchAnEventData();
  const promotionsData = useMemo(
    () => getAnEventData?.promotions,
    [getAnEventData?.promotions],
  );
  const eventSlug = useMemo(
    () => getAnEventData?.details?.slug,
    [getAnEventData?.details?.slug],
  );
  const [updateAnEventRelation, { isLoading: isUpdateEventLoading }] =
    useUpdateAnEventRelationMutation();
  const { toast } = useToast();

  // Check if there are any changes by comparing with original data
  const hasChanges = (promotions: TPromotion[] | TNullish) => {
    const originalPromotions = promotionsData || [];
    const currentPromotions = promotions || [];

    if (originalPromotions.length !== currentPromotions.length) {
      return true;
    }

    const originalIds = originalPromotions
      .map((promotion) => promotion.id)
      .sort();
    const currentIds = currentPromotions
      .map((promotion) => promotion.id)
      .sort();

    return JSON.stringify(originalIds) !== JSON.stringify(currentIds);
  };

  const handleSaveClick =
    (promotions: TPromotion[] | TNullish) => async (): Promise<boolean> => {
      const toastId = toast({
        variant: "loading",
        title: "Updating Promotion",
        description: "Please wait while we update promotions",
      });

      try {
        // 🛠 Call update API with updated promotions list
        const res = await updateAnEventRelation({
          slug: eventSlug,
          body: {
            promotions:
              promotions?.map((promotion) => ({ id: promotion?.id })) ??
              undefined,
          },
        }).unwrap();

        if (!res?.success) {
          throw new Error(res?.message || "Failed to update promotions");
        }

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Updated Promotions",
          description: "Promotions had been updated successfully.",
        });

        return true;
      } catch (error) {
        toastId.update({
          id: toastId.id,
          variant: "destructive",
          ...getApiErrorMessages({
            error,
            title: "Failed to Update Promotions",
            description: "Something went wrong while updating promotions.",
          }),
        });

        return false;
      }
    };

  return (
    <PromotionProvider promotionsData={promotionsData}>
      {({ promotions }) => (
        <div className="mt-6">
          <PromotionsTable promotionsData={promotions} />

          <SeparatorLabel>
            <AddPromotionDialog />
          </SeparatorLabel>

          <ConfigurePromotion
            haveChanges={hasChanges(promotions)}
            onSave={handleSaveClick(promotions)}
          />

          <div className="mt-6 flex justify-end gap-3">
            <BackButton disabled={isUpdateEventLoading} />

            <Button
              type="button"
              color="primary"
              onClick={handleSaveClick(promotions)}
              disabled={isUpdateEventLoading || !hasChanges(promotions)}
            >
              <ButtonLoadingContent
                actionContent="Save"
                isLoading={isUpdateEventLoading}
              />
            </Button>
          </div>
        </div>
      )}
    </PromotionProvider>
  );
}
