import { memo } from "react";

import SeparatorLabel from "@/components/separator-label";
import { Card, CardContent } from "@/components/ui/card";

import AddPromotionDialog from "./components/add-promotion-dialog";
import ConfigurePromotion from "./components/configure";
import PromotionsTable from "./components/promotions-table";

function StepFour() {
  return (
    <Card className="p-0">
      <CardContent className="p-0 pb-6">
        <PromotionsTable />

        <SeparatorLabel>
          <AddPromotionDialog />
        </SeparatorLabel>

        <ConfigurePromotion />
      </CardContent>
    </Card>
  );
}

export default memo(StepFour);
