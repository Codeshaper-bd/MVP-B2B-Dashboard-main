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

import { cn } from "@/lib/utils";
import type {
  TSoldBy,
  TUnitItem,
  TUnitWithShipmentVolume,
  TVolumeItem,
  TVolumeWithShipmentVolume,
} from "@/store/api/inventory-item/inventory-item.types";
import UnitTypeDropdown from "@/components/features/dropdown/unit-type-dropdown";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputCounter from "@/components/ui/InputCounter2";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/ui/NumberInput";
import { Switch } from "@/components/ui/switch";
import { TooltipComponent } from "@/components/ui/tooltip";

import type {
  TExtraVolumeApiData,
  TInventoryItemFormType,
  TUnitExtraApiData,
} from "../create-inventory-form/types";

interface IVolumeEditRowProps {
  soldBy: TSoldBy;
  index: number;
  field: FieldArrayWithId<TInventoryItemFormType, "volumes", "id">;
  fields: FieldArrayWithId<TInventoryItemFormType, "volumes", "id">[];
  register: UseFormRegister<TInventoryItemFormType>;
  setValue: UseFormSetValue<TInventoryItemFormType>;
  control: Control<TInventoryItemFormType>;
  errors: FieldErrors<TInventoryItemFormType>;
  append: UseFieldArrayAppend<TInventoryItemFormType, "volumes">;
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
  const addShipment = useWatch({
    control,
    name: `volumes.${index}.addShipment`,
  });
  const pricePerUnit = useWatch({
    control,
    name: `volumes.${index}.pricePerUnit`,
  });

  const isExistingProduct = !!field?.productId;

  const perLevel = useWatch({
    control,
    name: `volumes.${index}.perLevel`,
  });

  return (
    <div key={field.id} className="flex items-center gap-4">
      <div className="hidden md:block">
        <Button type="button" color="secondary" size="44" className="shrink-0">
          {index + 1}
        </Button>
      </div>

      {soldBy === "UNIT" && (
        <div className="w-full space-y-4 rounded-xl bg-default-50 px-4 py-5">
          <div className="flex items-center justify-between md:hidden">
            <Button
              type="button"
              color="secondary"
              size="44"
              className="shrink-0 bg-default-200 hover:bg-default-200"
            >
              {index + 1}
            </Button>

            <Button
              onClick={() => remove(index)}
              type="button"
              color="secondary"
              size="44"
              className="shrink-0 bg-default-200 hover:bg-default-200"
            >
              <CrossIcon className="size-5 text-[#F97066]" />
            </Button>
          </div>
          <div className="grid w-full gap-4 md:grid-cols-2 lg:col-span-3 xl:col-span-2">
            <Input
              label="Volume Per Unit"
              required
              type="number"
              min={0}
              step={0.01}
              isPositiveOnly
              allowDecimal
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
                    />
                  )}
                />
              }
              error={
                errors?.volumes?.[index]?.volume?.message ||
                errors?.volumes?.[index]?.unit?.message
              }
            />

            <NumberInput
              label="PAR Level"
              required
              min={1}
              className="bg-default"
              value={perLevel}
              onChange={(value) => {
                setValue(`volumes.${index}.perLevel`, Number(value));
              }}
              error={errors?.volumes?.[index]?.perLevel?.message}
            />

            <Input
              label="Product Code"
              required
              type="text"
              className="bg-default"
              containerClassName="md:col-span-full"
              placeholder="Enter product code"
              {...register(`volumes.${index}.productCode`)}
              error={errors?.volumes?.[index]?.productCode?.message}
            />
            <Controller
              control={control}
              name={`volumes.${index}.unitPerCase`}
              render={({ field: { onChange, value }, field }) => (
                <InputCounter
                  {...field}
                  label="Units Per Case"
                  required
                  min={1}
                  onChange={onChange}
                  value={value}
                  error={
                    (
                      errors as FieldErrors<
                        Omit<TUnitItem, "volumes"> & {
                          volumes: TUnitWithShipmentVolume[];
                        }
                      >
                    )?.volumes?.[index]?.unitPerCase?.message
                  }
                  disabled={isExistingProduct}
                  className="number-input-no-spinner bg-default"
                />
              )}
            />

            {!isExistingProduct && (
              <div className="col-span-full flex items-center gap-3.5">
                <div className="flex h-fit w-fit shrink-0 items-center">
                  <Switch
                    id={`volumes.${index}.addShipment`}
                    color={"success"}
                    disabled={!!field?.apiData?.addShipment}
                    checked={addShipment}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        if (field?.apiData?.addShipment) {
                          const unitApiData =
                            field?.apiData as TUnitExtraApiData["apiData"];

                          setValue(
                            `volumes.${index}.casesReceived`,
                            unitApiData?.casesReceived || 0,
                          );
                          setValue(
                            `volumes.${index}.pricePerCase`,
                            unitApiData?.pricePerCase || 0,
                          );
                        } else {
                          // setValue(`volumes.${index}.unitPerCase`, 0);
                          setValue(`volumes.${index}.casesReceived`, 0);
                          setValue(`volumes.${index}.pricePerCase`, 0);
                        }
                      }
                      setValue(`volumes.${index}.addShipment`, checked);
                    }}
                  />
                </div>

                <Label
                  htmlFor={`volumes.${index}.addShipment`}
                  className="!mb-0 flex w-fit shrink-0 items-center gap-1.5"
                >
                  Add Shipment
                  <TooltipComponent
                    content={
                      <p className="max-w-[110px] text-xs font-medium leading-[18px] text-default-700">
                        {field.apiData?.addShipment
                          ? `You can't turn off this option once it's enabled and saved.`
                          : `You can toggle this option util you save the form.`}
                      </p>
                    }
                  >
                    <InfoIcon className="size-4 text-default-1000" />
                  </TooltipComponent>
                </Label>
              </div>
            )}

            {isExistingProduct && (
              <Controller
                control={control}
                name={`volumes.${index}.currentStockInCases`}
                render={({ field: { onChange, value }, field }) => (
                  <InputCounter
                    {...field}
                    label="Current Stock (Cases)"
                    required
                    min={0}
                    step={1}
                    onChange={onChange}
                    value={value}
                    error={
                      (
                        errors as FieldErrors<
                          Omit<TUnitItem, "volumes"> & {
                            volumes: TUnitWithShipmentVolume[];
                          }
                        >
                      )?.volumes?.[index]?.currentStockInCases?.message
                    }
                    className="number-input-no-spinner bg-default"
                  />
                )}
              />
            )}
          </div>
          {!!addShipment && (
            <div
              className={cn("grid grid-cols-1 gap-4", {
                "lg:grid-cols-2": !isExistingProduct,
              })}
            >
              {!isExistingProduct && (
                <Controller
                  control={control}
                  name={`volumes.${index}.casesReceived`}
                  render={({ field: { onChange, value }, field }) => (
                    <InputCounter
                      {...field}
                      label="Cases received"
                      required
                      min={0}
                      onChange={onChange}
                      value={value}
                      error={
                        (
                          errors as FieldErrors<
                            Omit<TUnitItem, "volumes"> & {
                              volumes: TUnitWithShipmentVolume[];
                            }
                          >
                        )?.volumes?.[index]?.casesReceived?.message
                      }
                      className="number-input-no-spinner bg-default"
                    />
                  )}
                />
              )}

              <Input
                label="Price per Case"
                type="number"
                className="hide-input-type-number-arrows w-full bg-default"
                isPositiveOnly
                min={0}
                {...register(`volumes.${index}.pricePerCase`)}
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
                        volumes: TUnitWithShipmentVolume[];
                      }
                    >
                  )?.volumes?.[index]?.pricePerCase?.message
                }
                disabled={isExistingProduct}
              />
            </div>
          )}
        </div>
      )}

      {soldBy === "VOLUME" && (
        <div className="grid w-full gap-4 rounded-xl bg-default-50 px-4 py-5 sm:grid-cols-2">
          <div className="col-span-full flex items-center justify-between md:hidden">
            <Button
              type="button"
              color="secondary"
              size="44"
              className="shrink-0 bg-default-200 hover:bg-default-200"
            >
              {index + 1}
            </Button>

            <Button
              onClick={() => remove(index)}
              type="button"
              color="secondary"
              size="44"
              className="shrink-0 bg-default-200 hover:bg-default-200"
            >
              <CrossIcon className="size-5 text-[#F97066]" />
            </Button>
          </div>

          <Input
            label="Volume"
            required
            type="number"
            min={0}
            isPositiveOnly
            allowDecimal
            step={0.01}
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
                  />
                )}
              />
            }
            error={
              errors?.volumes?.[index]?.volume?.message ||
              errors?.volumes?.[index]?.unit?.message
            }
          />

          <Input
            label="Net Weight of Bottle"
            required
            type="number"
            min={0}
            isPositiveOnly
            allowDecimal
            step={0.01}
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
                  />
                )}
              />
            }
            error={
              errors?.volumes?.[index]?.netWeight?.message ||
              errors?.volumes?.[index]?.netWeightUnit?.message
            }
          />

          <Input
            label="Product Code"
            required
            type="text"
            className="bg-default"
            placeholder="Enter product code"
            {...register(`volumes.${index}.productCode`)}
            error={errors?.volumes?.[index]?.productCode?.message}
          />

          <NumberInput
            label="PAR Level"
            className="bg-default"
            min={1}
            onChange={(value) => {
              setValue(`volumes.${index}.perLevel`, Number(value));
            }}
            value={field?.perLevel}
            error={
              errors?.volumes?.[index]?.perLevel?.message ||
              errors?.volumes?.[index]?.perLevel?.root?.message
            }
          />

          {!isExistingProduct && (
            <>
              <div className="col-span-full flex items-center gap-3.5">
                <div className="flex h-fit w-fit shrink-0 items-center">
                  <Switch
                    id={`volumes.${index}.addShipment`}
                    color={"success"}
                    disabled={!!field?.apiData?.addShipment}
                    checked={addShipment}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        if (field?.apiData?.addShipment) {
                          const volumeApiData =
                            field?.apiData as TExtraVolumeApiData["apiData"];
                          setValue(
                            `volumes.${index}.openingStock`,
                            volumeApiData?.openingStock || 0,
                          );
                          setValue(
                            `volumes.${index}.currentStock`,
                            volumeApiData?.currentStock || 0,
                          );
                          setValue(
                            `volumes.${index}.pricePerUnit`,
                            volumeApiData?.pricePerUnit || 0,
                          );
                        } else {
                          setValue(`volumes.${index}.openingStock`, 0);
                          setValue(`volumes.${index}.currentStock`, 0);
                          setValue(`volumes.${index}.pricePerUnit`, 0);
                        }
                      }
                      setValue(`volumes.${index}.addShipment`, checked);
                    }}
                  />
                </div>

                <Label
                  htmlFor={`volumes.${index}.addShipment`}
                  className="!mb-0 flex w-fit shrink-0 items-center gap-1.5"
                >
                  Add Shipment
                  <TooltipComponent
                    content={
                      <p className="max-w-[110px] text-xs font-medium leading-[18px] text-default-700">
                        {field.apiData?.addShipment
                          ? `You can't turn off this option once it's enabled and saved.`
                          : `You can toggle this option util you save the form.`}
                      </p>
                    }
                  >
                    <InfoIcon className="size-4 text-default-1000" />
                  </TooltipComponent>
                </Label>
              </div>
              {addShipment && (
                <div className="col-span-full grid items-center gap-4 md:grid-cols-2">
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
                        onChange={onChange}
                        value={value}
                        error={
                          (
                            errors as FieldErrors<
                              Omit<TVolumeItem, "volumes"> & {
                                volumes: TVolumeWithShipmentVolume[];
                              }
                            >
                          )?.volumes?.[index]?.currentStock?.message
                        }
                      />
                    )}
                  />
                  <NumberInput
                    label={
                      isExistingProduct ? "Average Price" : "Price per Unit"
                    }
                    className="hide-input-type-number-arrows bg-default"
                    isPositiveOnly
                    min={0}
                    step={1}
                    value={pricePerUnit}
                    onChange={(value) => {
                      setValue(`volumes.${index}.pricePerUnit`, Number(value));
                    }}
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
                    disabled={isExistingProduct}
                  />
                </div>
              )}
            </>
          )}
          {isExistingProduct && (
            <div className="col-span-full grid items-center gap-4 md:grid-cols-2">
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
                    onChange={onChange}
                    value={value}
                    error={
                      (
                        errors as FieldErrors<
                          Omit<TVolumeItem, "volumes"> & {
                            volumes: TVolumeWithShipmentVolume[];
                          }
                        >
                      )?.volumes?.[index]?.currentStock?.message
                    }
                  />
                )}
              />
              <NumberInput
                label={isExistingProduct ? "Average Price" : "Price per Unit"}
                className="hide-input-type-number-arrows bg-default"
                isPositiveOnly
                min={0}
                step={1}
                value={pricePerUnit}
                onChange={(value) => {
                  setValue(`volumes.${index}.pricePerUnit`, Number(value));
                }}
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
                disabled={isExistingProduct}
              />
            </div>
          )}
        </div>
      )}

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

export default memo(VolumeEditRow);
