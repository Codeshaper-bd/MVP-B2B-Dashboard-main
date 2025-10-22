import { getSeoMeta } from "@/lib/get-seo-meta";
import PageHeader from "@/components/partials/header/page-header";

import Overview from "./components/overview-content";

export const metadata = getSeoMeta({ title: "Challenges" });

function ChallengesPage() {
  return (
    <>
      <PageHeader title="Challenges" />

      <Overview />
    </>
  );
}

export default ChallengesPage;
