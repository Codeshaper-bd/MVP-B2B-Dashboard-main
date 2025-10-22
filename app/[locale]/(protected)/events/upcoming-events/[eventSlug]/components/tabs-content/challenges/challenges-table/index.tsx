"use client";
import { memo } from "react";

import type { TChallenge } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";

interface IChallengesTableProps {
  challengesData: TChallenge[] | TNullish;
}

function ChallengesTable({ challengesData }: IChallengesTableProps) {
  return (
    <DefaultTable data={challengesData} columns={columns}>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default memo(ChallengesTable);
