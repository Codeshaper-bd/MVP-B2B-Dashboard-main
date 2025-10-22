import { useMemo, useState } from "react";

type TFunc = (props: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>> | undefined;
  totalSteps: number | undefined;
}) => () => void;

type TSetStep = (props: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>> | undefined;
  totalSteps: number | undefined;
}) => (step: number) => void;

const nextStep: TFunc =
  ({ setCurrentStep, totalSteps = 0 }) =>
  () => {
    setCurrentStep?.((prev) => Math.min(prev + 1, totalSteps - 1));
  };

const prevStep: TFunc =
  ({ setCurrentStep }) =>
  () => {
    setCurrentStep?.((prev) => Math.max(prev - 1, 0));
  };

const setStep: TSetStep =
  ({ setCurrentStep, totalSteps = 0 }) =>
  (step: number) => {
    if (typeof totalSteps !== "number" || isNaN(step)) {
      console.info("totalSteps must be a valid number");
      return;
    }

    if (!totalSteps) {
      console.info("Total steps must be greater than 0 to set step");
      return;
    }

    if (typeof step !== "number" || isNaN(step)) {
      console.info("step must be a valid number");
      return;
    }

    setCurrentStep?.(Math.max(0, Math.min(step, totalSteps - 1)));
  };

type TUseStepperProps = {
  initialStep?: number;
  totalSteps?: number;
};

const useStepper = ({ initialStep = 0, totalSteps = 0 }: TUseStepperProps) => {
  const [currentStep, setCurrentStep] = useState<number>(() => initialStep);

  return useMemo(
    () => ({
      currentStep,
      nextStep: nextStep({ setCurrentStep, totalSteps }),
      prevStep: prevStep({ setCurrentStep, totalSteps }),
      setStep: setStep({ setCurrentStep, totalSteps }),
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === totalSteps - 1,
      totalSteps,
      initialStep,
    }),
    [initialStep, currentStep, totalSteps],
  );
};

export default useStepper;

export type TUseStepperReturn = ReturnType<typeof useStepper>;
