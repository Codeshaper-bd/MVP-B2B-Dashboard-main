import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type {
  TGetAllInventoryItemArgs,
  TSoldBy,
} from "@/store/api/inventory-item/inventory-item.types";
import TabCard, { type TTabOption } from "@/components/tab-card";

const tabOptions: TTabOption<TSoldBy>[] = [
  { label: "By the Volume", value: "VOLUME" },
  { label: "By the Unit", value: "UNIT" },
];

function FiltersCard() {
  const { updateMultipleParam, getAParamValue } =
    useManageSearchParams<Exclude<TGetAllInventoryItemArgs, void>>();
  const bottleType: TSoldBy = getAParamValue("soldBy") || "VOLUME";

  const setTab = useCallback(
    ({ value: type }: TTabOption<TSoldBy>) => {
      updateMultipleParam({
        soldBy: type === "UNIT" ? "UNIT" : undefined,
        page: undefined,
      });
    },
    [updateMultipleParam],
  );

  return (
    <div>
      <TabCard tabs={tabOptions} setTab={setTab} value={bottleType} />
    </div>
  );
}

export default FiltersCard;
