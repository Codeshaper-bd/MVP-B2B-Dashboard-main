"use client";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { useParams } from "next/navigation";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAllBarMenuItemByBarMenuSlugQuery } from "@/store/api/bar-menu-item/bar-menu-item-api";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import ProductCard from "./product-card";

type TPageParams = Params & { locale: string; category: string };

function Overview() {
  const { category: categorySlug } = useParams<TPageParams>();
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();
  const queryObject = getAllParamValue();
  const {
    data: getAllBarMenuItemByBarMenuSlugRes,
    ...getAllBarMenuItemByBarMenuSlugResApiState
  } = useGetAllBarMenuItemByBarMenuSlugQuery(
    {
      slug: categorySlug,
      ...queryObject,
      pageSize: contentPerPageOptions[12],
      page: queryObject.page || contentPerPageOptions.initialPage,
    },
    {
      skip: !checkIsValidId(categorySlug, { type: "string" }),
    },
  );

  const getAllBarMenuItemByBarMenuSlugData =
    getAllBarMenuItemByBarMenuSlugRes?.data;
  const getAllBarMenuItemByBarMenuSlugPagination =
    getAllBarMenuItemByBarMenuSlugRes?.pagination;
  const categoryName =
    getAllBarMenuItemByBarMenuSlugRes?.data?.barMenu?.name || categorySlug;
  const totalProducts =
    getAllBarMenuItemByBarMenuSlugRes?.pagination?.totalCount || 0;
  const productsData = getAllBarMenuItemByBarMenuSlugRes?.data?.items || [];

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-default-900">
              {categoryName}
            </h3>
            <p className="text-base font-medium text-default-700">
              Total {totalProducts} product
            </p>
          </div>

          <div className="flex-none">
            <Button color="primary" className="md:px-3.5 md:py-2.5" asChild>
              <Link href={`./${categorySlug}/add-product`}>+ Add Product</Link>
            </Button>
          </div>
        </div>

        <RenderData
          expectedDataType="array"
          data={productsData}
          {...getAllBarMenuItemByBarMenuSlugResApiState}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {productsData?.map((item, index) => (
              <ProductCard
                key={`product-card-${index}`}
                item={item}
                pageSlug={categorySlug}
              />
            ))}
          </div>
        </RenderData>

        <div className="mt-4">
          <BasicPagination
            isLoading={
              getAllBarMenuItemByBarMenuSlugResApiState.isLoading ||
              getAllBarMenuItemByBarMenuSlugResApiState.isFetching
            }
            hideForTotalPagesOne
            totalPages={
              getAllBarMenuItemByBarMenuSlugPagination?.totalPages ?? 1
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Overview;
