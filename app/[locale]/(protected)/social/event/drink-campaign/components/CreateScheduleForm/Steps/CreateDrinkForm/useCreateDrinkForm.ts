// import { useStepper } from "@/components/ui/stepper/use-stepper";
// import { steps } from "./constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { type Resolver, useForm } from "react-hook-form";

import type { TInitialState } from "./types";
import { initialState } from "./utils";
import { validationSchema } from "./validator";

function useCreateDrinkForm() {
  const router = useRouter();
  const formProps = useForm<TInitialState, TInitialState>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<
      TInitialState,
      TInitialState
    >,
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

  // const handleNext = () => {
  //   if (!stepProps?.isLastStep) {
  //     stepProps?.nextStep();
  //   } else {
  //     formProps.control.handleSubmit(onSubmit)();
  //   }
  // };

  return {
    formProps,
    // stepProps,
    // handleNext,
    onSubmit,
  };
}

export default useCreateDrinkForm;
