import type { Metadata } from "next";

import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

import TransferHeader from "./components/transfer-header";
import TransferPageContent from "./components/transfer-page-content";

export const metadata: Metadata = getSeoMeta({ title: "Inventory Transfer" });

export default function TransferPage() {
  return (
    <>
      <TransferHeader />
      <DynamicBreadcrumb className="mb-0 lg:mb-0" />
      <TransferPageContent />
    </>
  );
}
