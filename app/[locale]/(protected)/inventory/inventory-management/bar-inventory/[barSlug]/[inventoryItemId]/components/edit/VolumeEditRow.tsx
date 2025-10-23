import { memo } from "react";
import {
  type Control,
  Controller,
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormRegister,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";
import type {
  TSoldBy,
  TUnitItem,
  TVolumeItem,
  TVolumeWithShipmentVolume,
} from "@/store/api/inventory-item/inventory-item.types";
import UnitTypeDropdown from "@/components/features/dropdown/unit-type-dropdown";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputCounter from "@/components/ui/InputCounter2";
import NumberInput from "@/components/ui/NumberInput";

import type { TBarInventoryFormType } from "./types";

interface IVolumeEditRowProps {
  soldBy: TSoldBy;
  index: number;
  field: FieldArrayWithId<TBarInventoryFormType, "volumes", "id">;
  fields: FieldArrayWithId<TBarInventoryFormType, "volumes", "id">[];
  register: UseFormRegister<TBarInventoryFormType>;
  setValue: UseFormSetValue<TBarInventoryFormType>;
  control: Control<TBarInventoryFormType>;
  errors: FieldErrors<TBarInventoryFormType>;
  append: UseFieldArrayAppend<TBarInventoryFormType, "volumes">;
  remove: UseFieldArrayRemove;
}

function VolumeEditRow({
  control,
  index,
  append,
  remove,
  fields,
  field,
  errors,
  register,
  setValue,
  soldBy,
}: IVolumeEditRowProps) {
  const averegePricePerItm = useWatch({
    control,
    name: `volumes.${index}.pricePerUnit`,
  });

  return (
    <div key={field.id} className="flex items-center gap-4">
      <div className="grid w-full gap-4 rounded-xl bg-default-50 px-4 py-5 sm:grid-cols-2">
        <div className="col-span-full flex items-center justify-between">
          <p className="shrink-0 text-default-700">
            {soldBy} #{index + 1}
          </p>

          <Button
            onClick={() => remove(index)}
            type="button"
            color="secondary"
            size="44"
            className="bg-default-200# hover:bg-default-200# shrink-0"
          >
            <DeleteIcon className="size-5 text-[#F97066]" />
          </Button>
        </div>

        <Input
          label="Volume"
          required
          type="number"
          min={0}
          isPositiveOnly
          className="number-input-no-spinner bg-default"
          {...register(`volumes.${index}.volume`)}
          rightContent={
            <Controller
              control={control}
              name={`volumes.${index}.unit`}
              render={({ field: { onChange, value } }) => (
                <UnitTypeDropdown
                  value={value}
                  onChange={onChange}
                  hideOption={["g"]}
                  disabled
                />
              )}
            />
          }
          error={
            errors?.volumes?.[index]?.volume?.message ||
            errors?.volumes?.[index]?.unit?.message
          }
          disabled
        />

        <Input
          label="Product Code"
          readOnly
          type="text"
          className="bg-default"
          placeholder="Enter product code"
          {...register(`volumes.${index}.productCode`)}
          error={errors?.volumes?.[index]?.productCode?.message}
        />
        {soldBy === "VOLUME" && (
          <>
            <Input
              label="Net Weight of Bottle"
              required
              type="number"
              min={0}
              isPositiveOnly
              className="number-input-no-spinner bg-default"
              {...register(`volumes.${index}.netWeight`)}
              rightContent={
                <Controller
                  control={control}
                  name={`volumes.${index}.netWeightUnit`}
                  render={({ field: { onChange, value } }) => (
                    <UnitTypeDropdown
                      value={value}
                      onChange={onChange}
                      hideOption={["ml"]}
                      disabled
                    />
                  )}
                />
              }
              error={
                errors?.volumes?.[index]?.netWeight?.message ||
                errors?.volumes?.[index]?.netWeightUnit?.message
              }
              disabled
            />
            <Input
              label="Weight of Empty Bottle"
              required
              type="number"
              min={0}
              isPositiveOnly
              className="number-input-no-spinner bg-default"
              {...register(`volumes.${index}.weightOfEmptyBottle`)}
              disabled
              rightContent={
                <Controller
                  control={control}
                  name={`volumes.${index}.netWeightUnit`}
                  render={({ field: { onChange, value } }) => (
                    <UnitTypeDropdown
                      value={value}
                      onChange={onChange}
                      hideOption={["ml"]}
                      disabled
                    />
                  )}
                />
              }
              error={
                errors?.volumes?.[index]?.weightOfEmptyBottle?.message ||
                errors?.volumes?.[index]?.netWeightUnit?.message
              }
            />
            <NumberInput
              label="Open Stock"
              // value={convertToNumber({
              //   value: field.openStock,
              //   digit: 2,
              // })}
              disabled
            />
            <NumberInput
              label="Closed Stock"
              value={convertToNumber({
                value: field.openStock,
                digit: 2,
              })}
              disabled
            />
          </>
        )}

        {soldBy === "UNIT" && (
          <Controller
            control={control}
            name={`volumes.${index}.currentStock`}
            render={({ field: { onChange, value }, field }) => (
              <InputCounter
                {...field}
                label="Current Stock"
                required
                min={0}
                step={1}
                onChange={(val) => {
                  onChange(val);
                  setValue(`volumes.${index}.currentStock`, Number(val)); // in update - api get it closedStock
                }}
                value={convertToNumber({
                  value,
                  digit: 2,
                })}
                error={
                  (
                    errors as FieldErrors<
                      Omit<TVolumeItem, "volumes"> & {
                        volumes: TVolumeWithShipmentVolume[];
                      }
                    >
                  )?.volumes?.[index]?.openingStock?.message
                }
              />
            )}
          />
        )}

        <NumberInput
          label="Avg. Price per Item"
          value={convertToNumber({
            value: averegePricePerItm,
            digit: 2,
          })}
          leftContent={
            <span className="flex items-center gap-1">
              CAD
              <ChevronDownIcon className="size-5 shrink-0" />
            </span>
          }
          error={
            (
              errors as FieldErrors<
                Omit<TUnitItem, "volumes"> & {
                  volumes: TVolumeWithShipmentVolume[];
                }
              >
            )?.volumes?.[index]?.pricePerUnit?.message
          }
          disabled
        />

        <NumberInput
          containerClassName={cn("", {
            "col-span-full": soldBy === "UNIT",
          })}
          label="Threshold (Bar Specific Par Level)"
          value={convertToNumber({
            value: field.threshold,
            digit: 2,
          })}
          onChange={(val) => {
            setValue(`volumes.${index}.threshold`, Number(val));
          }}
          error={errors?.volumes?.[index]?.threshold?.message}
        />
      </div>
    </div>
  );
}

export default memo(VolumeEditRow);
