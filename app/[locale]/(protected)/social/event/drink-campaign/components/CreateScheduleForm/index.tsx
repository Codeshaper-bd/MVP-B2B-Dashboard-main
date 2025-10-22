"use client";
import { FormProvider } from "react-hook-form";

import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import Steps from "@/components/ui/stepper/steps";

import { steps } from "./constants";
import ChooseTemplate from "./Steps/choose-a-template";
import CreateDrinkForm from "./Steps/CreateDrinkForm";
import GeneratedImagesStep from "./Steps/generated-image";
import PreviewStep from "./Steps/preview-step";
import SelectChannel from "./Steps/select-channel";
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
            {currentStep === 0 && <CreateDrinkForm />}
            {currentStep === 1 && <ChooseTemplate />}
            {currentStep === 2 && <GeneratedImagesStep />}
            {currentStep === 3 && <SelectChannel />}
            {currentStep === 4 && <PreviewStep />}
          </div>

          <div className="mt-6 flex justify-end gap-3 px-12">
            <Button type="button" color="secondary" onClick={router.back}>
              Cancel
            </Button>

            {currentStep > 0 && (
              <Button type="button" color="primary" onClick={prevStep}>
                Previous
              </Button>
            )}

            <Button
              type={"button"}
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
