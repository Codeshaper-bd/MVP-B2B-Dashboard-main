import { useFormContext } from "react-hook-form";

import DataBaseIcon from "@/components/icons/DataBaseIcon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/ui/NumberInput";
import { Switch } from "@/components/ui/switch";

import type { TLoyaltyProgramFormInput } from "./utils";

function NotificationSetting() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TLoyaltyProgramFormInput>();

  const isEnabledNotification = watch("emailNotificationEnabled") ?? false;
  const isEnabled = watch("enabled") ?? false;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Switch
            color="success"
            id="notification"
            checked={isEnabledNotification}
            onCheckedChange={(checked) => {
              setValue("emailNotificationEnabled", checked);
              setValue("notificationPoint", undefined);
            }}
            disabled={!isEnabled}
          />
          <Label htmlFor="notification" className="mb-0">
            Notification Settings
          </Label>
        </div>
      </CardHeader>

      {isEnabledNotification && isEnabled && (
        <CardContent className="pt-0">
          <div className="flex flex-col gap-3 md:flex-row lg:gap-4">
            <div className="block w-full items-baseline gap-4 pt-0 md:flex md:w-auto">
              <p className="mb-1.5 text-sm font-medium leading-5 text-default-700">
                Send Email at
              </p>
              <NumberInput
                id="notificationPoint"
                required
                size="sm"
                className="w-full md:max-w-[152px]"
                placeholder="1000"
                value={watch("notificationPoint")}
                onChange={(value) => {
                  setValue("notificationPoint", Number(value));
                }}
                error={errors.notificationPoint?.message}
                leftContent={<DataBaseIcon className="h-5 w-5" />}
              />
            </div>

            <div className="mt-2 text-sm font-medium text-default-700">
              point reach
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default NotificationSetting;
