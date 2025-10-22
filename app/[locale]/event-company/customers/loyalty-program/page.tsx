import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import AdditionalSettings from "@/components/modules/customers/loyalty-program/additional/additional-setting";
import ProgramConfigForm from "@/components/modules/customers/loyalty-program/program-config-form";
import PageHeader from "@/components/partials/header/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LoyaltyProgram() {
  return (
    <>
      <PageHeader title="Loyalty Program Configuration" />

      <DynamicBreadcrumb />

      <Card>
        <CardContent className="p-4">
          <ProgramConfigForm />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="md:pb-0">
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <AdditionalSettings />
        </CardContent>
      </Card>
    </>
  );
}

export default LoyaltyProgram;
