import { memo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetPromoterPermissionsQuery } from "@/store/api/promoter/promoter-api";
import { EGuestListType } from "@/store/api/promoters/promoters.types";
import RenderData from "@/components/render-data";

import AddGuestList from "./add-guestList";
import PrivateGuestListTable from "./tables/privet-guestlist-table";

function PrivateGuestList() {
  const { getAParamValue } = useManageSearchParams<{
    eventId?: string;
  }>();

  const eventId = getAParamValue("eventId");

  const { data: getPromoterPermissionsRes, ...getPromoterPermissionsApiState } =
    useGetPromoterPermissionsQuery(
      {
        eventId,
      },
      {
        skip: !checkIsValidId(eventId, {
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
      <div className="space-y-5">
        <div className="flex justify-between gap-5">
          <h2 className="text-xl font-semibold text-default-1000">
            Private GuestList
          </h2>
          <div className="flex items-center gap-3">
            <AddGuestList />
          </div>
        </div>
        <PrivateGuestListTable />
      </div>
    </RenderData>
  );
}

export default memo(PrivateGuestList);
