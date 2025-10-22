import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import DiscountEnableSwitch from "@/components/modules/discount/DiscountEnableSwitch";
import DiscountList from "@/components/modules/discount/DiscountList";
import CreateDiscountDialog from "@/components/modules/discount/modals/create-discount-dialog";
import { Card, CardContent } from "@/components/ui/card";

interface IDiscountSectionProps {
  getAnEventData: TEvent | TNullish;
}
function DiscountSection({ getAnEventData }: IDiscountSectionProps) {
  const eventId = getAnEventData?.details?.id;
  const isDiscountEnabled = !!getAnEventData?.details?.isDiscountEnabled;

  return (
    <Card className="p-0">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <h3>Discount</h3>

          <div className="flex items-center gap-2">
            {isDiscountEnabled && (
              <CreateDiscountDialog
                mode="server-create"
                model="Event"
                modelId={eventId}
                getAnEventData={getAnEventData}
              />
            )}

            <DiscountEnableSwitch getAnEventData={getAnEventData} />
          </div>
        </div>

        {isDiscountEnabled && (
          <DiscountList
            model="Event"
            modelId={eventId}
            getAnEventData={getAnEventData}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default DiscountSection;
