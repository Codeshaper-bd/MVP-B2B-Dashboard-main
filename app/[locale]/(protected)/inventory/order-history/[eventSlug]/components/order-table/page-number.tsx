import { type CellContext } from "@tanstack/react-table";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type {
  TGetAnEventOrdersArgs,
  TOrder,
} from "@/store/api/order-history/order-history.types";

function PageNumber({ row }: CellContext<TOrder, unknown>) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAnEventOrdersArgs, void | undefined>>();

  const { page } = getAllParamValue();

  const currentPage = Number(page || 1);
  const rowIndex = row.index + 1;
  const pageSize = 10;

  const currentNo = (currentPage - 1) * pageSize + rowIndex;
  return (
    <span className="text-sm font-medium leading-5 text-default-900">
      {currentNo}
    </span>
  );
}

export default PageNumber;
