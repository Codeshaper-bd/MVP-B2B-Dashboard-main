import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import CreatePromoterModal from "@/components/modules/promoter/Modals/CreatePromoterModal";
import PromoterList from "@/components/modules/promoter/PromoterList";
import PageHeader from "@/components/partials/header/page-header";
import SearchComponent from "@/components/ui/search-component";

function PromoterManagementPage() {
  return (
    <div>
      <PageHeader title="Promoter Management" />

      <div className="my-6 flex w-full flex-col items-start md:flex-row">
        <div className="flex-none">
          <DynamicBreadcrumb className="lg:mb-0" />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 md:justify-end">
          <SearchComponent className="min-h-11" placeholder="Search Name" />

          <div className="flex flex-row-reverse gap-4 md:flex-row">
            <CreatePromoterModal />
          </div>
        </div>
      </div>

      <PromoterList />
    </div>
  );
}

export default PromoterManagementPage;
