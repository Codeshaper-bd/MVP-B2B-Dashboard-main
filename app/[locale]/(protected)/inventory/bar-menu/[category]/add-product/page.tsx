import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import CreateProductForm from "./create-product-form";

function CreateNewCustomer() {
  return (
    <div>
      <PageHeader title="Bar Menu" />
      <DynamicBreadcrumb />
      <CreateProductForm />
    </div>
  );
}

export default CreateNewCustomer;
