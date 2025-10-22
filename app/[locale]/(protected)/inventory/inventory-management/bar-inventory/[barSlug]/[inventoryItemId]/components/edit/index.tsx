"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { FormProvider } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import RenderData from "@/components/render-data";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import { inventoryTypeOptions, soldByTypeOptions } from "./utils";
import VolumeEditRow from "./VolumeEditRow";
import AddInventoryCategoryDialog from "../../../../../[inventoryType]/update-inventory/components/inventory-form/forms/add-category-dialog";
import DeleteInventoryItem from "../delete-inventory-item";
import useEditBarInventoryForm from "./useEditBarInventoryForm";
import DeleteEquivalentInventoryItem from "../delete-equivalent-inventory-item";

export interface IEditBarInventoryFormProps {}

const EditBarInventoryForm = forwardRef<
  HTMLButtonElement,
  IEditBarInventoryFormProps
>((props, ref) => {
  const {
    watchValues: { media, soldBy, type, categoryId },
    getBarInventoryItemApiState,
    getBarInventoryItemData,
    editBarInventoryFormProps,
    editBarInventoryFormProps: {
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
    params,
  } = useEditBarInventoryForm({
    isEditMode: true,
  });

  return (
    <RenderData
      {...getBarInventoryItemApiState}
      data={getBarInventoryItemData}
      expectedDataType="object"
      isLoading={getBarInventoryItemApiState.isLoading}
    >
      <div>
        <FormProvider {...editBarInventoryFormProps}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 pt-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  containerClassName="col-span-full"
                  type="text"
                  placeholder="Product Name"
                  label="Product Name"
                  {...register("name")}
                  error={errors.name?.message}
                  required
                />

                <SelectInput
                  required
                  label="Category"
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
                  dropDownBottomContent={
                    <AddInventoryCategoryDialog categoryType={type} />
                  }
                  disabled
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
                    Volume Variant
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
            </div>

            <div className="-mx-6 mt-8 border-t border-default-100 pt-7">
              <div className="flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
                <DeleteInventoryItem
                  data={getBarInventoryItemData}
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
                        href={`/en/inventory/inventory-management/bar-inventory/${params?.barSlug || "-1"}`}
                      >
                        Cancel
                      </Link>
                    ) : (
                      "Cancel"
                    )}
                  </Button>

                  {fields?.length ? (
                    <Button type="submit" color="primary" disabled={isLoading}>
                      <ButtonLoadingContent
                        actionContent="Update"
                        isLoading={isLoading}
                      />
                    </Button>
                  ) : (
                    <DeleteEquivalentInventoryItem
                      isLoading={isLoading}
                      onConfirm={control?.handleSubmit(onSubmit)}
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </RenderData>
  );
});

EditBarInventoryForm.displayName = "EditBarInventoryForm";
export default EditBarInventoryForm;
