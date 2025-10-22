import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import CurrentLoyaltySetting from "./current-loyalty-setting";
import DistributionPointsChart from "./distribution-point-chart";
import NotificationSetting from "./notification-setting";
import PointRedemptionsSettings from "./point-redemptions-settings";
import PointStreaks from "./point-streaks";

function FormContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <Card>
            <CardHeader className="md:pb-0">
              <CardTitle>Current Loyalty Program Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 px-6">
              <CurrentLoyaltySetting />
              <Separator />
              <PointRedemptionsSettings />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <DistributionPointsChart />
        </div>
      </div>

      <NotificationSetting />

      <Card>
        <CardHeader>
          <CardTitle>Point Streaks Option</CardTitle>
        </CardHeader>

        <CardContent>
          <PointStreaks />
        </CardContent>
      </Card>
    </div>
  );
}

export default FormContent;
