import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EndOfDayReport from "./end-of-day-report";
import SalesSummeryContent from "./sales-summery";

function ReportContent() {
  return (
    <Tabs defaultValue="salesSummery">
      <div className="flex items-center">
        <div className="flex-1">
          <TabsList className="w-fit border border-secondary">
            <TabsTrigger value="salesSummery">Sales Summery</TabsTrigger>
            <TabsTrigger value="endOfDayReport">End of Day Report</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-none">
          <Button color="secondary" asChild className="flex-none">
            <a href="/files/event.csv" download="event.csv" target="_blank">
              <Image
                src="/images/all-img/pdf-icon.png"
                alt=""
                width={20}
                height={20}
                className="me-1.5 size-5"
              />
              Download
            </a>
          </Button>
        </div>
      </div>

      <TabsContent value="salesSummery" className="mt-4">
        <SalesSummeryContent />
      </TabsContent>
      <TabsContent value="endOfDayReport" className="mt-4">
        <EndOfDayReport />
      </TabsContent>
    </Tabs>
  );
}

export default ReportContent;
