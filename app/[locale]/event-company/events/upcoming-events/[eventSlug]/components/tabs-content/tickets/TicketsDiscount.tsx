import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import DiscountList from "@/components/modules/discount/DiscountList";
import DiscountSwitch from "@/components/modules/discount/DiscountSwitch";
import CreateDiscountDialog from "@/components/modules/discount/modals/create-discount-dialog";
import { Card, CardContent } from "@/components/ui/card";

function TicketsDiscount() {
  const { getAnEventData } = useFetchAnEventData();
  const eventId = getAnEventData?.details?.id;

  const isDiscountEnabled = !!getAnEventData?.details?.isDiscountEnabled;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center">
          <h2 className="flex-1 text-lg font-semibold text-default-900">
            Discount
          </h2>

          <div className="flex flex-none items-center gap-2">
            {isDiscountEnabled && (
              <CreateDiscountDialog
                mode="server-create"
                model="Event"
                modelId={eventId}
                getAnEventData={getAnEventData}
              />
            )}

            <DiscountSwitch getAnEventData={getAnEventData} />
          </div>
        </div>
        {isDiscountEnabled && (
          <DiscountList
            model="Event"
            modelId={eventId}
            getAnEventData={getAnEventData}
            isShowRedeemedCount={true}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default TicketsDiscount;
