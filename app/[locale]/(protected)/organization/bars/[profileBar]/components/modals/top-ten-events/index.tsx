import Image from "next/image";
import { memo } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { calculateSerialNumber } from "@/lib/pagination/calculate-serial-number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetTopTenEventsQuery } from "@/store/api/bars/bars-api";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
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

interface TopTenEventsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
}

function TopTenEventsDialog({ open, setOpen, slug }: TopTenEventsProps) {
  const isValidSlug = checkIsValidId(slug, {
    type: "string",
  });
  const { data: getTopTenEventsRes, ...getTopTenEventsApiState } =
    useGetTopTenEventsQuery(
      { slug },
      {
        skip: !isValidSlug,
      },
    );
  const getTopTenEventsData = getTopTenEventsRes?.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pb-5 md:max-w-[600px]" hideInternalClose>
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
              src="/images/organization/shape-2.png"
              alt="top ten"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-[1] mx-auto w-fit pt-[90px]">
            <div className="size-[76px] rounded-[18px] bg-default-100 p-2">
              {/* <RenderData
                {...getTopTenEventsApiState}
                expectedDataType="object"
                data={getTopTenEventsData}
              > */}
              <Image
                src={getImageFallback({
                  src: "/images/organization/logo-2.png",
                  fallbackImageSize: 100,
                })}
                /* src={getImageFallback({
                    src: getTopTenEventsData?.media?.url,
                    fallbackImageSize: 100,
                  })} */
                alt="top ten"
                width={100}
                height={100}
                className="h-full w-full rounded-[12px] object-cover"
              />
              {/* </RenderData> */}
            </div>
          </div>
          <div className="relative z-[1] mt-6 text-center">
            <h2 className="text-lg font-bold text-default-1000">
              Top 10 Events
            </h2>
            <p className="text-sm text-default-700">
              According to Bar Statistics
            </p>
          </div>
          <div className="absolute inset-0 top-40 bg-gradient-to-b from-transparent via-default to-transparent"></div>
        </div>

        <div className="px-3">
          <div className="no-scrollbar max-h-[500px] px-3">
            <Table>
              <TableHeader className="rounded-lg border border-none bg-gradient-to-b from-[#161B26] to-[#098671]">
                <TableRow className="overflow-hidden border-none">
                  <TableHead className="text-default-1000">No.</TableHead>
                  <TableHead className="text-default-1000">
                    Drink Name
                  </TableHead>
                  <TableHead className="text-default-1000">
                    Attendance
                  </TableHead>
                  <TableHead className="text-default-1000">REVENUE</TableHead>
                </TableRow>
              </TableHeader>

              <RenderData
                {...getTopTenEventsApiState}
                expectedDataType="object"
                data={getTopTenEventsData}
              >
                <TableBody className="rounded-b-md border">
                  {getTopTenEventsData?.items?.map((item, index) => (
                    <TableRow key={item?.id}>
                      <TableCell>
                        {calculateSerialNumber({
                          index,
                          mode: "page",
                          page: 1,
                          pageSize: 10,
                        })}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={getImageFallback({
                              src: item?.eventImage?.url,
                            })}
                            alt="image"
                            height={28}
                            width={38}
                            className="h-7 w-[38px] rounded-[4px]"
                          />
                          <span> {item?.name}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {convertToNumber({ value: item?.joined, digit: 2 })}
                      </TableCell>

                      <TableCell className="text-right">
                        ${convertToNumber({ value: item?.revenue, digit: 2 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </RenderData>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(TopTenEventsDialog);
