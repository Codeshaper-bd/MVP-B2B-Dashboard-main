"use client";

import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { memo, useCallback, useMemo } from "react";

import EditInventoryForm from "@/app/[locale]/(protected)/inventory/inventory-management/[inventoryType]/update-inventory/components/inventory-form/forms/edit";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAnInventoryItemQuery } from "@/store/api/inventory-item/inventory-item-api";
import RenderData from "@/components/render-data";
import TabCard, { type TTabOption } from "@/components/tab-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ProductInfoCard from "./product-info";
import ShipmentTable from "./shipment-table";

export interface IPageParams extends Params {
  locale?: string;
  category?: string;
  productSlug?: string;
}

// page tab

type TTabValue = "productDetail" | "shipmentHistory";
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Product Detail",
    value: "productDetail",
  },
  {
    label: "Shipment History",
    value: "shipmentHistory",
  },
];

type TTab2Value = string;

function OverviewContent() {
  const { productSlug: inventoryItemSlug } = useParams<IPageParams>();
  const { data: getAnInventoryItemRes, ...getAnInventoryItemApiState } =
    useGetAnInventoryItemQuery(
      { slug: inventoryItemSlug },
      { skip: !checkIsValidId(inventoryItemSlug, { type: "string" }) },
    );
  const getAnInventoryItemData = getAnInventoryItemRes?.data;

  const uniqueVolumes = useMemo(() => {
    const unit = getAnInventoryItemData?.unit ?? "unit";
    const children = getAnInventoryItemData?.children ?? [];

    const seen = new Set<number>();
    const volumes: TTabOption<string>[] = [
      { value: "allVol", label: "All Volume" },
    ];

    for (const child of children) {
      if (child.volume !== null && !seen.has(child.volume)) {
        seen.add(child.volume);
        volumes.push({
          value: String(child.slug),
          label: `${child.volume} ${unit}`,
        });
      }
    }

    return volumes;
  }, [getAnInventoryItemData]);

  // page tab
  const { getAParamValue, updateAParam } = useManageSearchParams<{
    tab?: TTabValue;
    childItemSlug?: TTabValue;
  }>();
  const tab: TTabValue = getAParamValue("tab") || "productDetail";
  const childItemSlug: TTab2Value = getAParamValue("childItemSlug") || "allVol";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "productDetail" ? undefined : value,
      }),
    [updateAParam],
  );

  const setChildItemSlug = useCallback(
    ({ value }: TTabOption<TTab2Value>) =>
      updateAParam({
        key: "childItemSlug",
        value: value === "allVol" ? undefined : value,
      }),
    [updateAParam],
  );

  return (
    <RenderData
      {...getAnInventoryItemApiState}
      expectedDataType="object"
      data={getAnInventoryItemData}
    >
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <ProductInfoCard getAnInventoryItemData={getAnInventoryItemData} />

        <div className="w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabCard tabs={tabs} value={tab} setTab={setTab} />
            {tab === "shipmentHistory" && (
              <TabCard
                tabs={uniqueVolumes}
                value={childItemSlug}
                setTab={setChildItemSlug}
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
                    utcDateTime: getAnInventoryItemData?.updatedAt,
                    format: "DD/MM/YYYY",
                  })}
                </span>
              </CardHeader>

              <CardContent>
                <EditInventoryForm />
              </CardContent>
            </Card>
          )}

          {tab === "shipmentHistory" && (
            <ShipmentTable parentSlug={getAnInventoryItemData?.slug} />
          )}
        </div>
      </div>
    </RenderData>
  );
}

export default memo(OverviewContent);
