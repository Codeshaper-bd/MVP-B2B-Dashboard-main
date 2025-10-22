import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import ViewAllChallengesContent from "./components/view-all-challenges-content";
import FiltersValue from "./components/view-all-challenges-content/filters-value";
import Tools from "./components/view-all-challenges-content/Tools";

export const metadata = getSeoMeta({ title: "View All Challenges" });

function ViewAllChallengesPage() {
  return (
    <>
      <PageHeader title="Challenges" />

      <div className="my-6 flex w-full flex-col items-start lg:gap-6 xl:flex-row 2xl:items-center">
        <div className="flex-none">
          <DynamicBreadcrumb className="lg:mb-0" />
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 xl:justify-end">
          <Tools />
        </div>
      </div>
      <FiltersValue />

      <ViewAllChallengesContent />
    </>
  );
}

export default ViewAllChallengesPage;
