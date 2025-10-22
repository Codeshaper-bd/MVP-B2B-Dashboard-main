import PageHeader from "@/components/partials/header/page-header";

import Overview from "./overview";
import PageTop from "./page-top";

function CategoryPage() {
  return (
    <div>
      <PageHeader title="Bar Menu" />
      <PageTop />
      <Overview />
    </div>
  );
}

export default CategoryPage;
