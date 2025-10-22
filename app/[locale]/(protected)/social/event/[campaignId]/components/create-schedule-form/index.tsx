"use client";
import { FormProvider } from "react-hook-form";

import ChooseTemplate from "@/app/[locale]/(protected)/social/event/[campaignId]/components/create-schedule-form/steps/choose-a-template";
import EditImage from "@/app/[locale]/(protected)/social/event/[campaignId]/components/create-schedule-form/steps/edit-image";
import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import Steps from "@/components/ui/stepper/steps";

import { steps } from "./constants";
import EventInformation from "./steps/event-information";
import GeneratedImagesStep from "./steps/generated-image";
import PreviewStep from "./steps/preview";
import SelectTheme from "./steps/select-theme";
import useCreateScheduleForm from "./useCreateScheduleForm";

function CreateScheduleForm() {
  const {
    formProps,
    stepProps: { currentStep, prevStep, isLastStep, totalSteps },
    handleNext,
    onSubmit,
  } = useCreateScheduleForm();
  const { handleSubmit } = formProps;
  const router = useRouter();

  return (
    <div className="w-full">
      <Steps currentStep={currentStep} steps={steps} />

      <FormProvider {...formProps}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-12 lg:px-14">
            {currentStep === 0 && <SelectTheme />}
            {currentStep === 1 && <EventInformation />}
            {currentStep === 2 && <ChooseTemplate />}
            {currentStep === 3 && <GeneratedImagesStep />}
            {currentStep === 4 && <EditImage />}
            {currentStep === 5 && <PreviewStep />}
          </div>

          <div className="mt-6 flex justify-end gap-3 px-12">
            <Button
              type="button"
              color="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            {currentStep > 0 && (
              <Button type="button" color="primary" onClick={prevStep}>
                Previous
              </Button>
            )}

            <Button
              type={isLastStep ? "submit" : "button"}
              color="primary"
              onClick={handleNext}
              disabled={formProps.formState.isSubmitting}
            >
              {isLastStep ? "Publish" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateScheduleForm;
