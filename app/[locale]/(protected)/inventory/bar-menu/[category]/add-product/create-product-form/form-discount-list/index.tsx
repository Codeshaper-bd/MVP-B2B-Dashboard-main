"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { type FieldErrors, type UseFormSetValue } from "react-hook-form";

import { discountOptions } from "@/app/[locale]/(protected)/dashboard/promotions/components/Forms/CreatePromotionForm/utils";
import useBooleanState from "@/hooks/useBooleanState";
import type { TNullish } from "@/store/api/common-api-types";
import { useDeleteADiscountMutation } from "@/store/api/discounts/discounts-api";
import EditDiscountDialog from "@/components/modules/discount/modals/edit-discount-dialog";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import DiscountCard from "../discount/discount-card";
import type { TBarMenuItemFormType, TDiscountFormState } from "../types";
import { handleDeleteDiscount, handleUpdateDiscount } from "./utils";

export interface IFormDiscountListProps {
  discounts: TDiscountFormState[] | TNullish;
  formErrors: FieldErrors<TBarMenuItemFormType>;
  setValue: UseFormSetValue<TBarMenuItemFormType>;
  isEditMode?: boolean;
  discountsApiState?: IApiStateInfo;
}

function FormDiscountList({
  discounts,
  setValue,
  formErrors,
  isEditMode,
  discountsApiState,
}: IFormDiscountListProps) {
  const {
    state: isEditModalOpen,
    setState: setEditModalState,
    setOpen: setEditModalOpen,
    setClose: setEditModalClose,
  } = useBooleanState();
  const [targetData, setTargetData] = useState<TDiscountFormState | TNullish>(
    null,
  );
  const [deleteADiscount] = useDeleteADiscountMutation();

  return (
    <LabelErrorWrapper
      label="Discounts"
      error={
        formErrors?.discounts?.message || formErrors?.discounts?.root?.message
      }
    >
      <RenderData
        isError={discountsApiState?.isError || false}
        isLoading={discountsApiState?.isLoading || false}
        isFetching={discountsApiState?.isFetching || false}
        error={discountsApiState?.error || null}
        isSuccess
        expectedDataType="array"
        data={discounts ?? []}
      >
        <div className="space-y-3">
          {discounts?.map((discount) => (
            <DiscountCard
              key={discount?.formIdentifier}
              item={{
                id: discount?.formIdentifier,
                title: discount?.name,
                // points: String(discount?.pointesEarned ?? "N/A"),
                // description: discount?.description,
                duration: "One Day",
                totalDiscount: `${discount?.amount} ${
                  discountOptions?.find(
                    (option) => option.value === discount?.discountType,
                  )?.label
                }`,
                remainingDuration: dayjs().isAfter(
                  dayjs(discount?.expirationDate),
                )
                  ? `${dayjs().diff(dayjs(discount?.expirationDate), "hours")} hours`
                  : "Expired",
              }}
              enableDiscountActions
              deleteDiscountHandler={handleDeleteDiscount({
                discount,
                discounts,
                setValue,
                deleteADiscount,
              })}
              editDiscountHandler={handleUpdateDiscount({
                discount,
                discounts,
                setValue,
                setTargetData,
                setEditModalOpen,
              })}
            />
          ))}
        </div>
      </RenderData>

      <EditDiscountDialog
        mode="local-edit"
        editItemData={targetData}
        open={isEditModalOpen}
        setOpen={setEditModalState}
        onLocalEditSuccess={(data) => {
          const updatedDiscounts = discounts?.map((discount) => {
            if (discount?.formIdentifier === targetData?.formIdentifier) {
              return { ...targetData, ...data };
            }
            return discount;
          });
          setTargetData(null);
          setEditModalClose()();
          setValue("discounts", updatedDiscounts);
        }}
        getAnEventData={null}
      />
    </LabelErrorWrapper>
  );
}

export default FormDiscountList;
