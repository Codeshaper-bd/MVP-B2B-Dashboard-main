import { getSeoMeta } from "@/lib/get-seo-meta";
import PageHeader from "@/components/partials/header/page-header";

import PromotionsContent from "./components/promotions-content";

export const metadata = getSeoMeta({ title: "Promotions" });

function PromotionsPage() {
  return (
    <>
      <PageHeader title="Promotions" />
      <PromotionsContent />
    </>
  );
}

export default PromotionsPage;
