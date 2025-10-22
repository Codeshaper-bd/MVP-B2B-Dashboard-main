import Image from "next/image";
import { memo } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { calculateSerialNumber } from "@/lib/pagination/calculate-serial-number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetTopTenSellingItemsQuery } from "@/store/api/bars/bars-api";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { NoDataFound } from "@/components/icons/NoDataFound";
import XIcon from "@/components/icons/X";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopTenDrinksProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
}

function TopTenDrinksDialog({ open, setOpen, slug }: TopTenDrinksProps) {
  const isValidSlug = checkIsValidId(slug, {
    type: "string",
  });
  const { data: getTopTenSellingItemsRes, ...getTopTenSellingItemsApiState } =
    useGetTopTenSellingItemsQuery(
      {
        slug,
      },
      { skip: !isValidSlug },
    );
  const getTopTenSellingItemsData = getTopTenSellingItemsRes?.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="min-h-[300px] pb-5 md:max-w-[600px]"
        hideInternalClose
      >
        <div className="relative h-[260px]">
          <Button
            size="icon"
            className="absolute end-4 top-4 z-20 rounded-full"
            onClick={() => setOpen(false)}
          >
            <XIcon className="size-3 text-default-1000" />
          </Button>

          <div className="absolute h-[200px] w-full overflow-hidden rounded-md">
            <Image
              src="/images/organization/shape-3.png"
              alt="top ten"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-[1] mx-auto w-fit pt-[90px]">
            <div className="size-[76px] rounded-[18px] bg-default-100 p-2">
              {/* <RenderData
                {...getTopTenSellingItemsApiState}
                expectedDataType="object"
                data={getTopTenSellingItemsData}
              > */}
              <Image
                src={getImageFallback({
                  src: "/images/organization/logo-1.png",
                  fallbackImageSize: 100,
                })}
                /* src={getImageFallback({
                    src: getTopTenSellingItemsData?.media?.url,
                    fallbackImageSize: 100,
                  })} */
                alt="top ten drinks"
                width={100}
                height={100}
                className="h-full w-full rounded-[12px] object-cover"
              />
              {/*  </RenderData> */}
            </div>
          </div>

          <div className="relative z-[1] mt-6 text-center">
            <h2 className="text-lg font-bold text-default-1000">
              Top 10 Menu Products
            </h2>
            <p className="text-sm text-default-700">
              {"Your bar’s best menu items"}
            </p>
          </div>
          <div className="absolute inset-0 top-40 bg-gradient-to-b from-transparent via-default to-transparent"></div>
        </div>

        <div className="px-3">
          <div className="no-scrollbar max-h-[500px]">
            <Table>
              <TableHeader className="overflow-hidden rounded-[8px] border-none bg-gradient-to-b from-[#161B26] to-[#B34E14]">
                <TableRow className="overflow-hidden border-none">
                  <TableHead className="text-default-1000">No.</TableHead>
                  <TableHead className="text-default-1000">
                    Drink Name
                  </TableHead>
                  <TableHead className="text-default-1000">UNIT SOLD</TableHead>
                  <TableHead className="text-default-1000">REVENUE</TableHead>
                </TableRow>
              </TableHeader>

              <RenderData
                {...getTopTenSellingItemsApiState}
                expectedDataType="object"
                data={getTopTenSellingItemsData}
              >
                {!getTopTenSellingItemsData?.items ||
                getTopTenSellingItemsData.items.length < 1 ? (
                  <TableBody className="rounded-b-md border">
                    <div className="flex h-[200px] flex-col items-center justify-center">
                      <NoDataFound className="mx-auto size-[200px]" />
                      No data found
                    </div>
                  </TableBody>
                ) : (
                  <TableBody className="mt-5 overflow-hidden rounded-[8px] border">
                    {getTopTenSellingItemsData.items.map((item, index) => (
                      <TableRow
                        className="overflow-hidden rounded-t-[8px]"
                        key={item?.id}
                      >
                        <TableCell className="rounded-t-[8px]">
                          {calculateSerialNumber({
                            index,
                            mode: "page",
                            page: 1,
                            pageSize: 10,
                          })}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-[28px] w-[38px] overflow-hidden rounded-[4px] py-0.5">
                              <Image
                                src={`/images/all-img/${item?.type !== "ALCOHOLIC" ? "bg-non-alcoholic.png" : "bg-alcoholic.png"}`}
                                alt="background"
                                width={38}
                                height={28}
                                className="absolute inset-0 z-0 h-full w-full object-cover"
                              />
                              <Image
                                // src="/images/all-img/Image Product.png"
                                src={getImageFallback({
                                  src: item?.media?.url,
                                })}
                                // src={getImageFallback({ src: item?.eventImage?.url })}
                                alt="foreground"
                                width={38}
                                height={28}
                                className="relative z-10 mx-auto h-full w-auto object-contain"
                              />
                            </div>

                            <span>{item?.name}</span>
                          </div>
                        </TableCell>

                        <TableCell>{item?.unitSold}</TableCell>

                        <TableCell>
                          ${convertToNumber({ value: item?.revenue, digit: 2 })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </RenderData>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(TopTenDrinksDialog);
