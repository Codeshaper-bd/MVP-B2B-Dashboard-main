import TotalEntriesTable from "./total-entries-table";
import TotalEntrySidebarStat from "./TotalEntrySidebarStat";

export interface ITotalEntryContent {
  tableClassName?: string;
}
function TotalEntryContent({ tableClassName }: ITotalEntryContent) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <p className="text-lg font-semibold text-default-1000">
          Total Entry Type
        </p>
        <TotalEntrySidebarStat />
      </div>
      <div className="col-span-12 lg:col-span-8">
        <TotalEntriesTable tableClassName={tableClassName} />
      </div>
    </div>
  );
}

export default TotalEntryContent;
