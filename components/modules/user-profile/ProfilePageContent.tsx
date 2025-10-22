"use client";

import { useVenueHighlight } from "@/hooks/use-venue-highlight";
import CloudDownloadIcon from "@/components/icons/CloudDownloadIcon";
import BasicInfoForm from "@/components/modules/user-profile/Forms/BasicInfoForm";
import OrganizationProfileForm from "@/components/modules/user-profile/Forms/OrganizationProfileForm";
import OtherVenues from "@/components/modules/user-profile/OtherVenues";
import PaymentMethod from "@/components/modules/user-profile/PaymentMethod";
import UserProfileTable from "@/components/modules/user-profile/UserProfileTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProfilePageContent() {
  useVenueHighlight();

  return (
    <div className="space-y-5">
      <Tabs defaultValue="Profile" className="w-full">
        <TabsList className="w-full border border-secondary">
          <TabsTrigger value="Profile">Profile</TabsTrigger>
          <TabsTrigger value="Billing History">Billing History</TabsTrigger>
          <TabsTrigger value="Payment Method">Payment Method</TabsTrigger>
        </TabsList>

        <TabsContent value="Profile" className="mt-4 space-y-6">
          <BasicInfoForm />
          <OrganizationProfileForm />
          <OtherVenues />
        </TabsContent>

        <TabsContent value="Billing History">
          <div className="mb-6 mt-2.5 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold leading-7 text-default-900">
              Billing History
            </h3>

            <Button color="secondary" type="button">
              <a
                className="flex items-center gap-1.5"
                href="/files/event.csv"
                download="event.csv"
                target="_blank"
              >
                <CloudDownloadIcon className="h-[15px] w-[17px] text-default-700" />
                Download all
              </a>
            </Button>
          </div>
          <UserProfileTable />
        </TabsContent>

        <TabsContent value="Payment Method">
          <PaymentMethod />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePageContent;
