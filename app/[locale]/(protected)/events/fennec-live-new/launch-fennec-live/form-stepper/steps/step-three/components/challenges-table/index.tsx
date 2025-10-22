"use client";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import type { IStepFormInputs } from "../../../../type";

function ChallengesTable() {
  const { control } = useFormContext<IStepFormInputs>();
  const challengesFormState = useWatch({
    control,
    name: "challenges",
    defaultValue: null,
  });

  return (
    <DefaultTable
      data={challengesFormState}
      columns={columns}
      className="border-none"
    >
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default memo(ChallengesTable);
