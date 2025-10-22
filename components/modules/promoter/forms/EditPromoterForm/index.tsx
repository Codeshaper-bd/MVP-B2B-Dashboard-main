"use client";
import { FormProvider } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Separator } from "@/components/ui/separator";

import AssignEventSelect from "./AssignEventSelect";
import GuestListPermission from "./GuestListPermission";
import { usePromoterForm } from "./usePromoterForm";
import PromoterAvatar from "../PromoterAvatar";

export interface IEditPromoterFormProps {
  userId: TIdOrSlugOrIdentifier<"id">["id"];
}

function EditPromoterForm({ userId }: IEditPromoterFormProps) {
  const {
    methods,
    onSubmit,
    watchValues: { promoter },
    handleCancel,
    isLoading,
    getAPromoterDetailsApiState,
    promoterData,
  } = usePromoterForm({ userId });
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  return (
    <RenderData
      data={promoterData}
      expectedDataType={"object"}
      {...getAPromoterDetailsApiState}
    >
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <PromoterAvatar promoter={promoter} />
            <LabelErrorWrapper
              label="Phone Number"
              error={errors?.promoter?.message}
            >
              <PhoneInput
                onChange={(value) => {
                  setValue("promoter", value);
                }}
                value={watch("promoter")}
                country={"ca"}
                placeholder="Your Phone Number"
                disabled={true}
              />
            </LabelErrorWrapper>

            <div className="py-4">
              <Separator className="w-full" />
            </div>
            <AssignEventSelect />
            <div className="py-4">
              <Separator className="w-full" />
            </div>
            <GuestListPermission />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button
              type="button"
              color="secondary"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              <ButtonLoadingContent
                isLoading={isLoading}
                actionContent="Update Promoter"
              />
            </Button>
          </div>
        </form>
      </FormProvider>
    </RenderData>
  );
}

export default EditPromoterForm;
