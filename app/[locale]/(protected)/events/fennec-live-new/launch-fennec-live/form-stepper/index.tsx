"use client";

import { memo } from "react";
import { FormProvider } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ScheduleEvent from "@/components/modules/event/modals/ScheduleEvent";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import Steps from "@/components/ui/stepper/steps";

import EventCreatedDialog from "./event-created-dialog";
import { steps } from "./steps";
import StepFour from "./steps/step-four";
import StepOne from "./steps/step-one";
import StepThree from "./steps/step-three";
import StepTwo from "./steps/step-two";
import { useEventStepperForm } from "./useEventStepperForm";
import DateRangeModalInfo from "../../../host-event/modals/DateRangeModalInfo";

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
                      {currentStep === 2 && <StepThree />}
                      {currentStep === 3 && <StepFour />}
                    </>
                  )}
                </>
              </RenderData>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 px-12 md:justify-end">
            {/*   <Button color="secondary" onClick={handleCancel} type="button">
              Cancel
            </Button> */}

            {currentStep > initialStep && (
              <Button
                color="secondary"
                onClick={() => {
                  prevStep();
                }}
                type="button"
                disabled={isSubmittingOrUpdating}
              >
                <ArrowLeftIcon className="me-1 size-5" /> Back
              </Button>
            )}

            {isLastStep && <ScheduleEvent getAnEventData={getAnEventData} />}

            <Button
              color="primary"
              type={isLastStep ? "submit" : "button"}
              onClick={handleNext}
              /* in last step button is disabled right now after connect api make this enable */
              disabled={isSubmittingOrUpdating || isLastStep}
              className={` ${isLastStep && "bg-gradient-to-r from-[#E31B54] to-[#DD2590]"} `}
            >
              {isLastStep && (
                <span className="relative pl-5 before:absolute before:left-1 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-current before:content-['']"></span>
              )}
              <ButtonLoadingContent
                actionContent={
                  isLastStep ? "Launch Fennec Live" : "Save & Next"
                }
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
