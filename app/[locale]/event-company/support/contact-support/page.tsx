import { getSeoMeta } from "@/lib/get-seo-meta";
import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import ContactForm from "@/components/modules/support/contact-form";
import PageHeader from "@/components/partials/header/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = getSeoMeta({ title: "Contact Support" });

function ContactSupportPage() {
  return (
    <div>
      <PageHeader title="Contact Support" />
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <DynamicBreadcrumb className="mb-0 lg:mb-0" />
        <div>
          <BackButton />
        </div>
      </div>
      <div className="mt-6">
        <Card className="mx-auto max-w-[600px]">
          <CardHeader>
            <CardTitle className="mb-1 mt-2 text-center text-2xl font-semibold">
              Contact Support
            </CardTitle>

            <p className="text-center text-sm text-default-400">
              We&apos;re Here to Help
            </p>
          </CardHeader>

          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ContactSupportPage;
