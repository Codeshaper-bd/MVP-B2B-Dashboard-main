import NonGuestListSidebar from "./non-guestlist-sidebar";
import NonGuestListTable from "./non-guestlist-table";

function NonGuestListContent() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <p className="text-lg font-semibold text-default-1000">
          Non-GL Entries
        </p>
        <NonGuestListSidebar />
      </div>
      <div className="col-span-12 lg:col-span-8">
        <NonGuestListTable />
      </div>
    </div>
  );
}

export default NonGuestListContent;
