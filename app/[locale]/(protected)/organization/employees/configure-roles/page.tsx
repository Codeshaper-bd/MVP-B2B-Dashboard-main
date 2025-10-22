import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import LockLockedIcon from "@/components/icons/LockLockedIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import ManageTable from "@/components/modules/employees/ManageTable";
import RoleCards from "@/components/modules/employees/RoleCards";
import PageHeader from "@/components/partials/header/page-header";
import { Button } from "@/components/ui/button";

function ConfigureRolesPage() {
  return (
    <div>
      <PageHeader title="Configure Roles" />
      <div className="flex flex-col lg:flex-row lg:items-center">
        <DynamicBreadcrumb className="flex-1 lg:mb-0" />
        <div className="flex items-center gap-3">
          <BackButton label="Back To Menu" />
          <Button
            color="primary"
            className="group rounded-lg font-semibold text-default md:min-w-[212px]"
            size="default"
          >
            <span className="ml-1 flex items-center gap-1 group-hover:hidden">
              <PlusIcon className="size-5" />
              Create Custom Role
            </span>
            <span className="ml-1 hidden items-center gap-1 group-hover:inline-flex">
              <LockLockedIcon className="size-5" />
              Coming Soon
            </span>
          </Button>
        </div>
      </div>
      <div>
        <RoleCards />
      </div>
      <ManageTable />
      <div className="h-10"></div>
    </div>
  );
}

export default ConfigureRolesPage;
