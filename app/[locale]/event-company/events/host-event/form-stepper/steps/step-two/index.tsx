"use client";

import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { InfoIcon as InfoIcon } from "@/components/icons";
import DiscountSection from "@/components/modules/discount/DiscountSection";
import GroupDiscountContent from "@/components/modules/group-discount/GroupDiscountContent";
import { Card, CardContent } from "@/components/ui/card";
import InfoCard from "@/components/ui/info-card";

import AddonSection from "./components/AddonSection";
import GuestListSection from "./components/guest-list-section";
import PromoterSection from "./components/promoter-section";
import { ticketingValues } from "./values";
import type { IStepFormInputs } from "../../type";
import TicketSection from "./components/TicketSection";
import { useEventStepperForm } from "../../useEventStepperForm";

function StepTwo() {
  const { control } = useFormContext<IStepFormInputs>();
  const { getAnEventData, getAnEventApiState } = useEventStepperForm();
  const isFreeGuestList = useWatch({
    control,
    name: "ticketing.isFreeGuestList",
    defaultValue: ticketingValues.isFreeGuestList,
  });

  return (
    <div className="space-y-6">
      <InfoCard
        icon={<InfoIcon className="h-5 w-5" />}
        color="primary"
        title="This information will be displayed to customers."
      />

      <Card className="p-0">
        <CardContent className="p-6">
          <GuestListSection />
        </CardContent>
      </Card>

      {!isFreeGuestList && (
        <div className="space-y-6">
          <Card className="p-0">
            <CardContent className="p-6">
              <TicketSection />
            </CardContent>
          </Card>

          <GroupDiscountContent
            getAnEventData={getAnEventData}
            getAnEventApiState={getAnEventApiState}
          />
          <DiscountSection getAnEventData={getAnEventData} />
        </div>
      )}

      <Card className="p-6">
        <CardContent className="p-0">
          <PromoterSection />
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="p-6">
          <AddonSection />
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(StepTwo);
