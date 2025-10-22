"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { FormProvider } from "react-hook-form";

import type { TBaseVolume } from "@/store/api/inventory-item/inventory-item.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { CopyInput } from "@/components/copy-input";
import PlusIcon from "@/components/icons/PlusIcon";
import RenderData from "@/components/render-data";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import VolumeEditRow from "./VolumeEditRow";
import AddInventoryCategoryDialog from "../add-category-dialog";
import useCreateInventoryProductForm from "../create-inventory-form/useCreateInventoryProductForm";
import {
  inventoryTypeOptions,
  soldByTypeOptions,
} from "../create-inventory-form/utils";
import DeleteInventoryItem from "../delete-inventory-item";

export interface IEditInventoryFormProps {}

const EditInventoryForm = forwardRef<
  HTMLButtonElement,
  IEditInventoryFormProps
>((props, ref) => {
  const {
    watchValues: { media, soldBy, type, categoryId },
    getAnInventoryItemApiState,
    getAnInventoryItemData,
    methods,
    methods: {
      handleSubmit,
      control,
      setValue,
      register,
      formState: { errors, isLoading },
      watch,
    },
    onSubmit,
    volumesFieldArrayProps: { fields, append, remove },
    inventoryCategoryOptions,
    isInventoryCategoryOptionsLoading,
    setInventoryCategorySearch,
    inventoryItemSlug,
  } = useCreateInventoryProductForm({
    isEditMode: true,
  });

  return (
    <RenderData
      {...getAnInventoryItemApiState}
      data={getAnInventoryItemData}
      expectedDataType="object"
      isLoading={getAnInventoryItemApiState.isLoading}
    >
      <div>
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 pt-5">
              <div className="#md:grid-cols-1 #lg:grid-cols-2 grid gap-4 sm:grid-cols-2">
                <Input
                  type="text"
                  placeholder="Enter Product Name"
                  label="Product Name"
                  {...register("name")}
                  error={errors.name?.message}
                  required
                />

                <CopyInput
                  label="ID Product"
                  value={`${getAnInventoryItemData?.id || "N/A"}`}
                  className="sm:!pl-4"
                  disabled
                />

                <SelectInput
                  required
                  label="Inventory Category"
                  searchMode="server"
                  searchLocation="inside-dropdown"
                  onServerSearch={(searchTerm) => {
                    setInventoryCategorySearch(
                      searchTerm ? searchTerm : undefined,
                    );
                  }}
                  placeholder="Select category"
                  options={inventoryCategoryOptions}
                  value={
                    typeof categoryId === "number" && categoryId > 0
                      ? categoryId
                      : undefined
                  }
                  onChange={(value) =>
                    setValue("categoryId", Number(value?.value))
                  }
                  isLoading={!!isInventoryCategoryOptionsLoading}
                  error={errors.categoryId?.message}
                  dropDownBottomContent={<AddInventoryCategoryDialog />}
                />

                <SelectInput
                  label="Type"
                  readOnly
                  required
                  placeholder="Select type"
                  options={inventoryTypeOptions}
                  value={type}
                  onChange={(value) =>
                    value?.value ? setValue("type", value?.value) : null
                  }
                  error={errors.type?.message}
                />
              </div>

              <SelectInput
                label="Sold By"
                required
                readOnly
                placeholder="Select sold by"
                options={soldByTypeOptions}
                value={soldBy}
                onChange={(value) =>
                  value?.value ? setValue("soldBy", value?.value) : null
                }
                error={errors?.soldBy?.message}
              />

              <LabelErrorWrapper
                error={
                  errors?.volumes?.root?.message || errors?.volumes?.message
                }
                className="space-y-3"
              >
                <div className="relative !my-10 border-t border-default-100">
                  <span className="absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-default px-2 text-sm font-medium uppercase">
                    Volume & Price
                  </span>
                </div>

                {fields?.map((field, index) => (
                  <VolumeEditRow
                    key={field?.id}
                    append={append}
                    control={control}
                    errors={errors}
                    field={field}
                    fields={fields}
                    index={index}
                    soldBy={soldBy}
                    register={register}
                    setValue={setValue}
                    remove={remove}
                  />
                ))}
              </LabelErrorWrapper>

              <div className="flex items-center justify-center">
                <Button
                  onClick={() => {
                    const baseVolume: TBaseVolume & {
                      addShipment: false;
                    } = {
                      volume: 0,
                      unit: "oz",
                      productCode: "",
                      addShipment: false,
                      perLevel: 0,
                    };

                    switch (soldBy) {
                      case "UNIT":
                        append({
                          ...baseVolume,
                        });
                        break;

                      case "VOLUME":
                        append({
                          ...baseVolume,
                          netWeight: 0,
                          netWeightUnit: "g",
                        });
                        break;
                      default:
                        break;
                    }
                  }}
                  type="button"
                  color="secondary"
                >
                  <PlusIcon className="me-1 size-4" /> Add Different Volume
                  Option
                </Button>
              </div>
            </div>

            <div className="-mx-6 mt-8 border-t border-default-100 pt-7">
              <div className="flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
                <DeleteInventoryItem
                  inventoryItemSlug={inventoryItemSlug}
                  isUpdateLoading={isLoading}
                />

                <div className="flex flex-wrap gap-4">
                  <Button
                    color="secondary"
                    type="button"
                    disabled={isLoading}
                    asChild={!isLoading}
                  >
                    {!isLoading ? (
                      <Link
                        href={`/en/inventory/inventory-management/${type === "NON_ALCOHOLIC" ? "non-alcoholic" : "alcoholic"}`}
                      >
                        Cancel
                      </Link>
                    ) : (
                      "Cancel"
                    )}
                  </Button>

                  <Button type="submit" color="primary" disabled={isLoading}>
                    <ButtonLoadingContent
                      actionContent="Update"
                      isLoading={isLoading}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </RenderData>
  );
});

EditInventoryForm.displayName = "EditInventoryForm";
export default EditInventoryForm;
