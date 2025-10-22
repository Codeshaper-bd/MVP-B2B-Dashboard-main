import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import CustomerFeedbackTable from "@/components/modules/customers/feedback/CustomerFeedbackTable";
import FeedbackFilters from "@/components/modules/customers/feedback/FeedbackFilters";
import FeedbackFiltersValue from "@/components/modules/customers/feedback/FeedbackFiltersValue";
import FeedBackOverview from "@/components/modules/customers/feedback/overview";
import PageHeader from "@/components/partials/header/page-header";
import SearchComponent from "@/components/ui/search-component";

function FeedBackPage() {
  return (
    <>
      <PageHeader title="Feedback" />
      <DynamicBreadcrumb />

      <div className="space-y-6">
        <FeedBackOverview />

        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex-1 space-y-1">
            <h1 className="text-lg font-semibold leading-7 tracking-tight text-default-900">
              Customer Feedback List
            </h1>

            <p className="text-sm font-normal leading-5 text-default-600">
              List of the latest feedback received from customers.
            </p>
          </div>
          <div className="flex flex-row-reverse items-center justify-end gap-3 lg:flex-row">
            <SearchComponent
              className="max-w-[312px]"
              placeholder="Search By Event"
            />
            <FeedbackFilters />
          </div>
        </div>

        <FeedbackFiltersValue />

        <CustomerFeedbackTable />
      </div>
    </>
  );
}

export default FeedBackPage;
