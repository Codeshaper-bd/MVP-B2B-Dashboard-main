import { getSeoMeta } from "@/lib/get-seo-meta";

import PageContent from "./page-content";

export const metadata = getSeoMeta({
  title: "Promoter Register",
  description: "Promoter Register",
});

function PromoterRegister() {
  return <PageContent />;
}

export default PromoterRegister;
