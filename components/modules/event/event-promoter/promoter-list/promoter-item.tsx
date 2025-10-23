import { memo } from "react";

import type { TLinkTracking } from "@/store/api/link-tracking/link-tracking.types";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type TPromoterItem = {
  item: TLinkTracking;
  onDeleteClick?: (item: TLinkTracking) => void;
};

function PromoterItem({ item, onDeleteClick }: TPromoterItem) {
  const { promoter } = item;
  const promoterUrl = promoter?.media?.[0]?.url || "";

  const handleDeleteButtonClick =
    ({ item, onDeleteClick }: TPromoterItem) =>
    () => {
      onDeleteClick?.(item);
    };

  return (
    <Card className="rounded-md bg-secondary">
      <CardContent className="p-2.5">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={promoterUrl} alt="dashcode" />
              <AvatarFallback>{promoter?.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <h2 className="text-sm font-medium capitalize text-default-1000">
              {promoter?.name}
            </h2>
          </div>

          <div className="flex-none">
            <DeleteIcon
              className="size-4 cursor-pointer text-destructive"
              onClick={handleDeleteButtonClick({ item, onDeleteClick })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(PromoterItem);
