"use client";

import { memo } from "react";
import { Controller, FormProvider } from "react-hook-form";

import CreateChallengeModal from "@/app/[locale]/(protected)/dashboard/challenges/components/Modals/CreateChallengeModal";
import useBooleanState from "@/hooks/useBooleanState";
import { cn } from "@/lib/utils";
import BackButton from "@/components/Buttons/back-button";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import UnitTypeDropdown from "@/components/features/dropdown/unit-type-dropdown";
import DiscountIcon from "@/components/icons/DiscountIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import QuestionIcon from "@/components/icons/QuestionIcon";
import StopIcon from "@/components/icons/StopIcon";
import CreateDiscountDialog from "@/components/modules/discount/modals/create-discount-dialog";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import { Textarea } from "@/components/ui/textarea";

import FormChallengeList from "./form-challenge-list";
import FormDiscountList from "./form-discount-list";
import LinkToInventory from "./link-inventory";
import MediaUpload from "./media-upload";
import type {
  ICreateProductFormProps,
  TChallengeFormState,
  TDiscountFormState,
} from "./types";
import useCreateProductForm from "./useCreateProductForm";
import { productTypeOptions } from "./utils";
import ChangeSalesStatusDialog from "../../[productSlug]/change-sales-status-dialog";
import DeleteBarMenuProductDialog from "../../[productSlug]/delete-bar-menu-product-dialog";

function CreateProductForm(props: ICreateProductFormProps) {
  const { isEditMode, productSlug, isFullWidth } = props;
  const {
    formProps: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
      control,
    },
    formProps,
    watchValues: { type, isSaleable, challenges, discounts },
    onSubmit,
    onSubmitAssistProps,
    getAllChallengeApiState,
    getAllDiscountApiState,
  } = useCreateProductForm(props);
  const {
    state: isSalesStatusChangeAlertOpen,
    setOpen: setIsStatusChangeAlertOpen,
    setClose: setIsStatusChangeAlertClose,
  } = useBooleanState();

  return (
    <FormProvider {...formProps}>
      <div className={cn(isFullWidth ? "flex-1" : "mx-auto max-w-[800px]")}>
        <form
          className="space-y-9"
          onSubmit={handleSubmit(onSubmit(onSubmitAssistProps))}
          noValidate
        >
          <Card className="p-6 shadow-none">
            <CardContent className="p-0">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-default-900">
                  Add Product
                </h3>

                <p className="text-sm text-default-600">
                  Please provide the required information to complete this form.
                </p>

                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="Name"
                      required
                      type="text"
                      placeholder="Enter Name"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                    <NumberInput
                      label="Price"
                      required
                      allowDecimal
                      value={watch("price")}
                      onChange={(value) => {
                        setValue("price", Number(value));
                      }}
                      leftContent={<DollarIcon className="size-3" />}
                      min={0}
                      placeholder="Enter Price"
                      error={errors.price?.message}
                    />
                  </div>

                  <Input
                    type="text"
                    label="Product Sub-Title"
                    placeholder="Enter Sub-Title"
                    {...register("subTitle")}
                    error={errors.subTitle?.message}
                  />

                  <Input
                    {...register("volume")}
                    className="number-input-no-spinner"
                    type="number"
                    min={0}
                    step={1}
                    isPositiveOnly
                    label="Product Size"
                    placeholder="Enter Product Size"
                    rightContent={
                      <Controller
                        control={control}
                        name="unit"
                        defaultValue="oz"
                        render={({ field: { onChange, value } }) => (
                          <UnitTypeDropdown
                            value={value}
                            onChange={onChange}
                            hideOption={["g"]}
                          />
                        )}
                      />
                    }
                    error={errors.volume?.message || errors.unit?.message}
                  />

                  <SelectInput
                    label="Product Type"
                    placeholder="Select product Type"
                    options={productTypeOptions}
                    value={type}
                    onChange={(value) => {
                      setValue("type", value?.value);
                      setValue("ingredients", []);
                    }}
                    error={errors?.type?.message || errors?.type?.root?.message}
                  />

                  <LabelErrorWrapper
                    label={
                      <>
                        Link To Inventory <QuestionIcon className="size-4" />
                      </>
                    }
                    labelClassName="flex items-center gap-1"
                    htmlFor="inventory"
                    error={
                      (errors.alcoholicIngredientCheck?.message as string) ||
                      errors.ingredients?.message ||
                      errors.ingredients?.root?.message ||
                      errors?.ingredients
                        ?.map?.(
                          (item) =>
                            item?.usageQuantity?.message ||
                            item?.usageUnit?.message ||
                            item?._id?.message ||
                            item?._id?.root?.message ||
                            item?.message ||
                            item?.root?.message ||
                            item?.ingredientId?.message,
                        )
                        .join(", ")
                    }
                  >
                    <div className="space-y-2">
                      <LinkToInventory
                        type={
                          type === "NON_ALCOHOLIC" ? "NON_ALCOHOLIC" : undefined
                        }
                      />
                    </div>
                  </LabelErrorWrapper>

                  <LabelErrorWrapper error={errors.media?.message}>
                    <MediaUpload />
                  </LabelErrorWrapper>

                  <Textarea
                    {...register("description")}
                    label="Description"
                    placeholder="Enter description"
                    className="min-h-[130px]"
                    error={errors.description?.message}
                  />

                  <FormDiscountList
                    discounts={discounts}
                    setValue={setValue}
                    formErrors={errors}
                    isEditMode={isEditMode}
                    discountsApiState={getAllDiscountApiState}
                  />

                  <FormChallengeList
                    challenges={challenges}
                    setValue={setValue}
                    formErrors={errors}
                    isEditMode={isEditMode}
                    challengesApiState={getAllChallengeApiState}
                  />

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    <Button
                      className="rounded-[8px]"
                      color={isSaleable ? "warning" : "success"}
                      type="button"
                      onClick={setIsStatusChangeAlertOpen()}
                    >
                      {isSaleable ? (
                        <StopIcon className="me-1 size-5" />
                      ) : (
                        <PlayIcon className="me-1 size-4" />
                      )}{" "}
                      Turn {isSaleable ? "off" : "on"} sales
                    </Button>

                    <CreateDiscountDialog
                      mode="local-create"
                      triggerContent={
                        <Button className="rounded-[8px]">
                          <DiscountIcon className="me-1 size-4" /> Apply
                          Discount
                        </Button>
                      }
                      onLocalCreateSuccess={(data) => {
                        const newDiscountsData: TDiscountFormState[] = [
                          ...(Array.isArray(discounts) ? discounts : []),
                          {
                            ...data,
                            mode: "create",
                            formIdentifier: crypto.randomUUID(),
                          },
                        ];
                        setValue("discounts", newDiscountsData);
                      }}
                      getAnEventData={null}
                    />

                    <CreateChallengeModal
                      triggerButton={
                        <Button className="rounded-[8px]">
                          <PlusIcon className="me-1 size-4" /> Create Challenge
                        </Button>
                      }
                      mode="local-create"
                      isProductMode
                      onLocalCreateSuccess={(data) => {
                        const newChallengeData: TChallengeFormState[] = [
                          ...(Array.isArray(challenges) ? challenges : []),
                          {
                            ...data,
                            mode: "create",
                            formIdentifier: crypto.randomUUID(),
                          },
                        ];
                        setValue("challenges", newChallengeData);
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <DeleteBarMenuProductDialog slug={productSlug} />

            <div className="flex items-center gap-3">
              <BackButton label="Cancel" isShowArrowIcon={false} />

              <Button
                className="rounded-[8px] !px-3.5 !py-2.5"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                <ButtonLoadingContent
                  isLoading={isSubmitting}
                  actionContent={isEditMode ? "Update" : "Create"}
                />
              </Button>
            </div>
          </div>
        </form>
      </div>

      <ChangeSalesStatusDialog
        isOpen={isSalesStatusChangeAlertOpen}
        isSaleable={!!isSaleable}
        setIsStatusChangeAlertClose={setIsStatusChangeAlertClose}
        setIsStatusChangeAlertOpen={setIsStatusChangeAlertOpen}
        onStatusChange={(isSaleable) => setValue("isSaleable", isSaleable)}
      />
    </FormProvider>
  );
}

export default memo(CreateProductForm);
