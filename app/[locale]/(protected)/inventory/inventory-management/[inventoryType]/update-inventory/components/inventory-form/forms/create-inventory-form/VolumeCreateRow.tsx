import {
  type UseFormSetValue,
  type Control,
  Controller,
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormRegister,
  useWatch,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import type {
  TSoldBy,
  TUnitItem,
  TUnitWithShipmentVolume,
  TVolumeItem,
  TVolumeWithShipmentVolume,
} from "@/store/api/inventory-item/inventory-item.types";
import CrossIcon from "@/components/icons/CrossIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputCounter from "@/components/ui/InputCounter2";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TooltipComponent } from "@/components/ui/tooltip";

import type { TInventoryItemFormType } from "./types";
import { volumeUnitOptions, netWeightUnitOptions } from "./utils";

interface IVolumeCreateRowProps {
  soldBy: TSoldBy;
  index: number;
  field: FieldArrayWithId<TInventoryItemFormType, "volumes", "id">;
  fields: FieldArrayWithId<TInventoryItemFormType, "volumes", "id">[];
  register: UseFormRegister<TInventoryItemFormType>;
  control: Control<TInventoryItemFormType>;
  errors: FieldErrors<TInventoryItemFormType>;
  append: UseFieldArrayAppend<TInventoryItemFormType, "volumes">;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<TInventoryItemFormType>;
}

function VolumeCreateRow({
  control,
  index,
  append,
  remove,
  fields,
  field,
  errors,
  register,
  soldBy,
  setValue,
}: IVolumeCreateRowProps) {
  const addShipment = useWatch({
    control,
    name: `volumes.${index}.addShipment`,
  });
  const parLevel = useWatch({
    control,
    name: `volumes.${index}.perLevel`,
  });
  const pricePerCase = useWatch({
    control,
    name: `volumes.${index}.pricePerCase`,
  });
  const netWeight = useWatch({
    control,
    name: `volumes.${index}.netWeight`,
  });

  return (
    <div className="flex w-full items-center gap-4">
      <div className="w-full space-y-4 rounded-xl bg-default-50 px-4 py-5">
        <div className="flex w-full items-center justify-between md:hidden">
          <Button
            type="button"
            color="secondary"
            size="44"
            className="shrink-0 bg-default-200 hover:bg-default-200"
          >
            {index + 1}
          </Button>

          {!!fields?.length && (
            <Button
              onClick={() => remove(index)}
              type="button"
              color="secondary"
              size="44"
              className="shrink-0 bg-default-200 hover:bg-default-200"
            >
              <CrossIcon className="size-5 text-[#F97066]" />
            </Button>
          )}
        </div>

        <div
          className={cn("grid w-full items-start gap-4 md:grid-cols-2", {
            "md:grid-cols-1": soldBy === "UNIT",
          })}
        >
          <Input
            type="number"
            label="Volume"
            required
            defaultValue={0}
            min={0}
            isPositiveOnly
            className="number-input-no-spinner bg-default"
            {...register(`volumes.${index}.volume`)}
            rightContent={
              <Controller
                control={control}
                name={`volumes.${index}.unit`}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="!border-0 !px-1 focus:ring-0 data-[state=open]:ring-0">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>

                    <SelectContent align="end">
                      {volumeUnitOptions?.map((item) => (
                        <SelectItem value={item?.value} key={item?.value}>
                          {item?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            }
            error={
              errors?.volumes?.[index]?.volume?.message ||
              errors?.volumes?.[index]?.unit?.message
            }
          />

          {soldBy === "VOLUME" && (
            <NumberInput
              label="Net Weight of Bottle"
              required
              defaultValue={0}
              min={0}
              isPositiveOnly
              allowDecimal
              className="number-input-no-spinner bg-default"
              value={netWeight}
              onChange={(value) =>
                setValue(`volumes.${index}.netWeight`, Number(value))
              }
              rightExtensionContent={
                <Controller
                  control={control}
                  name={`volumes.${index}.netWeightUnit`}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger className="w-16 !border-0 px-2 focus:ring-0 data-[state=open]:ring-0">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>

                      <SelectContent align="end">
                        {netWeightUnitOptions?.map((item) => (
                          <SelectItem value={item?.value} key={item?.value}>
                            {item?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              }
              error={
                errors?.volumes?.[index]?.netWeight?.message ||
                errors?.volumes?.[index]?.netWeightUnit?.message
              }
            />
          )}

          <Input
            label={
              <div className="flex w-fit items-center gap-1.5 text-inherit">
                {soldBy === "UNIT" ? "Assign Product Code" : "Product Code"}
                <TooltipComponent
                  content={
                    <p className="max-w-[110px] text-xs font-medium leading-[18px] text-default-700">
                      This code will be associated with this specific product
                    </p>
                  }
                >
                  <InfoIcon className="size-4 text-default-1000" />
                </TooltipComponent>
              </div>
            }
            required
            type="text"
            className="bg-default"
            containerClassName="col-span-full"
            placeholder="Enter product code"
            {...register(`volumes.${index}.productCode`)}
            error={errors?.volumes?.[index]?.productCode?.message}
          />
        </div>
        <div
          className={cn("grid grid-cols-1 gap-6", {
            "grid-cols-2": soldBy === "UNIT",
          })}
        >
          <NumberInput
            label="PAR Level"
            isPositiveOnly
            min={1}
            className="bg-default"
            value={parLevel}
            onChange={(value) => {
              setValue(`volumes.${index}.perLevel`, Number(value));
            }}
            error={
              errors?.volumes?.[index]?.perLevel?.message ||
              errors?.volumes?.[index]?.perLevel?.root?.message
            }
          />
          {soldBy === "UNIT" && (
            <Controller
              control={control}
              name={`volumes.${index}.unitPerCase`}
              render={({ field: { onChange, value } }) => (
                <InputCounter
                  label="Units per Case"
                  required
                  error={
                    errors?.volumes?.[index]?.unitPerCase?.message ||
                    errors?.volumes?.[index]?.unitPerCase?.root?.message
                  }
                  className="number-input-no-spinner bg-default"
                  value={value}
                  onChange={onChange}
                  min={1}
                  step={1}
                />
              )}
            />
          )}
        </div>

        <LabelErrorWrapper>
          <div className="col-span-full flex items-center gap-3.5">
            <Switch
              id={`volumes.${index}.addShipment`}
              color={"success"}
              checked={addShipment}
              onCheckedChange={(checked) =>
                setValue(`volumes.${index}.addShipment`, checked)
              }
            />
            <Label
              htmlFor={`volumes.${index}.addShipment`}
              className="!mb-0 shrink-0"
            >
              Add Shipment
            </Label>
          </div>
        </LabelErrorWrapper>

        {!!addShipment && soldBy === "VOLUME" && (
          <div className="grid w-full gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name={`volumes.${index}.openingStock`}
              render={({ field: { onChange, value } }) => (
                <InputCounter
                  label="Stock"
                  required
                  error={
                    (
                      errors as FieldErrors<
                        Omit<TVolumeItem, "volumes"> & {
                          volumes: TVolumeWithShipmentVolume[];
                        }
                      >
                    )?.volumes?.[index]?.openingStock?.message
                  }
                  value={value}
                  onChange={onChange}
                  step={1}
                  allowDecimal={false}
                />
              )}
            />

            <NumberInput
              label="Price"
              required
              min={1}
              className="bg-default"
              onChange={(value) => {
                setValue(`volumes.${index}.pricePerUnit`, Number(value));
              }}
              error={
                (
                  errors as FieldErrors<
                    Omit<TVolumeItem, "volumes"> & {
                      volumes: TVolumeWithShipmentVolume[];
                    }
                  >
                )?.volumes?.[index]?.pricePerUnit?.message
              }
            />
          </div>
        )}

        {!!addShipment && soldBy === "UNIT" && (
          <div className="grid w-full gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name={`volumes.${index}.casesReceived`}
              render={({ field: { onChange, value } }) => (
                <InputCounter
                  label="Cases received"
                  required
                  error={
                    (
                      errors as FieldErrors<
                        Omit<TUnitItem, "volumes"> & {
                          volumes: TUnitWithShipmentVolume[];
                        }
                      >
                    )?.volumes?.[index]?.casesReceived?.message
                  }
                  value={value}
                  onChange={onChange}
                  min={0}
                  className="number-input-no-spinner bg-default"
                  step={1}
                />
              )}
            />

            <NumberInput
              label="Price per Case"
              required
              value={pricePerCase}
              onChange={(value) => {
                setValue(`volumes.${index}.pricePerCase`, Number(value));
              }}
              min={0}
              className="number-input-no-spinner bg-default"
              error={
                (
                  errors as FieldErrors<
                    Omit<TUnitItem, "volumes"> & {
                      volumes: TUnitWithShipmentVolume[];
                    }
                  >
                )?.volumes?.[index]?.pricePerCase?.message
              }
            />
          </div>
        )}
      </div>

      <div className="hidden md:block">
        {!!fields?.length && (
          <Button
            onClick={() => remove(index)}
            type="button"
            color="secondary"
            size="44"
            className="shrink-0"
          >
            <CrossIcon className="size-5 text-[#F97066]" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default VolumeCreateRow;
