import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import { useGetABarQuery } from "@/store/api/bars/bars-api";
import RenderData from "@/components/render-data";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import ImageSkeleton from "@/components/skeleton/image-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { TUseProfileBarReturn } from "./../../hooks/useGetProfileBarSlug";
import RevenueCard from "./revenue-card";

function BarHeader({
  barSlug,
  isValidSlug,
  isCompared,
}: TUseProfileBarReturn & { isCompared?: boolean }) {
  const { data: getABarRes, ...getABarApiState } = useGetABarQuery(
    {
      slug: barSlug,
    },
    {
      skip: !isValidSlug,
    },
  );
  const getABarData = getABarRes?.data;

  return (
    <RenderData
      expectedDataType="object"
      data={getABarData}
      {...getABarApiState}
      loadingSkeleton={
        <div className="grid grid-cols-12 gap-6">
          <div
            className={cn("col-span-12 md:col-span-5 lg:col-span-4", {
              "md:col-span-12 lg:col-span-12": isCompared,
            })}
          >
            <ImageSkeleton />
          </div>
          <div
            className={cn("col-span-12 md:col-span-7 lg:col-span-8", {
              "md:col-span-12 lg:col-span-12": isCompared,
            })}
          >
            <CardSkeleton length={6} />
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        <div
          className={cn("col-span-12 md:col-span-5 lg:col-span-4", {
            "md:col-span-12 lg:col-span-12": isCompared,
          })}
        >
          <div className="h-[300px] w-full overflow-hidden rounded-xl border-2 border-default-200">
            <Image
              src={getImageFallback({
                src: getABarData?.media?.url,
                fallbackImageSize: 500,
              })}
              alt={getABarData?.name ?? "Media 1"}
              width={310}
              height={210}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div
          className={cn("col-span-12 md:col-span-7 lg:col-span-8", {
            "md:col-span-12 lg:col-span-12": isCompared,
          })}
        >
          <Card>
            <CardHeader className="mb-0">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                <CardTitle className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {getABarData?.name}
                </CardTitle>
              </div>
            </CardHeader>

            <div className="px-6">
              <Separator />
            </div>

            <CardContent className="mt-3 pt-4">
              <RevenueCard
                inventoryLastUpdate={getABarData?.updatedAt ?? ""}
                revenue={getABarData?.revenue ?? 0}
                totalProductSold={getABarData?.productsSold ?? 0}
                stockQuantity={getABarData?.reamingStock ?? 0}
                popularDrink={getABarData?.topSellingDrink ?? ""}
                popularEvent={getABarData?.topEvent ?? ""}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </RenderData>
  );
}

export default BarHeader;
