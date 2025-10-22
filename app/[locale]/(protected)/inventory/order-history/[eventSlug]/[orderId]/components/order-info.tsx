import { getRefundStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useEventOrderDetailsContext } from "./order-item-provider";

function OrderInfo() {
  const { getAnEventOrderDetails, getAnEventOrderDetailsApiState } =
    useEventOrderDetailsContext();
  const { customer, orderDate, orderId, status } = getAnEventOrderDetails || {};

  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventOrderDetails}
      {...getAnEventOrderDetailsApiState}
      loadingSkeleton={
        <SkeletonWrapper size={5}>
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-7 w-24 bg-default-50" />
            <Skeleton className="h-7 w-32 bg-default-50" />
          </div>
        </SkeletonWrapper>
      }
    >
      <div className="w-full space-y-6">
        <Card className="space-y-4 px-4 pb-6 pt-4">
          <CardHeader className="!p-0">
            <CardTitle className="font-semibold">Order Detail</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-3 p-0">
            <CardDescription className="flex items-center justify-between text-default-700">
              <span>Customer</span>
              <span>
                {customer?.firstName} {customer?.lastName}
              </span>
            </CardDescription>

            <CardDescription className="flex items-center justify-between text-default-700">
              <span>Customer ID</span>
              <span> {customer?.id}</span>
            </CardDescription>

            <CardDescription className="flex items-center justify-between text-default-700">
              <span>Order ID</span>
              <span>{orderId}</span>
            </CardDescription>

            <CardDescription className="flex items-center justify-between text-default-700">
              <span>Order Date</span>
              <span>{orderDate}</span>
            </CardDescription>

            <div className="flex items-center justify-between text-sm text-default-700">
              <span>Order Status</span>
              {/* <Badge>{status?.name}</Badge> */}
              <Badge className={cn(getRefundStatusColor(status?.name))}>
                {status?.name}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </RenderData>
  );
}

export default OrderInfo;
