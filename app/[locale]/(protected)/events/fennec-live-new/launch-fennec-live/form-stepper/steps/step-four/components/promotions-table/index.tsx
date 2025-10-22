"use client";
import { useFormContext, useWatch } from "react-hook-form";

import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import type { IStepFormInputs } from "../../../../type";

function PromotionsTable() {
  const { control } = useFormContext<IStepFormInputs>();
  const promotionsFormState = useWatch({
    control,
    name: "promotions",
    defaultValue: [],
  });

  return (
    <DefaultTable
      data={promotionsFormState}
      columns={columns}
      className="border-none"
    >
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default PromotionsTable;
