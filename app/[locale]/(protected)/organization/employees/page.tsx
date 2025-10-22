import BackgroundBanner from "@/components/background-banner";
import PageHeader from "@/components/partials/header/page-header";

import LinkCards from "./components/link-cards";

function Employees() {
  return (
    <div>
      <PageHeader title="Employees" description="" />
      <div className="my-10">
        <BackgroundBanner
          title="Employees"
          image="/images/organization/bannar.png"
        />
      </div>
      <LinkCards />
    </div>
  );
}

export default Employees;
