"use client";
import { memo } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import type { TPromotion } from "@/store/api/promotion/promotion.types";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";

interface IPromotionsTableProps {
  promotionsData: TPromotion[] | TNullish;
}

function PromotionsTable({ promotionsData }: IPromotionsTableProps) {
  return (
    <DefaultTable data={promotionsData} columns={columns}>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default memo(PromotionsTable);
