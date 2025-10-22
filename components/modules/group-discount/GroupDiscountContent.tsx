import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import GroupDiscountForm from "@/components/modules/group-discount/forms";
import type { IApiStateInfo } from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface IGroupDiscountContentProps {
  getAnEventData: TEvent | TNullish;
  getAnEventApiState: IApiStateInfo;
}
function GroupDiscountContent({
  getAnEventData,
  getAnEventApiState,
}: IGroupDiscountContentProps) {
  const eventSlug = getAnEventData?.details?.slug;
  const [updateAnEvent, { isLoading: isUpdating }] = useUpdateAnEventMutation();

  const handleChange = async (checked: boolean) => {
    try {
      await updateAnEvent({
        slug: eventSlug,
        body: {
          isGroupDiscountEnabled: checked,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isGroupDiscountEnabled =
    !!getAnEventData?.details?.isGroupDiscountEnabled;

  return (
    <Card className="p-0">
      <CardContent className="p-6">
        <div>
          <div className="flex justify-between">
            <h3>Group Discount</h3>

            <Switch
              color="primary"
              checked={isGroupDiscountEnabled}
              onCheckedChange={handleChange}
              disabled={isUpdating}
            />
          </div>

          {isGroupDiscountEnabled && (
            <GroupDiscountForm
              getAnEventData={getAnEventData}
              getAnEventApiState={getAnEventApiState}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default GroupDiscountContent;
