import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import AddCategory from "./add-category";
import CategoryCards from "./category-cards";

function BarMenuPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Bar Menu" />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <DynamicBreadcrumb className="lg:mb-0" />
        </div>

        <div className="flex-none">
          <DialogContextProvider>
            <AddCategory />
          </DialogContextProvider>
        </div>
      </div>

      <CategoryCards />
    </div>
  );
}

export default BarMenuPage;
