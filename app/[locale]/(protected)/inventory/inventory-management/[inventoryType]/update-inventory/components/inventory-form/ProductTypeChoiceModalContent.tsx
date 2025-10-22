import { cn } from "@/lib/utils";
import type { TInventoryItemType } from "@/store/api/inventory-item/inventory-item.types";
import CrossIcon from "@/components/icons/CrossIcon";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductTypeChoiceOptionCard, {
  type TOnClick,
} from "./ProductTypeChoiceOptionCard";

export interface IProductTypeOption {
  label: string;
  value: TInventoryItemType;
  icon: string;
}

const productTypeOptions: IProductTypeOption[] = [
  {
    label: "Alcoholic",
    value: "ALCOHOLIC",
    icon: "/assets/inventory/alcoholic-icon.svg",
  },
  {
    label: "Non Alcoholic",
    value: "NON_ALCOHOLIC",
    icon: "/assets/inventory/non-alcoholic-icon.svg",
  },
];

interface IProductTypeChoiceModalContentProps {
  onClick?: TOnClick;
  value?: TInventoryItemType;
}

function ProductTypeChoiceModalContent({
  onClick,
  value,
}: IProductTypeChoiceModalContentProps) {
  return (
    <DialogContent
      hideInternalClose
      className={cn("p-6", "!w-full !max-w-[512px]")}
    >
      <DialogDescription className="sr-only">
        Select Product Type
      </DialogDescription>

      <div>
        <div
          className={cn(
            "flex w-full justify-between overflow-hidden rounded-xl",
          )}
        >
          <div className="w-full flex-1">
            <DialogHeader className={cn("px-6")}>
              <DialogTitle className={cn("text-center capitalize")}>
                Select Type
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="relative">
            <div className="absolute right-0 top-0">
              <DialogClose asChild>
                <Button
                  color="secondary"
                  className={cn(
                    "h-auto border border-default-100 border-opacity-0 bg-transparent !p-0 text-[#85888E] transition-all duration-300 ease-linear hover:border-0 hover:border-transparent hover:border-opacity-100 hover:bg-default-50 hover:bg-transparent hover:text-primary focus:border",
                  )}
                  type="button"
                >
                  <CrossIcon className="size-5" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-5">
          <div className="grid gap-4">
            {productTypeOptions?.map((option) => (
              <ProductTypeChoiceOptionCard
                key={option?.value}
                {...option}
                onClick={onClick}
                isSelected={
                  !!option?.value && !!value && option?.value === value
                }
              />
            ))}
          </div>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}

export default ProductTypeChoiceModalContent;
