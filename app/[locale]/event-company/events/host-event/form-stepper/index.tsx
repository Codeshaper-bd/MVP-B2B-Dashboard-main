"use client";

import { memo } from "react";
import { FormProvider } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import EventPhoneView from "@/components/modules/event/event-phone-view";
import DateRangeModalInfo from "@/components/modules/event/modals/DateRangeModalInfo";
import EventCreatedDialog from "@/components/modules/event/modals/EventCreatedDialog";
import ScheduleEvent from "@/components/modules/event/modals/ScheduleEvent";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import Steps from "@/components/ui/stepper/steps";

import { steps } from "./steps";
import StepOne from "./steps/step-one";
import StepTwo from "./steps/step-two";
import { useEventStepperForm } from "./useEventStepperForm";

function FormStepper() {
  const {
    formProps,
    onSubmit,
    handleNext,
    handleCancel,
    stepperProps: {
      currentStep,
      nextStep,
      prevStep,
      isLastStep,
      initialStep,
      setStep,
    },
    getAnEventData,
    getAnEventApiState,
    isProbableValidSlugFound,
    isValidEventId,
    eventId,
    isMediaLoading,
    isSubmittingOrUpdating,
    eventPublished: { isPublished, setIsPublished },
    isDateRangeModalOpen,
    setIsDateRangeModalOpen,
    handleProceed,
    handleDateRangeCancel,
    isDateRangeModalLoading,
  } = useEventStepperForm();

  const { handleSubmit } = formProps;

  const handleStepClick = async (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setStep(stepIndex);
    } else if (stepIndex > currentStep) {
      if (currentStep <= 1) {
        const success = await handleNext();
        if (success) {
          setStep(stepIndex);
        }
      } else {
        setStep(stepIndex);
      }
    }
  };

  return (
    <div className="w-full">
      <Steps
        currentStep={currentStep}
        steps={steps}
        onStepClick={handleStepClick}
      />

      <FormProvider {...formProps}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 lg:px-14">
            {currentStep === 0 &&
              !isProbableValidSlugFound &&
              !isValidEventId && <StepOne isMediaLoading={isMediaLoading} />}

            {isProbableValidSlugFound && (
              <RenderData
                {...getAnEventApiState}
                expectedDataType="object"
                data={getAnEventData}
              >
                <>
                  {isValidEventId && (
                    <>
                      {currentStep === 0 && (
                        <StepOne isMediaLoading={isMediaLoading} />
                      )}
                      {currentStep === 1 && <StepTwo />}
                      {currentStep === 2 && (
                        <EventPhoneView
                          getAnEventData={getAnEventData}
                          getAnEventApiState={getAnEventApiState}
                          isEventCompany
                        />
                      )}
                    </>
                  )}
                </>
              </RenderData>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 px-12 md:justify-end">
            <Button color="secondary" onClick={handleCancel} type="button">
              Cancel
            </Button>

            {currentStep > initialStep && (
              <Button
                color="primary"
                onClick={() => {
                  prevStep();
                }}
                type="button"
                disabled={isSubmittingOrUpdating}
              >
                Previous
              </Button>
            )}

            {isLastStep && (
              <ScheduleEvent getAnEventData={getAnEventData} isEventCompany />
            )}

            <Button
              color="primary"
              type={isLastStep ? "submit" : "button"}
              onClick={handleNext}
              disabled={isSubmittingOrUpdating}
            >
              <ButtonLoadingContent
                actionContent={isLastStep ? "Publish Event" : "Save & Next"}
                isLoading={isSubmittingOrUpdating}
              />
            </Button>
          </div>
        </form>
      </FormProvider>

      <EventCreatedDialog
        open={isPublished}
        getAnEventData={getAnEventData}
        setOpen={setIsPublished}
        isEventCompany
      />
      <DateRangeModalInfo
        open={isDateRangeModalOpen}
        setOpen={setIsDateRangeModalOpen}
        handleProceed={handleProceed}
        handleCancel={handleDateRangeCancel}
        isLoading={isDateRangeModalLoading}
      />
    </div>
  );
}

export default memo(FormStepper);
