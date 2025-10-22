import React from "react";

import Cashout from "./cashout";
import Overage from "./overage";
import SubmissionSummary from "./submission-summary";
import Tipout from "./tipout";

function StepTwo() {
  return (
    <div className="space-y-6">
      <SubmissionSummary />
      <Tipout />
      <Cashout
        categoryOption={[
          {
            value: "mainbar",
            label: "Main bar",
          },
        ]}
        employeeOption={[
          {
            value: "mrx",
            label: "Mr X",
          },
        ]}
      />
      <Overage />
    </div>
  );
}

export default StepTwo;
