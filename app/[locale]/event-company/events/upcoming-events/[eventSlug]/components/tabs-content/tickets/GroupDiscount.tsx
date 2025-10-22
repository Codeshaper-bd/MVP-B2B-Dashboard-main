import { memo } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import GroupDiscountForm from "@/components/modules/group-discount/forms";
import GroupDiscountSwitch from "@/components/modules/group-discount/GroupDiscountSwitch";
import RenderData from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";

function GroupDiscount() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();

  const isGroupDiscountEnabled =
    !!getAnEventData?.details?.isGroupDiscountEnabled;

  return (
    <Card>
      <CardContent className="p-5">
        <RenderData
          expectedDataType="object"
          data={getAnEventData}
          {...getAnEventApiState}
        >
          <div className="flex justify-between">
            <h3>Group Discount</h3>
            <GroupDiscountSwitch getAnEventData={getAnEventData} />
          </div>

          {isGroupDiscountEnabled && (
            <GroupDiscountForm
              getAnEventData={getAnEventData}
              getAnEventApiState={getAnEventApiState}
            />
          )}
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default memo(GroupDiscount);
