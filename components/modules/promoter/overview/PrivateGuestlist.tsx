"use client";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetPromoterPermissionsQuery } from "@/store/api/promoter/promoter-api";
import { EGuestListType } from "@/store/api/promoters/promoters.types";
import RenderData from "@/components/render-data";
import ComingSoon from "@/components/templates/coming-soon";

interface IPrivateGuestListProps {
  promoterId?: string;
  getAnEventData?: TEvent | TNullish;
}
function PrivateGuestList({
  promoterId,
  getAnEventData,
}: IPrivateGuestListProps) {
  const { data: getPromoterPermissionsRes, ...getPromoterPermissionsApiState } =
    useGetPromoterPermissionsQuery(
      {
        eventId: getAnEventData?.details?.id ?? "",
        promoterId,
      },
      {
        skip: !checkIsValidId(getAnEventData?.details?.id, {
          type: "number",
        }),
      },
    );
  const getPromoterPermissionsData = getPromoterPermissionsRes?.data;
  const hasPrivateGuestList = getPromoterPermissionsData?.permissions?.includes(
    EGuestListType.PrivateGuestList,
  );
  if (!hasPrivateGuestList) {
    return null;
  }
  return (
    <RenderData
      expectedDataType="object"
      data={getPromoterPermissionsData}
      {...getPromoterPermissionsApiState}
    >
      <h2 className="text-xl font-semibold text-default-1000">
        Private Guestlist
      </h2>

      <ComingSoon />
    </RenderData>
  );
}

export default PrivateGuestList;
