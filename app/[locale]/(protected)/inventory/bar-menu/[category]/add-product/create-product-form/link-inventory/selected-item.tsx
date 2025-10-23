import Image from "next/image";
import { memo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { toRegularCase } from "@/lib/strings/toRegularCase";
import { CrossIcon as CrossIcon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { TUniqueProduct } from "../types";

interface ISelectedItemProps {
  item: TUniqueProduct;
  index: number;
  remove?: (index: number) => void;
}

function SelectedItem({ item, index, remove }: ISelectedItemProps) {
  const { control, setValue } = useFormContext();
  const { _id, name, volume, type, media, usageQuantity, usageUnit, soldBy } =
    item;
  const isFullSize = useWatch({
    control,
    name: `ingredients.${index}.isFullSize`,
  });

  return (
    <div className="flex w-full shrink-0 items-center border-b border-default-200 px-4 py-5 last:border-none">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative z-10 size-9 shrink-0">
          <Image
            src={
              media?.find((med) => med?.isFeatured)?.url ||
              media?.[0]?.url ||
              "/assets/all/p1.png"
            }
            alt={name}
            width={36}
            height={36}
            className="size-full rounded object-cover"
          />
          <button
            type="button"
            className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
            onClick={() => remove?.(index)}
          >
            <CrossIcon className="size-2.5" />
          </button>
        </div>
        <div>
          <div className="space-y-1">
            <h3 className="text-base font-medium text-default-900">{name}</h3>
            <p className="text-sm font-medium capitalize text-default-900">
              {toRegularCase(soldBy)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-none items-center gap-6">
        {/* Usage Quantity Input */}
        <div className="w-[200px]">
          <Controller
            name={`ingredients.${index}.usageQuantity`}
            control={control}
            defaultValue={usageQuantity}
            render={({ field }) => {
              // Disable input when full (usageQuantity equals volume)
              const isFullSize = Number(field?.value) >= volume;
              return (
                <Input
                  {...field}
                  type="number"
                  disabled={isFullSize}
                  min={0}
                  max={volume}
                  isPositiveOnly
                  className="hide-input-type-number-arrows h-9 text-center"
                  value={field.value === 0 ? String(field.value) : field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Allow the field to be empty during editing.
                    if (val === "") {
                      field.onChange("");
                      setValue(`ingredients.${index}.isFullSize`, false);
                      setValue(`ingredients.${index}.ingredientId`, _id);
                      return;
                    }
                    const newVal = Number(val);
                    // Validate the new value
                    if (Number.isNaN(newVal) || newVal < 0 || newVal > volume) {
                      return;
                    }
                    field.onChange(newVal);
                    // Update the checkbox automatically.
                    if (newVal === volume) {
                      setValue(`ingredients.${index}.isFullSize`, true);
                      setValue(`ingredients.${index}.ingredientId`, _id);
                    } else {
                      setValue(`ingredients.${index}.isFullSize`, false);
                      setValue(`ingredients.${index}.ingredientId`, _id);
                    }
                  }}
                  onBlur={(e) => {
                    // If the input was cleared, default to 0 on blur.
                    if (e.target.value === "") {
                      field.onChange(0);
                    }
                    field.onBlur();
                  }}
                  rightContent={
                    <Controller
                      name={`ingredients.${index}.usageUnit`}
                      control={control}
                      defaultValue={usageUnit}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          disabled={soldBy === "UNIT" || isFullSize}
                          onValueChange={(newValue) => {
                            onChange(newValue);
                            setValue(
                              `ingredients.${index}.usageUnit`,
                              newValue,
                            );
                          }}
                          value={value}
                        >
                          <SelectTrigger className="w-[60px] !border-0 !px-1 focus:ring-0 disabled:!bg-transparent data-[state=open]:ring-0">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oz">oz</SelectItem>
                            <SelectItem value="ml">ml</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  }
                />
              );
            }}
          />
        </div>

        {/* Full Bottle Checkbox */}
        <div className="flex items-center gap-2">
          <Controller
            name={`ingredients.${index}.isFullSize`}
            control={control}
            defaultValue={Number(usageQuantity) === volume}
            render={({ field }) => (
              <Checkbox
                id={`wholeBottle-${_id}`}
                disabled={soldBy === "UNIT" || volume <= 0}
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    // When checked, set usageQuantity to the maximum (volume).
                    setValue(`ingredients.${index}.usageQuantity`, volume);
                  } else {
                    // When unchecked, reset usageQuantity to 0.
                    setValue(`ingredients.${index}.usageQuantity`, 0);
                  }
                }}
              />
            )}
          />
          <Label className="mb-0" htmlFor={`wholeBottle-${_id}`}>
            Whole Bottle
          </Label>
        </div>
      </div>
    </div>
  );
}

export default memo(SelectedItem);
