"use client";

import { forwardRef } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  TCreateAlcoholicInventoryCategoryArgs,
  TInventoryCategoryUnits,
} from "@/store/api/inventory-category/inventory-category.types";
import FileInputButton from "@/components/form/file-input-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IAddInventoryCategoryProps } from "./types";
import useAddInventoryCategoryForm from "./useAddInventoryCategoryForm";

const AddInventoryCategoryForm = forwardRef<
  HTMLButtonElement,
  IAddInventoryCategoryProps
>((props, ref) => {
  const {
    addOrEditInventoryCategoryFormProps,
    handleOnSubmit,
    handleSubmitAssistProps,
    watchValues: { categoryType, unit },
  } = useAddInventoryCategoryForm(props);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = addOrEditInventoryCategoryFormProps;

  return (
    <form noValidate>
      <div className="flex w-full gap-x-6 gap-y-2">
        <div className="mt-2">
          <FileInputButton
            value={watch("image")}
            onChange={(value) => {
              if (
                value === null ||
                value === undefined ||
                (value instanceof File && !Array.isArray(value))
              ) {
                setValue("image", value);
              }
            }}
            error={errors.image?.message || errors?.image?.root?.message}
          />
        </div>

        <div className="w-full flex-1">
          <Input
            label="Category Name"
            id="name"
            type="text"
            size="md"
            placeholder="Enter Name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
      </div>

      {categoryType === "ALCOHOLIC" && (
        <div className="mt-4">
          <Input
            {...(
              register as unknown as UseFormRegister<TCreateAlcoholicInventoryCategoryArgs>
            )("density")}
            label="Density"
            id="density"
            type="number"
            size="md"
            placeholder="Enter Density"
            className="number-input-no-spinner"
            isPositiveOnly
            allowDecimal
            error={
              (errors as FieldErrors<TCreateAlcoholicInventoryCategoryArgs>)
                ?.density?.message
            }
            rightContent={
              <Select
                value={unit}
                onValueChange={(value) => {
                  setValue("unit", value as TInventoryCategoryUnits);
                }}
              >
                <SelectTrigger className="!border-0 !px-1 focus:ring-0 data-[state=open]:ring-0">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>

                <SelectContent align="end">
                  <SelectItem value={"G_PER_ML"}>g/ml</SelectItem>
                  <SelectItem value={"G_PER_OZ"}>g/oz</SelectItem>
                </SelectContent>
              </Select>
            }
          />
        </div>
      )}

      <button
        type="button"
        hidden
        ref={ref}
        onClick={handleSubmit(handleOnSubmit(handleSubmitAssistProps))}
      />
    </form>
  );
});

AddInventoryCategoryForm.displayName = "AddInventoryCategoryForm";

export default AddInventoryCategoryForm;
