import { convertToNumber } from "@/lib/data-types/number";
import type {
  TAddOn,
  TUpdateAnAddOnArgs,
} from "@/store/api/add-ons/add-ons.types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface IAddOns {
  item: TAddOn;
  editAddonsHandler?: (slug: TUpdateAnAddOnArgs["slug"]) => void;
  deleteAddonsHandler?: (slug: TUpdateAnAddOnArgs["slug"]) => void;
}
function AddOns({ item, editAddonsHandler, deleteAddonsHandler }: IAddOns) {
  const { slug, name, description, maxQty, price, soldQty, media } = item;
  return (
    <Card className="col-span-1 rounded-lg border-default-200 bg-secondary p-5 shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <CardTitle className="flex items-center justify-start gap-3 text-base font-normal text-default-700">
          <Avatar className="size-8 p-2">
            <AvatarImage src={media?.url || ""} />
            <AvatarFallback className="uppercase">
              {name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {name}
        </CardTitle>

        <div className="flex items-center justify-end gap-3">
          {editAddonsHandler && (
            <Button
              type="button"
              color="primary"
              className="flex-none hover:bg-primary/20"
              size="icon"
              onClick={() => editAddonsHandler?.(slug)}
              variant="ghost"
            >
              <EditPenIcon className="h-5 w-5" stroke="#F79009" />
            </Button>
          )}
          {deleteAddonsHandler && (
            <Button
              type="button"
              color="destructive"
              className="flex-none"
              size="icon"
              onClick={() => deleteAddonsHandler?.(slug)}
              variant="ghost"
            >
              <DeleteIcon className="h-5 w-5" stroke="#F79009" />
            </Button>
          )}
        </div>
      </div>
      <Separator className="bg-default-200" />
      {description && (
        <div className="mt-3">
          <p className="mb-1 text-sm font-medium text-default-700">
            Description
          </p>
          <p className="text-sm leading-relaxed text-default-600">
            {description}
          </p>
        </div>
      )}
      <div className="mt-3 flex items-center justify-between text-sm text-default-700">
        <p className="flex items-center justify-start gap-2">Max QTY</p>
        <span>{maxQty}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-default-700">
        <p className="flex items-center justify-start gap-2">
          Quantity Purchased
        </p>
        <span>{convertToNumber({ value: soldQty, digit: 0 })}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-default-700">
        <p className="flex items-center justify-start gap-2">Price</p>
        <span>{price}</span>
      </div>
    </Card>
  );
}

export default AddOns;
