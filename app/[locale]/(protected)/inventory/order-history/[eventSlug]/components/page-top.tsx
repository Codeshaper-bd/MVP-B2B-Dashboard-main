import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

function PageTop() {
  return (
    <div className="my-6 flex w-full flex-col items-start md:flex-row">
      <div className="flex-none">
        <DynamicBreadcrumb className="lg:mb-0" />
      </div>

      <div className="flex flex-1 flex-wrap gap-3 md:justify-end">
        <div className="md:flex md:flex-1 md:justify-end">
          <BackButton />
        </div>
      </div>
    </div>
  );
}

export default PageTop;
