import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import GroupDiscountForm from "@/components/modules/group-discount/forms";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

function GroupDiscount() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();
  const isGroupDiscountEnabled =
    !!getAnEventData?.details?.isGroupDiscountEnabled;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between">
          <h3>Group Discount</h3>

          <Switch color="primary" checked={isGroupDiscountEnabled} />
        </div>

        {isGroupDiscountEnabled && (
          <GroupDiscountForm
            getAnEventData={getAnEventData}
            getAnEventApiState={getAnEventApiState}
            isPastEvent={true}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default GroupDiscount;
