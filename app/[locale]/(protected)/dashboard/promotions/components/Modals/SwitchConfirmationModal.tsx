"use client";

import { TriangleAlert } from "lucide-react";
import { Fragment } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useGetAPromotionActiveEventsQuery,
  useUpdateAPromotionMutation,
} from "@/store/api/promotion/promotion-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import CalendarIcon from "@/components/icons/CalendarIcon";
import RenderData from "@/components/render-data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BgRings from "@/components/ui/BgRings";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import InfoCard from "@/components/ui/info-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import ActiveEventCard from "./ActiveEventCard";

interface IViewActiveEventModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  productData: TCallbackData | undefined;
}

function SwitchConfirmationModal({
  open,
  onOpenChange,
  productData,
}: IViewActiveEventModalProps) {
  const { toast } = useToast();
  const [updateAPromotion, { isLoading: isUpdateChallengeLoading }] =
    useUpdateAPromotionMutation();
  const {
    data: getAPromotionActiveEvents,
    ...getAPromotionActiveEventsApiState
  } = useGetAPromotionActiveEventsQuery(
    {
      slug: productData?.slug ?? "",
    },
    {
      skip: !checkIsValidId(productData?.slug, {
        type: "string",
      }),
    },
  );

  const handleDeactivate = async () => {
    const toastId = toast({
      title: "Updating Promotion Status",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      if (!productData?.id) {
        throw new Error("Promotion ID is required to update promotion status");
      }

      await updateAPromotion({
        slug: String(productData?.id),
        body: {
          status: "Inactive",
        },
      }).unwrap();

      toastId.update({
        id: toastId.id,
        title: "Promotion Deactivated",
        description: "Promotion has been deactivated successfully",
        variant: "success",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating promotion status:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Updating Promotion Status",
          description: "An error occurred while updating promotion status",
        }),
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-[600px]">
        <div className="px-5 pt-5">
          <DialogTitle>Active Events</DialogTitle>
          <p className="text-sm">
            Total {getAPromotionActiveEvents?.data?.length} Events
          </p>
        </div>
        <Separator className="mt-6" />

        <div className="p-5">
          <Alert color="destructive" variant="soft">
            <AlertDescription>
              <InfoCard
                title={
                  "All events associated with this promotion will be automatically deactivated"
                }
                icon={<TriangleAlert className="h-5 w-5" />}
                color="destructive"
              />
            </AlertDescription>
          </Alert>
        </div>
        <RenderData
          expectedDataType="object"
          data={getAPromotionActiveEvents}
          {...getAPromotionActiveEventsApiState}
        >
          <ScrollArea className="h-[calc(100vh-28rem)] px-5 pb-5">
            {getAPromotionActiveEvents?.data?.length ? (
              <Fragment>
                {getAPromotionActiveEvents?.data?.map((item) => (
                  <ActiveEventCard key={item.id} eventData={item} />
                ))}
              </Fragment>
            ) : (
              <div className="mt-[30%] flex flex-col items-center gap-1">
                <BgRings className="flex size-12 items-center justify-center rounded-[10px] border border-default-100 bg-transparent text-white">
                  <BgRings.Rings />

                  <BgRings.Content>
                    <CalendarIcon className="size-5" />
                  </BgRings.Content>
                </BgRings>

                <h3 className="z-20 mt-1 text-default-900">
                  No Active Events Available
                </h3>
                <p className="z-20 text-sm">
                  You currently have no active events scheduled.
                </p>
              </div>
            )}
          </ScrollArea>
        </RenderData>
        <div className="grid grid-cols-2 gap-6 p-4">
          <Button
            type="button"
            color="secondary"
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            fullWidth
            size="lg"
            onClick={handleDeactivate}
          >
            <ButtonLoadingContent
              isLoading={isUpdateChallengeLoading}
              actionContent="Deactivate"
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SwitchConfirmationModal;
