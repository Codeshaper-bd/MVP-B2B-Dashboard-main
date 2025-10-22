import React from "react";

import StepFive from "./steps/step-five";
import StepFour from "./steps/step-four";
import StepOne from "./steps/step-one";
import StepSeven from "./steps/step-seven";
import StepSix from "./steps/step-six";
import StepThree from "./steps/step-three";
import StepTwo from "./steps/step-two";

type Props = {
  currentStep: number;
};

function StepSpecificContent({ currentStep }: Props) {
  return (
    <div>
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
      {currentStep === 4 && <StepFour />}
      {currentStep === 5 && <StepFive />}
      {currentStep === 6 && <StepSix />}
      {currentStep === 7 && <StepSeven />}
    </div>
  );
}

export default StepSpecificContent;
