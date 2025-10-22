import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetTicketTiersDetailsQuery } from "@/store/api/ticket-tier/ticket-tier-api";
import RenderData from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";

import ViewEventTax from "../ViewEventTax";

interface IFinanceCardProps {
  getAnEventData: TEvent | TNullish;
}
function FinanceCard({ getAnEventData }: IFinanceCardProps) {
  const eventSlug = getAnEventData?.details?.slug;
  const isValidSlug = checkIsValidId(eventSlug, { type: "string" });

  const { data: getTicketTiersRes, ...getTicketTiersApiState } =
    useGetTicketTiersDetailsQuery(
      {
        slug: eventSlug,
      },
      {
        skip: !isValidSlug,
      },
    );
  const getTicketTiersData = getTicketTiersRes?.data;
  return (
    <RenderData
      data={getTicketTiersData}
      expectedDataType="object"
      {...getTicketTiersApiState}
    >
      <div className="space-y-6">
        <h3 className="text-base font-medium text-default-900">
          Other Finances
        </h3>
        <Card>
          <CardContent className="p-4">
            <ViewEventTax getAnEventData={getAnEventData} isHideConfigure />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3>Comulative Taxes Collected from Ticketing</h3>
            <div>
              $
              {convertToNumber({
                value: getTicketTiersData?.totalTax?.totalTax,
                digit: 2,
                fallback: 0,
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </RenderData>
  );
}

export default FinanceCard;
