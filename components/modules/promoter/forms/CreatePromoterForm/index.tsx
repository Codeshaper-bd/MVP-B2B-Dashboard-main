"use client";
import { FormProvider } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import { cn } from "@/lib/utils";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Separator } from "@/components/ui/separator";

import AssignEventSelect from "./AssignEventSelect";
import GuestListPermission from "./GuestListPermission";
import { usePromoterForm } from "./usePromoterForm";
import PromoterAvatar from "../PromoterAvatar";

function CreatePromoterForm() {
  const {
    methods,
    onSubmit,
    watchValues: { promoter, isSubmitted, status },
    handleCancel,
    isLoading,
  } = usePromoterForm();
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const isNewPromoter = status === "new" || status === "exist";

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          {status === "exist" ||
            (status === "existInOrganization" && (
              <PromoterAvatar promoter={promoter} />
            ))}
          <LabelErrorWrapper
            label="Phone Number"
            error={errors?.phoneNumber?.message}
            errorClassName={cn({
              "text-[#47CD89]": isSubmitted && !!promoter?.id,
              "text-[#D38200]": isSubmitted && !promoter?.id,
            })}
          >
            <PhoneInput
              onChange={(value) => {
                setValue("phoneNumber", value);
              }}
              value={watch("phoneNumber")}
              country={"ca"}
              placeholder="Your Phone Number"
              disabled={isSubmitted}
            />
          </LabelErrorWrapper>

          {isSubmitted && isNewPromoter && (
            <>
              <div className="py-4">
                <Separator className="w-full" />
              </div>
              <AssignEventSelect />
              <div className="py-4">
                <Separator className="w-full" />
              </div>
              <GuestListPermission />
            </>
          )}
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
            disabled={isSubmitted && !isNewPromoter}
          >
            <ButtonLoadingContent
              isLoading={isLoading}
              actionContent={
                status === "exist"
                  ? "Add Promoter"
                  : "Invite to Fennec Promoter"
              }
            />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default CreatePromoterForm;
