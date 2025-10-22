"use client";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAnEventOrderDetailsQuery } from "@/store/api/order-history/order-history-api";
import { Separator } from "@/components/ui/separator";

import OrderDetails from "./order-details";
import OrderInfo from "./order-info";
import OrderInfoCard from "./order-info-card";
import EventOrderDetailsProvider from "./order-item-provider";
import OrderItemTable from "./order-item-table";
import OrderHeaderCard from "./order-top";
import PaymentInfo from "./payment-info";

type TPageParams = Params & {
  eventSlug: string;
  orderId: string;
};
function PageContent() {
  const { eventSlug, orderId } = useParams<TPageParams>();
  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });
  const orderIdNumber = Number(orderId);
  const { data: getAnEventOrderDetailsRes, ...getAnEventOrderDetailsApiState } =
    useGetAnEventOrderDetailsQuery(
      {
        slug: eventSlug,
        orderId: orderIdNumber,
      },

      {
        skip: !isProbableValidSlugFound,
      },
    );
  const getAnEventOrderDetailsData = getAnEventOrderDetailsRes?.data;

  return (
    <EventOrderDetailsProvider
      getAnEventOrderDetails={getAnEventOrderDetailsData}
      getAnEventOrderDetailsApiState={getAnEventOrderDetailsApiState}
    >
      <OrderHeaderCard />
      <div className="mt-6 space-y-6">
        <OrderInfoCard />
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="sm:w-[350px]">
            <OrderInfo />
          </div>

          <div className="w-full space-y-6">
            <OrderItemTable />
            <div className="flex justify-end">
              <OrderDetails />
            </div>
            <Separator />
            <PaymentInfo />
          </div>
        </div>
      </div>
    </EventOrderDetailsProvider>
  );
}

export default PageContent;
