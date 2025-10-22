import PageHeader from "@/components/partials/header/page-header";

import DevicesPageContent from "./components/devices-page-content";

function ManageDevicesPage() {
  return (
    <div>
      <PageHeader title="Devices" />
      <DevicesPageContent />
    </div>
  );
}

export default ManageDevicesPage;
