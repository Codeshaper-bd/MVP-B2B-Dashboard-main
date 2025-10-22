import useManageStateParams from "@/hooks/useManageStateParams";
import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { useGetUserOrdersByMonthQuery } from "@/store/api/customer-lookup/customer-lookup-api";
import type { TGetUserOrdersByMonthArgs } from "@/store/api/customer-lookup/customer-lookup.types";
import EventListItem from "@/components/modules/customers/CustomerEventList/event-item";
import RenderData from "@/components/render-data";
interface ISpendTable {
  userId?: number;
  isValidUserId: boolean;
}
function CustomerProductsContent({ userId, isValidUserId }: ISpendTable) {
  const { getAllParamValue } =
    useManageStateParams<Exclude<TGetUserOrdersByMonthArgs, void>>();
  const queryParams = getAllParamValue();
  const { data: getUserOrdersByMonthRes, ...getUserEventJoinedApiState } =
    useGetUserOrdersByMonthQuery(
      {
        userId,
        ...queryParams,
      },
      {
        skip: !isValidUserId,
      },
    );
  const getUserOrdersByMonthData = getUserOrdersByMonthRes?.data;
  return (
    <RenderData
      expectedDataType="array"
      data={getUserOrdersByMonthData}
      {...getUserEventJoinedApiState}
    >
      {getUserOrdersByMonthData?.map((order, index) => (
        <div key={`event-${index}`} className="mb-4">
          <h3 className="mb-4 text-base font-medium text-default-700">
            {order?.month}
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {order?.items?.map((item) => (
              <EventListItem
                key={item?.id}
                name={item?.name ?? ""}
                date={convertUTCToLocal({
                  utcDateTime: item?.createdAt,
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

export default CustomerProductsContent;
