import Link from "next/link";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface IViewEventTaxProps {
  getAnEventData: TEvent | TNullish;
  isHideConfigure?: boolean;
}
function ViewEventTax({ getAnEventData, isHideConfigure }: IViewEventTaxProps) {
  const isTaxEnabled = !!getAnEventData?.details?.isTaxEnabled;
  const isEventCompany = useIsEventCompany();
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch
            color="primary"
            checked={isTaxEnabled}
            id="isTaxEnabled"
            disabled
          />
          <Label htmlFor="isTaxEnabled" className="mb-0">
            Enable Taxes on Ticketing Sales
          </Label>
        </div>
        {!isHideConfigure && (
          <Link
            href={
              isEventCompany
                ? "/en/event-company/user-profile"
                : "/en/dashboard/user-profile"
            }
            className="text-sm font-medium text-primary"
          >
            Configure Default Values
          </Link>
        )}
      </div>
      {isTaxEnabled && (
        <Card className="bg-secondary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Tax. Id"
                type="text"
                value={getAnEventData?.details?.taxId || ""}
                placeholder="e.g. 1234556RT0001"
                disabled
              />
              <Input
                label="Tax. Name"
                type="text"
                value={getAnEventData?.details?.taxName || ""}
                placeholder="e.g. GST, HST, VAT"
                disabled
              />
              <Input
                label="Tax. Rate(%)"
                type="text"
                rightContent="%"
                max={100}
                value={getAnEventData?.details?.taxRate || ""}
                disabled
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ViewEventTax;
