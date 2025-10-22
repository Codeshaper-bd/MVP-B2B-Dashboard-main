import { memo } from "react";

import EventCompanyLayout from "@/components/partials/layouts/EventCompanyLayout";

function Layout({ children }: { children: React.ReactNode }) {
  return <EventCompanyLayout>{children}</EventCompanyLayout>;
}

export default memo(Layout);
