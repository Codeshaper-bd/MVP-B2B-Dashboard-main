"use client";

import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { useParams } from "next/navigation";
import { memo, useCallback, useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetBarInventoryItemQuery } from "@/store/api/bar-inventory/bar-inventory-api";
import { useGetAnInventoryTransferHistoryQuery } from "@/store/api/inventory-transfer/inventory-transfer-api";
import RenderData from "@/components/render-data";
import TabCard, { type TTabOption } from "@/components/tab-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ChangeImage from "./change-image";
import EditBarInventoryForm from "./edit";
import TransferHistoryTable from "./transfer-history-table";

export interface IPageParams extends Params {
  locale?: string;
  inventoryItemId?: string;
  barSlug?: string;
}

// page tab

type TTabValue = "productDetail" | "transferHistory";
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Product Detail",
    value: "productDetail",
  },
  {
    label: "Transfer History",
    value: "transferHistory",
  },
];

type TTab2Value = string;

function OverviewContent() {
  const params = useParams<IPageParams>();

  const { data: getBarInventoryItemRes, ...getBarInventoryItemApiState } =
    useGetBarInventoryItemQuery(
      {
        barSlug: params?.barSlug,
        inventoryItemId: params?.inventoryItemId,
      },
      {
        skip:
          !checkIsValidId(params?.barSlug, { type: "string" }) &&
          !checkIsValidId(
            convertToNumber({
              value: params?.inventoryItemId,
              fallback: -1,
              digit: 0,
            }),
            { type: "number" },
          ),
      },
    );
  const getBarInventoryItemData = getBarInventoryItemRes?.data;
  const {
    data: getAnInventoryTransferHistoryRes,
    ...getAnInventoryItemApiState
  } = useGetAnInventoryTransferHistoryQuery(
    { barSlug: params?.barSlug, inventoryItemId: getBarInventoryItemData?.id },
    { skip: !checkIsValidId(params?.barSlug, { type: "string" }) },
  );
  const getAnInventoryTransferHistoryData =
    getAnInventoryTransferHistoryRes?.data;

  const uniqueVolumes = useMemo(() => {
    const data = getAnInventoryTransferHistoryData ?? [];

    const seen = new Set<string>();
    const volumes: TTabOption<string>[] = [
      { value: "allVol", label: "All Volume" },
    ];

    for (const item of data) {
      const slug = item.slug;
      const id = item.id;
      if (!slug || !id) {
        continue;
      }

      if (!seen.has(slug)) {
        seen.add(slug);

        const parts = slug.split("-");
        const volumeLabel = parts[parts.length - 1];

        volumes.push({
          value: `${id}`,
          label: volumeLabel,
        });
      }
    }

    return volumes;
  }, [getAnInventoryTransferHistoryData]);

  const mediaUrl = useMemo(
    () =>
      getImageFallback({
        src:
          getBarInventoryItemData?.media?.find((med) => med?.isFeatured)?.url ||
          getBarInventoryItemData?.media?.[0]?.url,
      }),
    [getBarInventoryItemData?.media],
  );
  // page tab
  const { getAParamValue, updateAParam } = useManageSearchParams<{
    tab?: TTabValue;
    childItemId?: TTabValue;
  }>();
  const tab: TTabValue = getAParamValue("tab") || "productDetail";
  const childItemId: TTab2Value = getAParamValue("childItemId") || "allVol";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "productDetail" ? undefined : value,
      }),
    [updateAParam],
  );
  const setChildItemId = useCallback(
    ({ value }: TTabOption<TTab2Value>) =>
      updateAParam({
        key: "childItemId",
        value: value === "allVol" ? undefined : value,
      }),
    [updateAParam],
  );

  return (
    <RenderData
      {...getBarInventoryItemApiState}
      expectedDataType="object"
      data={getBarInventoryItemData}
    >
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="w-full max-w-[348px] flex-none lg:w-[348px]">
          <Card className="relative w-full flex-none space-y-4 bg-default-50">
            <CardContent className="p-0">
              <ChangeImage item={getBarInventoryItemData} />

              <div className="relative aspect-[3/2] overflow-hidden rounded-t-[12px]">
                <Image
                  src={mediaUrl}
                  className="size-full object-cover"
                  alt={getBarInventoryItemData?.name ?? "Drinks image"}
                  fill
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-1.5 px-4 pb-4 text-default-700">
              <h3 className="text-xl font-semibold text-default-900">
                {getBarInventoryItemData?.name}
              </h3>

              <div className="flex w-full gap-2 text-base font-medium text-gray-400">
                <span>ID</span>
                <span>#{getBarInventoryItemData?.id}</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabCard tabs={tabs} value={tab} setTab={setTab} />
            {tab === "transferHistory" && (
              <TabCard
                tabs={uniqueVolumes}
                value={childItemId}
                setTab={setChildItemId}
              />
            )}
          </div>

          {tab === "productDetail" && (
            <Card className="flex-1">
              <CardHeader className="flex-row justify-between gap-5 border-b border-default-100">
                <CardTitle className="font-semibold">Product Details</CardTitle>

                <span className="flex-none text-sm text-default-600">
                  Last Updated:{" "}
                  {convertUTCToLocal({
                    utcDateTime: getBarInventoryItemData?.updatedAt,
                    format: "DD/MM/YYYY",
                  })}
                </span>
              </CardHeader>

              <CardContent>
                <EditBarInventoryForm />
              </CardContent>
            </Card>
          )}

          {tab === "transferHistory" && (
            <TransferHistoryTable defaultId={getBarInventoryItemData?.id} />
          )}
        </div>
      </div>
    </RenderData>
  );
}

export default memo(OverviewContent);
