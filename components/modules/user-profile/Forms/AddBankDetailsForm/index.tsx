"use client";

import { Controller } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { CategoryCard } from "@/components/category-card";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import MailIcon from "@/components/icons/MailIcon";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountrySelect from "@/components/ui/CountrySelect";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useCreateBankDetails from "./useCreateBankDetails";

interface IAddPaymentMethodFormProps {
  handleBackToPaymentMethod?: () => void;
  isEdit?: boolean;
  bankDetailsId?: number;
}

type TOption = {
  value?: string;
  label?: React.ReactNode;
};

function AddBankDetailsForm({
  handleBackToPaymentMethod,
  isEdit,
  bankDetailsId,
}: IAddPaymentMethodFormProps) {
  const {
    formProps,
    onSubmit,
    isLoading: isSubmitting,
    getABankDetailsApiState,
    getABankDetailsData,
  } = useCreateBankDetails({
    handleBackToPaymentMethod,
    isEdit,
    bankDetailsId,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = formProps;

  const formComponent = (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex-1">
              <CardTitle className="mb-1 font-semibold">
                {isEdit ? "Update" : "Add"} Bank Account
              </CardTitle>
              <p className="text-sm text-default-600">
                Direct Deposit Information for Event Payouts
              </p>
            </div>
            <Button
              color="secondary"
              className="gap-2"
              type="button"
              onClick={handleBackToPaymentMethod}
              disabled={isSubmitting}
            >
              <LeftArrowIcon className="size-3" />
              Back
            </Button>
          </div>
        </CardHeader>

        <div className="ms-6 border border-default-100" />
        <CardContent>
          <div className="divide-y divide-default-100">
            {/* Account details */}
            <CategoryCard title="Account details">
              <div className="w-full space-y-4 md:max-w-lg">
                <div className="grid w-full grid-cols-[7fr,3fr] gap-4">
                  <Input
                    label="Account Number"
                    placeholder="Input Account Number"
                    type="number"
                    isPositiveOnly
                    {...register("bankAccountNumber")}
                    error={errors?.bankAccountNumber?.message}
                  />
                </div>
                <div className="grid w-full grid-cols-[7fr,3fr] gap-4 md:max-w-lg">
                  <Input
                    label="Transit Number"
                    placeholder="Input Transit Number"
                    type="number"
                    isPositiveOnly
                    {...register("transitNumber")}
                    error={errors?.transitNumber?.message}
                  />

                  <Input
                    label="Institution Number"
                    placeholder="..."
                    type="number"
                    isPositiveOnly
                    {...register("institutionNumber")}
                    error={errors?.institutionNumber?.message}
                  />
                </div>
              </div>
            </CategoryCard>

            <CategoryCard
              title="Email address"
              desc="Invoices will be sent to this email address."
            >
              <Input
                label={"Email address"}
                placeholder="Input your email"
                type="email"
                {...register("email")}
                leftContent={
                  <MailIcon className="h-3.5 w-[17px] text-default-600" />
                }
                className="pr-12"
                error={errors?.email?.message}
              />
            </CategoryCard>

            <div className="mb-5 w-full space-y-4">
              <h2 className="mt-5 text-sm font-semibold text-default-700">
                Other Information
              </h2>
              <Input
                placeholder="Name on Bank Account"
                type="text"
                {...register("bankName")}
                error={errors?.bankName?.message}
              />

              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <CountrySelect
                      value={
                        field.value
                          ? { value: field.value, label: field.value }
                          : null
                      }
                      onChange={(newValue) => {
                        const option = newValue as TOption | null;
                        field.onChange(option?.value ?? "");
                      }}
                      onBlur={field.onBlur}
                      error={errors?.country?.message}
                    />
                  )}
                />

                <Input
                  placeholder="Province"
                  type="text"
                  {...register("province")}
                  error={errors?.province?.message}
                />
              </div>
              <Input
                placeholder="Postal Code"
                type="number"
                isPositiveOnly
                {...register("postalCode")}
                error={errors?.postalCode?.message}
              />
            </div>
          </div>

          <Separator />

          <div className="my-4 flex w-full items-center justify-end gap-3">
            <Button
              type="button"
              color="secondary"
              onClick={handleBackToPaymentMethod}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" color="primary" disabled={isSubmitting}>
              <ButtonLoadingContent
                isLoading={isSubmitting}
                actionContent={isEdit ? "Update" : "Submit"}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
  if (isEdit) {
    return (
      <RenderData
        expectedDataType="object"
        data={getABankDetailsData}
        {...getABankDetailsApiState}
      >
        {formComponent}
      </RenderData>
    );
  }

  return formComponent;
}

export default AddBankDetailsForm;
