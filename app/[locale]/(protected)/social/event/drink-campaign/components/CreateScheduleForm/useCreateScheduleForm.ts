import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import useStepper from "@/hooks/use-stepper";

import { steps } from "./constants";
import type { TInitialState } from "./types";
import { initialState } from "./utils";

const useCreateScheduleForm = () => {
  const router = useRouter();
  const stepProps = useStepper({
    initialStep: 0,
    totalSteps: steps.length,
  });
  const formProps = useForm<TInitialState, TInitialState>({
    // resolver: yupResolver(validationSchema) as any,
    defaultValues: initialState,
  });

  const onSubmit = async (data: TInitialState) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/en/social/event/ai-generated-campaigns/post-analytic");
  };

  // const handleNext = async () => {
  //   const isStepValid = await trigger("eventDetails");
  //   if (isStepValid) {
  //     nextStep();
  //   }
  // };

  const handleNext = async () => {
    if (!stepProps?.isLastStep) {
      // validation check pending here
      stepProps?.nextStep();
    } else {
      formProps.control.handleSubmit(onSubmit)();
    }
  };

  return {
    formProps,
    stepProps,
    handleNext,
    onSubmit,
  };
};

export default useCreateScheduleForm;
