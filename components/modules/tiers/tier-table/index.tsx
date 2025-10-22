"use client";

import type { TTicketTierItem } from "@/store/api/ticket-tier/ticket-tier.types";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";

export interface ITierTableProps {
  getEventTicketTiers: TTicketTierItem[] | undefined;
}
function TierTable({ getEventTicketTiers }: ITierTableProps) {
  return (
    <DefaultTable data={getEventTicketTiers} columns={columns}>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default TierTable;
