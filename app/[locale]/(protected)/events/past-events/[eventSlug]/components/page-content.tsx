"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import PastEventInfo from "@/components/modules/event/past-event-info";
import { Card, CardContent } from "@/components/ui/card";

import PastEventTab, { type TTabState } from "./PastEventTab";

function PageContent() {
  const { getAllParamValue } = useManageSearchParams<TTabState>();
  const { tab } = getAllParamValue();
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="grid w-full grid-cols-12 gap-4 xl:gap-20">
          <div
            className={cn("col-span-12 xl:col-span-4", {
              "xl:hidden": tab === "budgeting",
            })}
          >
            <div className="sticky top-16">
              <PastEventInfo />
            </div>
          </div>

          <div
            className={cn("col-span-12 xl:col-span-8", {
              "xl:col-span-12": tab === "budgeting",
            })}
          >
            <PastEventTab />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PageContent;
