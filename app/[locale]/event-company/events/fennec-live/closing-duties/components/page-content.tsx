"use client";
import React, { useEffect, useState } from "react";

import useStepper from "@/hooks/use-stepper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ClosingChecklist from "./closing-checklist";
import ClosingChecklistMobile from "./closing-checklist-mobile";
import EventsHeader from "./events-header";
import CloseNightDialog from "./modals/close-night-dialog";
import StepSpecificContent from "./StepSpecificContent";

function PageContent() {
  const [open, setOpen] = useState<boolean>(false);
  const [isLockEvent, setLockEvent] = useState<boolean>(false);
  const stepper = useStepper({
    initialStep: 0,
    totalSteps: 8,
  });

  useEffect(() => {
    if (isLockEvent && stepper.currentStep === 0) {
      stepper.setStep(1);
    }
  }, [isLockEvent, stepper]);

  return (
    <div className="space-y-6">
      <EventsHeader isLockEvent={isLockEvent} setLockEvent={setLockEvent} />
      <div className="flex flex-col gap-8">
        <ClosingChecklist currentStep={stepper.currentStep} />
        <ClosingChecklistMobile currentStep={stepper.currentStep} />

        <StepSpecificContent currentStep={stepper.currentStep} />
      </div>
      <Separator
        className="my-5 w-full bg-default-100"
        orientation="horizontal"
      />
      <div className="flex justify-end gap-4 lg:pb-14">
        {!stepper.isFirstStep && stepper.currentStep !== 1 && (
          <Button onClick={stepper.prevStep} color="primary" type="submit">
            Previous
          </Button>
        )}

        {!stepper.isLastStep ? (
          <Button
            disabled={stepper.isFirstStep}
            onClick={stepper.nextStep}
            color="primary"
            type="submit"
          >
            Proceed
          </Button>
        ) : (
          <Button onClick={() => setOpen(true)} color="primary" type="submit">
            Close Night
          </Button>
        )}
        <CloseNightDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default PageContent;
