"use client";

import { forwardRef } from "react";
import { FormProvider } from "react-hook-form";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import type {
  TBaseVolume,
  TInventoryItemType,
  TSoldBy,
} from "@/store/api/inventory-item/inventory-item.types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import FileInputButton from "@/components/form/file-input-button2";
import { PlusIcon as PlusIcon } from "@/components/icons";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";

import AddInventoryCategoryDialog from "../add-category-dialog";
import useCreateInventoryProductForm from "./useCreateInventoryProductForm";
import {
  volumeUnitOptions,
  netWeightUnitOptions,
  getSoldByTypeOptions,
} from "./utils";
import VolumeCreateRow from "./VolumeCreateRow";
import InventoryCategoryGuideModal from "../../../modals/InventoryCategoryGuideModal";

export interface ICreateInventoryFormProps {
  productType?: TInventoryItemType;
  productSlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateInventoryForm = forwardRef<
  HTMLButtonElement,
  ICreateInventoryFormProps
>(({ productType, productSlug, setIsLoading }, ref) => {
  const { setClose } = useDialogContext();
  const {
    methods,
    methods: {
      control,
      setValue,
      register,
      handleSubmit,
      formState: { errors, isLoading },
    },
    onSubmit,
    volumesFieldArrayProps: { append, fields, remove },
    watchValues: { media, soldBy, categoryId },
    soldByState,
    setSoldByState,
    inventoryCategoryOptions,
    isInventoryCategoryOptionsLoading,
    setInventoryCategorySearch,
  } = useCreateInventoryProductForm({
    productType,
    productSlug,
    setIsLoading,
    closeModal: setClose,
  });

  return (
    <ScrollArea className="-ml-2 -mr-6 h-[calc(100vh_-_350px)]">
      <FormProvider {...methods}>
        <form
          noValidate
          className="pb-4 pl-2 pr-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <div className="relative mb-8 mt-4 border-t border-default-100">
              <span className="absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-default px-2 text-sm font-medium">
                PRODUCT INFORMATION
              </span>
            </div>

            <FileInputButton
              label="Product Image"
              multiple
              value={media}
              onChange={(files) => {
                setValue("media", Array.isArray(files) ? files : null);
              }}
              accept="image/jpeg, image/png"
              error={
                errors?.media?.message ||
                errors?.media?.map?.((med) => med?.message)?.join(", ")
              }
              enableCropper
              cropperAspectRatio={120 / 280}
              cropperShape="rect"
              cropperWidth={120}
              cropperHeight={280}
              removeBackground={true}
            />

            <Input
              {...register("name")}
              label="Product Name"
              placeholder="Enter Product Name"
              type="text"
              error={errors?.name?.message}
              required
            />

            <SelectInput
              required
              label={
                <div className="flex w-fit items-center gap-1.5 text-inherit">
                  Inventory Category
                  <InventoryCategoryGuideModal />
                </div>
              }
              searchMode="server"
              searchLocation="inside-dropdown"
              onServerSearch={(searchTerm) => {
                setInventoryCategorySearch(searchTerm ? searchTerm : undefined);
              }}
              placeholder="Select category"
              options={inventoryCategoryOptions}
              value={
                typeof categoryId === "number" && categoryId > 0
                  ? categoryId
                  : undefined
              }
              onChange={(value) => setValue("categoryId", Number(value?.value))}
              isLoading={!!isInventoryCategoryOptionsLoading}
              error={errors?.categoryId?.message}
              dropDownBottomContent={
                <AddInventoryCategoryDialog categoryType={productType} />
              }
            />

            <SelectInput
              label="Sold By"
              required
              options={getSoldByTypeOptions(productType)}
              placeholder="Select sold by"
              value={soldBy}
              onChange={(data) => {
                if (data?.value === "UNIT") {
                  setValue("volumes", [
                    {
                      volume: 0,
                      unit: volumeUnitOptions?.[0]?.value,
                      productCode: "",
                      addShipment: false,
                    },
                  ]);
                } else if (data?.value === "VOLUME") {
                  setValue("volumes", [
                    {
                      volume: 0,
                      unit: volumeUnitOptions?.[0]?.value,
                      productCode: "",
                      netWeight: 0,
                      netWeightUnit: netWeightUnitOptions?.[0]?.value,
                      addShipment: false,
                    },
                  ]);
                }
                setSoldByState(data?.value as TSoldBy);
                setValue("soldBy", data?.value as TSoldBy);
              }}
              error={errors?.soldBy?.message || errors?.soldBy?.root?.message}
            />

            {soldBy ? (
              <>
                <LabelErrorWrapper
                  error={
                    errors?.volumes?.root?.message || errors?.volumes?.message
                  }
                >
                  <div className="relative !my-10 border-t border-default-100">
                    <span className="absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-default px-2 text-sm font-medium uppercase">
                      Volume & Price
                    </span>
                  </div>

                  <div className="space-y-3">
                    {fields?.map((field, index) => (
                      <VolumeCreateRow
                        key={field.id}
                        append={append}
                        control={control}
                        errors={errors}
                        field={field}
                        fields={fields}
                        index={index}
                        soldBy={soldBy}
                        register={register}
                        remove={remove}
                        setValue={setValue}
                      />
                    ))}
                  </div>
                </LabelErrorWrapper>

                <div className="flex items-center justify-center">
                  <Button
                    onClick={() => {
                      const baseVolume: TBaseVolume & {
                        addShipment: false;
                      } = {
                        volume: 0,
                        unit: volumeUnitOptions?.[0]?.value,
                        productCode: "",
                        netWeight: 0,
                        netWeightUnit: netWeightUnitOptions?.[0]?.value,
                        addShipment: false,
                      };

                      append(baseVolume);
                    }}
                    type="button"
                    color="secondary"
                  >
                    <PlusIcon className="me-1 size-4" /> Add Volume
                  </Button>
                </div>
              </>
            ) : null}
          </div>

          <button type="submit" hidden ref={ref} />
        </form>
      </FormProvider>
    </ScrollArea>
  );
});

CreateInventoryForm.displayName = "CreateInventoryForm";
export default CreateInventoryForm;
