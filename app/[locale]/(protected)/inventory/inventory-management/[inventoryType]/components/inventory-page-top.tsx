"use client";
import { useParams } from "next/navigation";

import PageHeader from "@/components/partials/header/page-header";

import type { TInventoryPageParams } from "./inventory-type-filter";

function InventoryPageTop() {
  const { inventoryType } = useParams<TInventoryPageParams>();
  return <PageHeader title={"Stock Room"} />;
}

export default InventoryPageTop;
