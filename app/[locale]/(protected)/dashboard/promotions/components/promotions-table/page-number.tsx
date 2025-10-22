import { type CellContext } from "@tanstack/react-table";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type {
  TGetTopPromotionArgs,
  TTopPromotion,
} from "@/store/api/promotion/promotion.types";

function PageNumber({ row }: CellContext<TTopPromotion, unknown>) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetTopPromotionArgs, void | undefined>>();

  const { page } = getAllParamValue();

  const currentPage = Number(page || 1);
  const rowIndex = row.index + 1;
  const pageSize = 5;

  const currentNo = (currentPage - 1) * pageSize + rowIndex;
  return (
    <span className="text-sm font-medium leading-5 text-default-900">
      {currentNo}
    </span>
  );
}

export default PageNumber;
