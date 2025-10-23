"use client";
import Image from "next/image";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { useGetAPromotionQuery } from "@/store/api/promotion/promotion-api";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import { CalendarIcon as CalendarIcon } from "@/components/icons";
import CheckListIcon from "@/components/icons/CheckListIcon";
import RenderData from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";

import { typeOfPromotionOptions } from "../Forms/CreatePromotionForm/utils";

interface IViewDescriptionModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  productData: TCallbackData | undefined;
}

function ViewDescriptionModal({
  open,
  onOpenChange,
  productData,
}: IViewDescriptionModalProps) {
  const { data: getAPromotionRes, ...getAPromotionApiState } =
    useGetAPromotionQuery({
      slug: productData?.slug ?? "",
    });
  const getAPromotionData = getAPromotionRes?.data;
  const promotionType =
    typeOfPromotionOptions?.find(
      (option) =>
        !!option?.value &&
        !!getAPromotionData?.type &&
        option?.value === getAPromotionData?.type,
    )?.label || "N/A";

  return (
    <DialogContextProvider open={open} onOpenChange={onOpenChange}>
      <CustomizedDialog
        maxWidth="512px"
        mode="ring-bg"
        status="transparent-with-rounded-border"
        title={getAPromotionData?.name ?? ""}
        icon={<CheckListIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <RenderData
          data={getAPromotionData}
          expectedDataType="object"
          {...getAPromotionApiState}
        >
          <div className="space-y-4 pt-5">
            <div className="grid gap-3">
              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="font-normal">Type</h6>
                <p>{promotionType}</p>
              </div>

              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="flex items-center gap-2 text-base font-normal leading-6 text-default-700">
                  <CalendarIcon className="h-full w-[15px] shrink-0 text-default-700" />
                  Valid From
                </h6>

                <p>
                  {convertUTCToLocal({
                    utcDateTime: getAPromotionData?.startDate,
                    format: "DD MMMM YYYY,  hh:mm A",
                  })}
                </p>
              </div>
              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="flex items-center gap-2 text-base font-normal leading-6 text-default-700">
                  <CalendarIcon className="h-full w-[15px] shrink-0 text-default-700" />
                  Valid Until
                </h6>

                <p>
                  {convertUTCToLocal({
                    utcDateTime: getAPromotionData?.endDate,
                    format: "DD MMMM YYYY,  hh:mm A",
                  })}
                </p>
              </div>

              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="text-base font-normal leading-6 text-default-700">
                  Details
                </h6>
                <p className="normal-case">
                  {getAPromotionData?.type === "BUY_X_GET_X_FREE" &&
                    `Buy ${getAPromotionData?.buyQuantity} get ${getAPromotionData?.freeQuantity} Free`}

                  {getAPromotionData?.type === "FREE_DRINK" &&
                    `Free ${getAPromotionData?.product?.name}`}

                  {getAPromotionData?.type === "APPLY_DISCOUNT" && (
                    <>
                      Apply Discount{" "}
                      {getAPromotionData?.discountType === "FIXED_AMOUNT" &&
                        "$"}
                      {getAPromotionData?.discountAmount}
                      {getAPromotionData?.discountType === "PERCENTAGE" && "%"}
                    </>
                  )}
                </p>
              </div>
              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="text-base font-normal leading-6 text-default-700">
                  Max Redemption per Night
                </h6>
                <p>{getAPromotionData?.maxRedemptionPerNight}</p>
              </div>
            </div>

            {getAPromotionData?.product && (
              <div className="space-y-[14px]">
                <p className="text-sm font-medium text-default-700">Product</p>
                <div className="flex max-w-[200px] items-center gap-2 rounded-lg border border-solid border-default-200 bg-default px-2.5 py-2.5">
                  <Image
                    alt={getAPromotionData?.product?.name ?? ""}
                    src={getImageFallback({
                      src: getAPromotionData?.product?.media?.[0]?.url ?? "",
                      fallbackImageSize: 100,
                    })}
                    width={24}
                    height={24}
                    className="size-6 rounded-md object-cover"
                  />
                  <span className="truncate text-default-900">
                    {getAPromotionData?.product?.name ?? "—"}
                  </span>
                </div>
              </div>
            )}

            <h4 className="text-sm font-medium">Description</h4>
            <Card className="rounded-[8px] bg-default-50">
              <CardContent className="py-3 text-default-900">
                {getAPromotionData?.description ?? ""}
              </CardContent>
            </Card>
          </div>
          <CustomizedDialog.Buttons>
            <CustomizedDialog.Buttons.PrimaryButton
              onClick={(_, { setClose }) => setClose()}
            >
              OK
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </RenderData>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default ViewDescriptionModal;
