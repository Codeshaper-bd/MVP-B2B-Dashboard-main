"use client";

import SearchComponent from "@/components/ui/search-component";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CreateDevices from "./create-devices";
import { deviceItems } from "../data";
import DeviceCard from "./device-card";

function DevicesPageContent() {
  return (
    <>
      <div className="mb-6 flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-4">
        <Tabs defaultValue="event-payout">
          <TabsList className="w-fit border border-secondary">
            <TabsTrigger value="event-payout">
              Recently Added Device
            </TabsTrigger>
            <TabsTrigger value="transaction-history">All</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <SearchComponent />

          <CreateDevices />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
        {deviceItems.map((item, index) => (
          <DeviceCard key={`${index}`} {...item} />
        ))}
      </div>
    </>
  );
}
export default DevicesPageContent;
