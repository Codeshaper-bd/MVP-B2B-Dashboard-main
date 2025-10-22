import { getSeoMeta } from "@/lib/get-seo-meta";
import { CategoryCard } from "@/components/category-card";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import {
  detailContact,
  detailFaqs,
} from "@/components/modules/support/constant";
import ContactSupport from "@/components/modules/support/ContactSupport";
import PageHeader from "@/components/partials/header/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = getSeoMeta({ title: "Category Details" });

function DetailCategoryPage() {
  return (
    <div>
      <PageHeader title="Category Details" />
      <DynamicBreadcrumb />
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <CategoryCard
              title="Billing and Payments"
              desc="Manage Your Financials"
              className="py-0"
            >
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="faq-0"
              >
                {detailFaqs.map((item, index) => (
                  <AccordionItem
                    key={`faq-${index}`}
                    value={`faq-${index}`}
                    className="first:pt-0 last:pb-0"
                  >
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.desc}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CategoryCard>
          </CardContent>
        </Card>
        <ContactSupport contact={detailContact} />
      </div>
    </div>
  );
}

export default DetailCategoryPage;
