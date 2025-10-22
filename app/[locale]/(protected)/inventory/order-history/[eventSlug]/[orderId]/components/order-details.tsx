import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useEventOrderDetailsContext } from "./order-item-provider";

function OrderDetails() {
  const { getAnEventOrderDetails, getAnEventOrderDetailsApiState } =
    useEventOrderDetailsContext();
  const { subtotal, tax, total } = getAnEventOrderDetails || {};

  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventOrderDetails}
      {...getAnEventOrderDetailsApiState}
      loadingSkeleton={
        <SkeletonWrapper size={1}>
          <Card className="w-[320px]">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-7 w-24 bg-default-50" />
                  <Skeleton className="h-7 w-24 bg-default-50" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-7 w-24 bg-default-50" />
                  <Skeleton className="h-7 w-24 bg-default-50" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-7 w-24 bg-default-50" />
                  <Skeleton className="h-7 w-24 bg-default-50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </SkeletonWrapper>
      }
    >
      <Card className="w-[320px]">
        <CardContent className="!p-0 font-medium">
          <CardDescription className="flex justify-between gap-1 border-b border-default-100 !px-6 !py-4 text-default-900">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </CardDescription>
          <CardDescription className="flex justify-between gap-1 border-b border-default-100 !px-6 !py-4 text-default-900">
            <span>Tax (0% - static)</span>
            <span>{tax}</span>
          </CardDescription>
          <CardDescription className="flex justify-between gap-1 !px-6 !py-4 text-default-900">
            <span>Total Amount</span>
            <span>${total}</span>
          </CardDescription>
        </CardContent>
      </Card>
    </RenderData>
  );
}

export default OrderDetails;
