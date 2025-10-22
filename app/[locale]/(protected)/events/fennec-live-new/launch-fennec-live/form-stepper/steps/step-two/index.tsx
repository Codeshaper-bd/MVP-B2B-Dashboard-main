import { memo } from "react";

import ComingSoon from "@/components/templates/coming-soon";
import { Card, CardContent } from "@/components/ui/card";

function StepTwo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-default-900">
            Enable Table Services
          </h3>
        </CardContent>
      </Card>
      <ComingSoon />
    </div>
  );
}

export default memo(StepTwo);
