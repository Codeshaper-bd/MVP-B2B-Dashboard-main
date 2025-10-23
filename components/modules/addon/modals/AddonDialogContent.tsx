import Image from "next/image";

import { convertToNumber } from "@/lib/data-types/number";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { calculateSerialNumber } from "@/lib/pagination/calculate-serial-number";
import { useGetAddonPurchasedQuery } from "@/store/api/add-ons/add-ons-api";
import { InfoIcon as InfoIcon } from "@/components/icons";
import RenderData from "@/components/render-data";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

function AddonDialogContent({
  ticketSoldId,
  guestName,
}: {
  ticketSoldId: string;
  guestName: string;
}) {
  const { data: getAddonPurchasedDataRes, ...getAddonPurchasedApiState } =
    useGetAddonPurchasedQuery({
      ticketSoldId,
    });

  const getAddonPurchasedData = getAddonPurchasedDataRes?.data;

  return (
    <div className="px-3">
      <div className="flex items-center justify-center pb-8 pt-14">
        <div className="flex flex-col items-center gap-2">
          <div className="grid h-14 w-14 place-content-center rounded-full bg-primary/10">
            <div className="grid h-10 w-10 place-content-center rounded-full bg-primary">
              <InfoIcon className="size-5 text-black" />
            </div>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-default-1000">
            Addons Purchased
          </h2>
          <p className="text-sm text-[#CECFD2]">{guestName}</p>
        </div>
      </div>
      <div className="no-scrollbar max-h-[500px]">
        <RenderData
          {...getAddonPurchasedApiState}
          expectedDataType="array"
          data={getAddonPurchasedData}
        >
          <Table>
            <TableHeader className="overflow-hidden rounded-[8px] border-none bg-gradient-to-b from-[#161B26] to-[#FFC833]">
              <TableRow className="overflow-hidden border-none">
                <TableHead className="text-default-1000">No.</TableHead>
                <TableHead className="text-default-1000">ADD-ON</TableHead>
                <TableHead className="text-default-1000">UNIT SOLD</TableHead>
                <TableHead className="text-default-1000">REVENUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="mt-5 overflow-hidden rounded-[8px] border">
              {getAddonPurchasedData?.map((item, index) => (
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
                      <div className="relative flex size-8 items-center justify-center rounded-full bg-primary/10">
                        <Image
                          src={getImageFallback({
                            src: item?.media?.url,
                            fallbackImageSize: 100,
                          })}
                          alt="background"
                          width={20}
                          height={20}
                          className="size-5"
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
          </Table>
        </RenderData>
      </div>
    </div>
  );
}
export default AddonDialogContent;
