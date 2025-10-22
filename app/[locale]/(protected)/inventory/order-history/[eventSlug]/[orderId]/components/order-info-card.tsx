import { PrinterIcon } from "lucide-react";

import CloudDownloadIcon from "@/components/icons/CloudDownloadIcon";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useEventOrderDetailsContext } from "./order-item-provider";
function OrderInfoCard() {
  const { getAnEventOrderDetails, getAnEventOrderDetailsApiState } =
    useEventOrderDetailsContext();
  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventOrderDetails}
      {...getAnEventOrderDetailsApiState}
      loadingSkeleton={
        <SkeletonWrapper size={1}>
          <div className="flex h-20 flex-wrap items-center rounded-lg border border-default-200 p-4">
            <div className="flex-1">
              <Skeleton className="h-10 w-36 flex-none" />
            </div>
            <div className="flex flex-none items-center gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-40" />
            </div>
          </div>
        </SkeletonWrapper>
      }
    >
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <div className="min-w-[320px] flex-1">
            <CardTitle className="font-semibold">
              Order Id: {getAnEventOrderDetails?.orderId}
            </CardTitle>
          </div>
          <div className="flex gap-3">
            <Button color="secondary">
              <PrinterIcon className="me-1 size-[20px]" />
              Print Receipt
            </Button>
            <Button color="secondary" asChild className="flex-none">
              <a
                href="/assets/all/event.png"
                target="_blank"
                download={"event.png"}
              >
                <CloudDownloadIcon className="me-2 size-5" />
                Download
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </RenderData>
  );
}

export default OrderInfoCard;
