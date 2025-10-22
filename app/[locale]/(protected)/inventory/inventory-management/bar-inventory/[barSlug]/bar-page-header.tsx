"use client";
import { useParams } from "next/navigation";
import React from "react";

import PageHeader from "@/components/partials/header/page-header";

function BarPageHeader() {
  const params = useParams();
  const barSlug = params.barSlug as string;
  const barName = barSlug.split("-")[0];
  return (
    <>
      <PageHeader title={`${barName} Inventory`} />
    </>
  );
}

export default BarPageHeader;
