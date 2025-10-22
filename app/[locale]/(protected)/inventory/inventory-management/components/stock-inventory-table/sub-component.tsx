"use client";

import type { Row } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import { NoDataFound } from "@/components/icons/NoDataFound";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HandleSubComponent({
  row: { original },
}: {
  row: Row<
    Record<string, TGroupInventoryItemData["children"]> & {
      soldBy?: string;
    }
  >;
}) {
  const isAllUnit =
    original?.children?.every((item) => item?.soldBy === "VOLUME") ?? false;

  if (!original?.children?.length) {
    return <NoDataFound />;
  }

  const isSoldByUnit = original?.soldBy !== "UNIT";

  return (
    <div className="overflow-hidden rounded-md">
      <Table>
        <TableHeader className="border-none bg-secondary [&_tr]:border-t-0">
          <TableRow>
            <TableHead className="py-2.5">Volume</TableHead>
            <TableHead className="py-2.5">Product Code</TableHead>
            {isSoldByUnit && (
              <TableHead className="py-2.5">Net Weight of Bottle</TableHead>
            )}
            {isSoldByUnit && (
              <TableHead className="py-2.5">Weight of Empty Bottle</TableHead>
            )}
            {isAllUnit && (
              <TableHead className="py-2.5">Closed Stock</TableHead>
            )}
            <TableHead className="py-2.5">
              {isAllUnit ? "Open Stock" : "Current Stock"}
            </TableHead>
            <TableHead className="py-2.5">Avg. Price per Item</TableHead>
            <TableHead className="py-2.5">Threshold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {original?.children?.map((item) => (
            <TableRow key={item?.productCode || "N/A"}>
              <TableCell className="lowercase">
                {item?.volume || 0} {item?.unit}
              </TableCell>

              <TableCell>{item?.productCode || "N/A"}</TableCell>

              {isSoldByUnit && (
                <TableCell className="lowercase">
                  {convertToNumber({
                    value: item?.netWeight,
                  })}{" "}
                  {item?.netWeightUnit}
                </TableCell>
              )}

              {isSoldByUnit && (
                <TableCell className="lowercase">
                  {convertToNumber({
                    value: item?.weightOfEmptyBottle,
                  })}{" "}
                  {item?.netWeightUnit}
                </TableCell>
              )}

              {isAllUnit && <TableCell>{item?.currentStock || 0}</TableCell>}

              <TableCell className="lowercase">
                {item?.openingStock || 0} {/* {item?.unit} */}
              </TableCell>

              <TableCell>
                $
                {convertToNumber({
                  value: item?.pricePerUnit,
                })}
              </TableCell>

              <TableCell>
                {convertToNumber({
                  value: item?.threshold,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
