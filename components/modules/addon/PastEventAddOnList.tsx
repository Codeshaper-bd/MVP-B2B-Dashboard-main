import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import AddOns from "@/components/modules/addon/AddOns";

function PastEventAddOnList({
  getAnEventData,
}: {
  getAnEventData: TEvent | TNullish;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium">Add-Ons</h3>
      </div>

      <div className="grid grid-flow-row gap-4 md:grid-flow-row md:grid-cols-2">
        {getAnEventData?.addOns?.map((item) => (
          <AddOns key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default PastEventAddOnList;
