import useManageStateParams from "@/hooks/useManageStateParams";
import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { useGetUserEventJoinedQuery } from "@/store/api/customer-lookup/customer-lookup-api";
import type { TGetUserEventJoinedArgs } from "@/store/api/customer-lookup/customer-lookup.types";
import RenderData from "@/components/render-data";

import EventListItem from "./event-item";
interface ISpendTable {
  userId?: number;
  isValidUserId: boolean;
}
function CustomerEventList({ userId, isValidUserId }: ISpendTable) {
  const { getAllParamValue } =
    useManageStateParams<Exclude<TGetUserEventJoinedArgs, void>>();
  const queryParams = getAllParamValue();
  const { data: getUserEventJoinedRes, ...getUserEventJoinedApiState } =
    useGetUserEventJoinedQuery(
      {
        userId,
        ...queryParams,
      },
      {
        skip: !isValidUserId,
      },
    );
  const getUserEventJoinedData = getUserEventJoinedRes?.data;
  return (
    <RenderData
      expectedDataType="array"
      data={getUserEventJoinedData}
      {...getUserEventJoinedApiState}
    >
      {getUserEventJoinedData?.map((event, index) => (
        <div key={`event-${index}`} className="mb-4">
          <h3 className="mb-4 text-base font-medium text-default-700">
            {event?.month}
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {event?.events?.map((item) => (
              <EventListItem
                key={item?.id}
                name={item?.name ?? ""}
                date={convertUTCToLocal({
                  utcDateTime: item?.date,
                  format: "YYYY-MM-DD, HH:mm:ss",
                })}
                price={convertToNumber({
                  value: item?.price,
                  digit: 2,
                })}
                imageUrl={item?.media?.url ?? ""}
              />
            ))}
          </div>
        </div>
      ))}
    </RenderData>
  );
}

export default CustomerEventList;
