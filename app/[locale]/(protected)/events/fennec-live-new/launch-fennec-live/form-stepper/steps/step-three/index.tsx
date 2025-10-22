import { memo } from "react";

import SeparatorLabel from "@/components/separator-label";
import { Card, CardContent } from "@/components/ui/card";

import AddChallengeDialog from "./components/add-challenge-dialog";
import ChallengesTable from "./components/challenges-table";
import ConfigureChallenge from "./components/configure";

function StepThree() {
  return (
    <Card className="p-0">
      <CardContent className="p-0 pb-6">
        <ChallengesTable />

        <SeparatorLabel>
          <AddChallengeDialog />
        </SeparatorLabel>

        <ConfigureChallenge />
      </CardContent>
    </Card>
  );
}

export default memo(StepThree);
