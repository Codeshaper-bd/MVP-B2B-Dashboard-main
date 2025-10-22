import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PersonalDetails from "./personal-details";
import PurchaseHistory from "./purchase-history";

function DetailsTab() {
  return (
    <Tabs defaultValue="personalDetails" className="w-full">
      <TabsList className="custom-scrollbar flex-nowrap overflow-x-scroll border border-secondary sm:w-fit sm:overflow-hidden">
        <TabsTrigger value="personalDetails">Personal Details</TabsTrigger>
        <TabsTrigger value="purchaseHistory">
          Purchase History Summary
        </TabsTrigger>
      </TabsList>
      <TabsContent value="personalDetails" className="mt-4">
        <PersonalDetails />
      </TabsContent>
      <TabsContent value="purchaseHistory">
        <PurchaseHistory />
      </TabsContent>
    </Tabs>
  );
}

export default DetailsTab;
