import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import Filter from "./components/Filter";
import FiltersValue from "./components/filters-value";
import ViewAllPromotions from "./components/view-all-promotions";
import CreatePromotionModal from "../components/Modals/CreatePromotionModal";

export const metadata = getSeoMeta({ title: "View All Promotions" });

function ViewMorePromotionPage() {
  return (
    <>
      <PageHeader title="Promotions" />

      <div className="my-6 flex w-full flex-col xl:flex-row xl:items-center">
        <div className="flex-none">
          <DynamicBreadcrumb className="xl:mb-0" />
        </div>

        <div className="flex flex-1 flex-wrap gap-3 xl:justify-end">
          <CreatePromotionModal />

          <Filter />
        </div>
      </div>
      <FiltersValue />

      <ViewAllPromotions />
    </>
  );
}

export default ViewMorePromotionPage;
