"use client";

import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetBarMenuItemQuery } from "@/store/api/bar-menu-item/bar-menu-item-api";
import RenderData from "@/components/render-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProductAnalytics from "./product-analytics";
import ProductSummaryCard from "./product-summary-card";
import CreateProductForm from "../add-product/create-product-form";

export interface IPageParams extends Params {
  locale: string | undefined;
  category: string | undefined;
  productSlug: string | undefined;
}

function OverviewContent() {
  const { productSlug } = useParams<IPageParams>();
  const { data: getBarMenuItemRes, ...getBarMenuItemResApiState } =
    useGetBarMenuItemQuery(
      { slug: productSlug },
      { skip: !checkIsValidId(productSlug, { type: "string" }) },
    );
  const getBarMenuItemData = getBarMenuItemRes?.data;

  return (
    <RenderData
      expectedDataType="object"
      data={getBarMenuItemData}
      {...getBarMenuItemResApiState}
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        <ProductSummaryCard product={getBarMenuItemData} />

        <Tabs defaultValue="overview" className="w-full flex-1">
          <TabsList className="grid grid-cols-2 border border-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <CreateProductForm
              isFullWidth
              isEditMode
              productSlug={productSlug}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <ProductAnalytics productSlug={productSlug} />
          </TabsContent>
        </Tabs>
      </div>
    </RenderData>
  );
}

export default OverviewContent;
