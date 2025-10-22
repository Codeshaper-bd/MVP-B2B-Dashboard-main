import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

function OrderHeaderCard() {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <DynamicBreadcrumb className="mb-0 lg:mb-0" />
      <div className="flex flex-none items-center gap-3">
        <BackButton />
      </div>
    </div>
  );
}

export default OrderHeaderCard;
