"use client";
import { useState } from "react";

import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import SeparatorLabel from "@/components/separator-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import EventCard from "./event-card";
import ProductImport from "./product-import";

function UpdateInventoryHeader() {
  const [minimize, setMinimize] = useState<boolean>(true);
  const toggleMinimize = () => setMinimize(!minimize);
  return (
    <div>
      <SeparatorLabel>
        <Button
          type="button"
          className="border-secondary bg-default-50"
          onClick={toggleMinimize}
        >
          <ChevronDownIcon className="me-1.5 size-5 text-default-700" />{" "}
          {minimize ? "  Minimize" : "Maximize"}
        </Button>
      </SeparatorLabel>
      <Collapsible open={minimize}>
        <CollapsibleContent>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 xl:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Event</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <EventCard
                    image="/images/all-img/event1.png"
                    date="May 22, 2024, 10:00 AM"
                    lastUpdateDate="11-12-2024"
                    title="Coldplay : Music of the Spheres"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 md:col-span-8 xl:col-span-9">
              <ProductImport />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default UpdateInventoryHeader;
