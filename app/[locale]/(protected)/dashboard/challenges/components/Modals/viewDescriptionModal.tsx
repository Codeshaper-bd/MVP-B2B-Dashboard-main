"use client";
import Image from "next/image";

import { convertToAMPM } from "@/lib/date-time/date-time";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { convertToPlainText } from "@/lib/strings/convertToPlainText";
import { useGetAChallengeQuery } from "@/store/api/challenges/challenges-api";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import CalendarIcon from "@/components/icons/CalendarIcon";
import CheckListIcon from "@/components/icons/CheckListIcon";
import RenderData from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";

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
  const { data: getAChallengeRes, ...getAChallengeApiState } =
    useGetAChallengeQuery({
      slug: productData?.slug ?? "",
    });
  const getAChallengeData = getAChallengeRes?.data;

  return (
    <DialogContextProvider open={open} onOpenChange={onOpenChange}>
      <CustomizedDialog
        maxWidth="512px"
        mode="ring-bg"
        status="transparent-with-rounded-border"
        title={getAChallengeData?.name ?? ""}
        icon={<CheckListIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <RenderData
          data={getAChallengeData}
          expectedDataType="object"
          {...getAChallengeApiState}
        >
          <div className="space-y-4 pt-5">
            <div className="grid gap-3">
              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="font-normal">Type</h6>
                <p>
                  {convertToPlainText({
                    text: getAChallengeData?.type,
                  })}
                </p>
              </div>

              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="flex items-center gap-2 text-base font-normal leading-6 text-default-700">
                  <CalendarIcon className="h-full w-[15px] shrink-0 text-default-700" />
                  Valid From
                </h6>

                <p>
                  {convertUTCToLocal({
                    utcDateTime: getAChallengeData?.startDate,
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
                    utcDateTime: getAChallengeData?.endDate,
                    format: "DD MMMM YYYY,  hh:mm A",
                  })}
                </p>
              </div>

              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="text-base font-normal leading-6 text-default-700">
                  Details
                </h6>
                <p className="normal-case">
                  {getAChallengeData?.type === "INVITE_FRIENDS" &&
                    `Invite ${getAChallengeData?.targetQuantity} friends`}
                  {getAChallengeData?.type === "SPENT" &&
                    `Spend ${getAChallengeData?.targetAmount} points`}
                  {getAChallengeData?.type === "CHECK_IN_BEFORE" &&
                    `Check in before ${convertToAMPM(
                      getAChallengeData?.expireTime ?? "",
                    )}`}
                  {getAChallengeData?.type === "PURCHASE" &&
                    `Purchase ${getAChallengeData?.targetQuantity} products`}
                </p>
              </div>
              <div className="flex w-full items-center justify-between text-base font-normal leading-6 text-default-700">
                <h6 className="text-base font-normal leading-6 text-default-700">
                  Max Redemption per Night
                </h6>
                <p>{getAChallengeData?.maxRedemptionPerNight}</p>
              </div>
            </div>

            {getAChallengeData?.product && (
              <div className="space-y-[14px]">
                <p className="text-sm font-medium text-default-700">Product</p>
                <div className="flex max-w-[200px] items-center gap-2 rounded-lg border border-solid border-default-200 bg-default px-2.5 py-2.5">
                  <Image
                    alt={getAChallengeData?.product?.name ?? ""}
                    src={getImageFallback({
                      src: getAChallengeData?.product?.media?.[0]?.url,
                    })}
                    width={24}
                    height={24}
                    className="size-6 rounded-md object-cover"
                  />
                  <span className="truncate text-default-900">
                    {getAChallengeData?.product?.name ?? "—"}
                  </span>
                </div>
              </div>
            )}

            <h4 className="text-sm font-medium">Description</h4>
            <Card className="rounded-[8px] bg-default-50">
              <CardContent className="py-3 text-default-900">
                {getAChallengeData?.description ?? ""}
              </CardContent>
            </Card>
          </div>
        </RenderData>

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.PrimaryButton
            onClick={(_, { setClose }) => setClose()}
          >
            OK
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default ViewDescriptionModal;
