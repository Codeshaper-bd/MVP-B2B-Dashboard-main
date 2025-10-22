import { getSeoMeta } from "@/lib/get-seo-meta";
import { CategoryCard, CategoryItem } from "@/components/category-card";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import SearchIcon from "@/components/icons/SearchIcon";
import {
  categories,
  contact,
  WebsiteFaqs,
} from "@/components/modules/support/constant";
import ContactSupport from "@/components/modules/support/ContactSupport";
import PageHeader from "@/components/partials/header/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchComponent from "@/components/ui/search-component";

export const metadata = getSeoMeta({ title: "Support" });

function SupportPage() {
  return (
    <div>
      <PageHeader title="Support" />

      <DynamicBreadcrumb />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <CardTitle className="mb-1 font-semibold">
                  Frequently Asked Questions
                </CardTitle>
                <p className="text-sm text-default-600">
                  See below for guides on how to use the Fennec dashboard, or
                  ask Ferry!
                </p>
              </div>

              <div className="flex-none">
                <SearchComponent
                  placeholder="Search a topic..."
                  searchIcon={<SearchIcon className="size-5" />}
                />
              </div>
            </div>
          </CardHeader>

          <div className="ms-6 border border-default-100"></div>
          <CardContent>
            <div className="divide-y divide-default-100">
              <CategoryCard title="Categories" desc="Browse by Topic">
                {categories.map((item, index) => (
                  <CategoryItem
                    key={`category-${index}`}
                    title={item.title}
                    icon={item.icon}
                    href={item.href}
                  />
                ))}
              </CategoryCard>

              <div className="ms-6 border border-default-100"></div>
              <CategoryCard
                title="Website Related Questions"
                desc="Frequently Asked Questions"
                className="pb-0"
              >
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="faq-0"
                >
                  {WebsiteFaqs?.map((item, index) => (
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
            </div>
          </CardContent>
        </Card>

        <ContactSupport contact={contact} />
      </div>
    </div>
  );
}

export default SupportPage;
