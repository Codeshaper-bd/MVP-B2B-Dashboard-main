import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import ClubList from "./ClubList";

function ClubPage() {
  return (
    <>
      <PageHeader title="Clubs" />
      <DynamicBreadcrumb />
      <h2 className="mb-3 text-2xl font-semibold text-[#F5F5F6]">
        My Nightclubs
      </h2>
      <ClubList />
    </>
  );
}

export default ClubPage;
