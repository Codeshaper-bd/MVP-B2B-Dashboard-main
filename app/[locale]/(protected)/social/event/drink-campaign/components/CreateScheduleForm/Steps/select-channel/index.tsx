import CustomRadioGroup from "@/components/CustomRadioGroup";
import SelectInput from "@/components/SelectInput";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import NotificationSelector from "./notification-selector";

function SelectChannel() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-default-900">
          Select Channel
        </h3>
        <p className="mb-12 text-sm text-default-600">
          Choose a Channel for Your Campaign
        </p>
        <NotificationSelector />
        <div className="mt-14 max-w-[520px]">
          <CustomRadioGroup
            options={[
              {
                label: "Send by Specific criteria",
                value: "cr1",
              },
              {
                label: "All",
                value: "cr2",
              },
            ]}
          />
        </div>
        <div className="mt-6 max-w-[520px] space-y-4">
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-3">
              <Checkbox id="cb1" />
              <Label htmlFor="cb1" className="mb-0">
                Birthday Month
              </Label>
            </div>
            <div className="flex-none">
              <SelectInput
                className="w-[192px]"
                options={[
                  {
                    label: "January",
                    value: "jan",
                  },
                  {
                    label: "February",
                    value: "Feb",
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-3">
              <Checkbox id="cb2" />
              <Label htmlFor="cb2" className="mb-0">
                Birthday Year
              </Label>
            </div>
            <div className="flex-none">
              <SelectInput
                className="w-[192px]"
                options={[
                  {
                    label: "2000",
                    value: 2000,
                  },
                  {
                    label: "3000",
                    value: 3000,
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-3">
              <Checkbox id="cb3" />
              <Label htmlFor="cb3" className="mb-0">
                Loyalty points more than
              </Label>
            </div>
            <div className="flex-none">
              <Input type="number" value={300} className="w-[192px]" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-3">
              <Checkbox id="cb4" />
              <Label htmlFor="cb4" className="mb-0">
                Number of Visits
              </Label>
            </div>
            <div className="flex-none">
              <Input type="number" value={10} className="w-[192px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SelectChannel;
