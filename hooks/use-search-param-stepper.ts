import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";

type TFunc = (props: {
  setCurrentStep: (props: {
    key: "currentStep";
    value: unknown;
    options?: NavigateOptions | void | undefined | null;
  }) => void;
  getCurrentStepValue: <U extends "currentStep">(
    key: U,
  ) => Partial<TStepProp>[U] | undefined;
  initialStep: number;
  totalSteps: number;
}) => () => void;

type TSetStep = (props: {
  setCurrentStep: (props: {
    key: "currentStep";
    value: unknown;
    options?: NavigateOptions | void | undefined | null;
  }) => void;
  getCurrentStepValue: <U extends "currentStep">(
    key: U,
  ) => Partial<TStepProp>[U] | undefined;
  initialStep: number;
  totalSteps: number;
}) => (step: number) => void;

const nextStep: TFunc =
  ({ setCurrentStep, getCurrentStepValue, initialStep = 0, totalSteps = 0 }) =>
  () => {
    const prevStep = getCurrentStepValue("currentStep") || initialStep;
    // setCurrentStep?.((prev) => Math.min(prev + 1, totalSteps - 1));
    setCurrentStep?.({
      key: "currentStep",
      value: Math.min(prevStep + 1, totalSteps - 1),
    });
  };

const prevStep: TFunc =
  ({ setCurrentStep, getCurrentStepValue, initialStep = 0, totalSteps = 0 }) =>
  () => {
    const prevStep = getCurrentStepValue("currentStep") || initialStep;
    // setCurrentStep?.((prev) => Math.max(prev - 1, 0));
    setCurrentStep?.({
      key: "currentStep",
      value: Math.max(prevStep - 1, initialStep),
    });
  };

const setStep: TSetStep =
  ({ setCurrentStep, getCurrentStepValue, initialStep = 0, totalSteps = 0 }) =>
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

    setCurrentStep?.({
      key: "currentStep",
      value: Math.max(initialStep, Math.min(step, totalSteps - 1)),
    });

    // setCurrentStep?.(Math.max(0, Math.min(step, totalSteps - 1)));
  };

type TUseStepperProps = {
  initialStep?: number;
  totalSteps?: number;
  currentStep: number;
  getCurrentStepValue: <U extends "currentStep">(
    key: U,
  ) => Partial<TStepProp>[U] | undefined;
  setCurrentStep: ({
    key,
    value,
    options,
  }: {
    key: "currentStep";
    value: unknown;
    options?: NavigateOptions | void | undefined | null;
  }) => void;
};

export type TStepProp = {
  currentStep: number;
};

const useSearchParamStepper = ({
  initialStep = 0,
  totalSteps = 0,
  currentStep = 0,
  getCurrentStepValue,
  setCurrentStep,
}: TUseStepperProps) =>
  // const { getAParamValue: getCurrentStepValue, updateAParam: setCurrentStep } =
  //   useManageSearchParams<TStepProp>();
  // const currentStep = getCurrentStepValue("currentStep") || initialStep;

  useMemo(
    () => ({
      currentStep,
      nextStep: nextStep({
        setCurrentStep,
        getCurrentStepValue,
        initialStep,
        totalSteps,
      }),
      prevStep: prevStep({
        setCurrentStep,
        getCurrentStepValue,
        initialStep,
        totalSteps,
      }),
      setStep: setStep({
        getCurrentStepValue,
        setCurrentStep,
        initialStep,
        totalSteps,
      }),
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === totalSteps - 1,
      totalSteps,
      initialStep,
    }),
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialStep, currentStep, totalSteps],
  );
export default useSearchParamStepper;

export type TUseSearchParamStepperReturn = ReturnType<
  typeof useSearchParamStepper
>;
