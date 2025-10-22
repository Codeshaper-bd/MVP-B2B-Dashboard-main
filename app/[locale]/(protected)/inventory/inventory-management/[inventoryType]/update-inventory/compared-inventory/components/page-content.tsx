import ComparedTables from "./compared-tables";
import PageTools from "./page-tools";
import UpdateInventoryHeader from "./update-inventory-header";

function PageContent() {
  return (
    <div className="space-y-6">
      <UpdateInventoryHeader />
      <PageTools />
      <ComparedTables />
    </div>
  );
}

export default PageContent;
