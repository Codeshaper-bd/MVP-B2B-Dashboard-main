"use client";

import { forwardRef } from "react";
import { useFieldArray } from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import SelectProduct from "@/components/features/selects/SelectProduct";
import NoProductFound from "@/components/features/selects/SelectProduct/NoProductFound";
import CrossIcon from "@/components/icons/CrossIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import { Button } from "@/components/ui/button";
import InputCounter from "@/components/ui/InputCounter2";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductInfo from "./ProductInfo";
import useShipmentForm from "./useShipmentForm";
import { soldByFilters } from "./utils";
export interface ICreateShipmentFormProps {
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateShipmentForm = forwardRef<
  HTMLButtonElement,
  ICreateShipmentFormProps
>(({ setIsSubmitting, setIsDisabled }, ref) => {
  const {
    formProps: {
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
      control,
    },
    onSubmit,
    toastHookProps,
    filterBy,
    setFilterBy,
    selectedValue,
    setSelectedValue,
    selectedChildItem,
    setSelectedChildItem,
    soldBy,
    currentStockInUnits,
    newStockInCases,
    currentStock,
    unitPerCases,
    currentStockInCases,
    newStockInUnits,
    volumeValues: { volumeNewStock },
  } = useShipmentForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shipments",
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(
        onSubmit({
          toastHookProps,
          setIsSubmitting,
          setIsDisabled,
        }),
      )}
    >
      <div className="space-y-3">
        <div className="flex w-full items-center rounded-lg border border-[#1F242F] p-1">
          {soldByFilters?.map((filter) => (
            <Button
              key={filter.value}
              variant="ghost"
              className="rounded-md text-sm font-medium text-default-700 hover:bg-transparent data-[state=active]:bg-secondary data-[state=active]:text-primary"
              onClick={() => {
                setFilterBy(filter.value);
                setSelectedValue(undefined);
                setSelectedChildItem(undefined);
                setValue("shipments", [
                  {
                    currentStock: 0,
                    unitReceived: 0,
                    casesReceived: 0,
                    unitPerCase: 0,
                    price: 0,
                  },
                ]);
              }}
              fullWidth
              data-state={filterBy === filter.value ? "active" : "inactive"}
              size="md"
              type="button"
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <SelectProduct
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          filterBy={filterBy === "All" ? undefined : filterBy}
        />
        {selectedValue === undefined ? (
          <NoProductFound />
        ) : (
          <div className="space-y-5">
            <ProductInfo
              product={selectedChildItem || selectedValue}
              isChildItem={!!selectedChildItem}
            />
            {fields?.map((field, index) => (
              <div key={field.id}>
                {soldBy === "VOLUME" && (
                  <div className="flex gap-4">
                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                      <LabelErrorWrapper label="Select Volume">
                        <Select
                          onValueChange={(value) => {
                            setSelectedChildItem(
                              selectedValue?.children?.find(
                                (item) => item.id === Number(value),
                              ),
                            );
                            setValue(
                              `shipments.${index}.selectedChildItemId`,
                              Number(value),
                            );
                            setIsDisabled?.(false);
                          }}
                          value={selectedChildItem?.id?.toString() || ""}
                          disabled={index > 0}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>

                          <SelectContent align="end">
                            {selectedValue?.children?.map((item) => (
                              <SelectItem value={`${item?.id}`} key={item?.id}>
                                {item?.volume} {item?.unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </LabelErrorWrapper>
                      <div>
                        <InputCounter
                          label="Units Received"
                          required
                          value={watch(`shipments.${index}.unitReceived`)}
                          onChange={(value) => {
                            setValue(
                              `shipments.${index}.unitReceived`,
                              Number(value),
                            );
                          }}
                          min={0}
                          step={1}
                          error={
                            errors?.shipments?.[index]?.unitReceived?.message
                          }
                          disabled={selectedChildItem === undefined}
                        />
                      </div>
                      <div>
                        <NumberInput
                          leftContent={<DollarIcon className="size-5" />}
                          label="Price per Unit"
                          value={watch(`shipments.${index}.price`)}
                          onChange={(value) => {
                            setValue(`shipments.${index}.price`, Number(value));
                          }}
                          error={errors?.shipments?.[index]?.price?.message}
                          disabled={selectedChildItem === undefined}
                        />
                      </div>
                    </div>
                    <Button
                      className="mt-8 flex-none"
                      type="button"
                      onClick={() => remove(index)}
                      color="secondary"
                      disabled={!index}
                    >
                      <CrossIcon className="size-5" />
                    </Button>
                  </div>
                )}
                {soldBy === "UNIT" && (
                  <div>
                    <div className="flex-1 space-y-4">
                      <LabelErrorWrapper label="Select Volume">
                        <Select
                          onValueChange={(value) => {
                            setSelectedChildItem(
                              selectedValue?.children?.find(
                                (item) => item.id === Number(value),
                              ),
                            );
                            setValue(
                              `shipments.${index}.selectedChildItemId`,
                              Number(value),
                            );
                            setIsDisabled?.(false);
                          }}
                          value={selectedChildItem?.id?.toString() || ""}
                          disabled={index > 0}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>

                          <SelectContent align="end">
                            {selectedValue?.children?.map((item) => (
                              <SelectItem value={`${item?.id}`} key={item?.id}>
                                {item?.volume} {item?.unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </LabelErrorWrapper>
                      <div className="flex items-center gap-3">
                        <div className="grid flex-1 grid-cols-3 gap-4">
                          <InputCounter
                            label="Cases received"
                            required
                            value={watch(`shipments.${index}.casesReceived`)}
                            onChange={(value) => {
                              setValue(
                                `shipments.${index}.casesReceived`,
                                Number(value),
                              );
                            }}
                            min={0}
                            step={1}
                            disabled={selectedChildItem === undefined}
                            error={
                              errors?.shipments?.[index]?.casesReceived?.message
                            }
                          />
                          <InputCounter
                            label="Units per Case"
                            required
                            value={unitPerCases}
                            disabled
                          />

                          <NumberInput
                            leftContent={<DollarIcon className="size-5" />}
                            label="Price per Case"
                            value={watch(`shipments.${index}.price`)}
                            onChange={(value) => {
                              setValue(
                                `shipments.${index}.price`,
                                Number(value),
                              );
                            }}
                            error={errors?.shipments?.[index]?.price?.message}
                            disabled={selectedChildItem === undefined}
                          />
                        </div>
                        <Button
                          className="mt-8 flex h-10 flex-none justify-center"
                          type="button"
                          onClick={() => remove(index)}
                          color="secondary"
                        >
                          <CrossIcon className="size-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-center">
              <Button
                type="button"
                onClick={() =>
                  append({
                    currentStock: 0,
                    unitReceived: 0,
                    casesReceived: 0,
                    unitPerCase: 0,
                    price: 0,
                  })
                }
                color="secondary"
                className={selectedChildItem ? "block" : "hidden"}
              >
                Add
              </Button>
            </div>

            {/* preview */}

            <div className="border border-dashed border-default-200"></div>
            <div className="space-y-2">
              {soldBy === "VOLUME" && (
                <>
                  <div className="flex items-center justify-between text-default-700">
                    <span>Current Stock (Per Unit)</span>
                    <span>{currentStock}</span>
                  </div>
                  <div className="flex items-center justify-between text-default-700">
                    <span>New Stock (Per Unit)</span>
                    <span>{volumeNewStock}</span>
                  </div>
                </>
              )}
              {soldBy === "UNIT" && (
                <>
                  <div className="flex items-center justify-between text-default-700">
                    <span>Current Stock in Cases</span>
                    <span>
                      {convertToNumber({
                        value: currentStockInCases,
                        digit: 2,
                        fallback: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-default-700">New Stock in Cases</span>
                    <span className="text-primary">
                      {convertToNumber({
                        value: newStockInCases,
                        digit: 2,
                        fallback: 0,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-default-700">
                      Current Stock in Units
                    </span>
                    <span className="text-default-700">
                      {convertToNumber({
                        value: currentStockInUnits,
                        digit: 2,
                        fallback: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-default-700">New Stock in Units</span>
                    <span className="text-primary">
                      {convertToNumber({
                        value: newStockInUnits,
                        digit: 2,
                        fallback: 0,
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <div className="space-y-4 px-1">
          <button type="submit" hidden ref={ref} />
        </div>
      </div>
    </form>
  );
});

CreateShipmentForm.displayName = "CreateShipmentForm";
export default CreateShipmentForm;
