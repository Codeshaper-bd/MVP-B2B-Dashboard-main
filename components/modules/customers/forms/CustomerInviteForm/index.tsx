"use client";

import { TabsContent } from "@radix-ui/react-tabs";
import { forwardRef, useState } from "react";
import PhoneInput from "react-phone-input-2";

import FileImporter from "@/components/form/file-importer";
import type { TFileImporterData } from "@/components/form/file-importer/types";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useCustomerInviteForm from "./useCustomerInviteForm";

export interface ICustomerInviteFormsProps {
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomerInviteForms = forwardRef<
  HTMLButtonElement,
  ICustomerInviteFormsProps
>(({ isSubmitting, setIsSubmitting }, ref) => {
  const [data, setData] = useState<TFileImporterData | null>(null);

  const {
    formProps: {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
    },
    onSubmit,
    toastHookProps,
  } = useCustomerInviteForm({ isSubmitting, setIsSubmitting });

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit({
          toastHookProps,
          setIsSubmitting,
        }),
      )}
      noValidate
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-default-600">
          Invite Credits Remaining: 50/100{" "}
        </p>
        <p className="text-sm text-default-600">Resets on 1st of every month</p>
      </div>
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-5 flex w-full border border-secondary">
          <TabsTrigger value="manual" className="flex-1">
            Invite Manual
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex-1" disabled>
            Upload File
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <div className="space-y-4">
            <Input
              id="name"
              label="Customer Name*"
              placeholder="Enter customer name"
              {...register("name")}
              error={errors?.name?.message}
            />
            <LabelErrorWrapper label={"Phone"} error={errors.phone?.message}>
              <PhoneInput
                country={"us"}
                value={watch("phone")}
                onChange={(value) => {
                  setValue("phone", value);
                }}
              />
            </LabelErrorWrapper>
            <Input
              id="emailAddress*"
              label="Email Address (Optional)"
              placeholder="Enter Email Address"
              {...register("email")}
              error={errors?.email?.message}
            />
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <div className="h-[250px]">
            <FileImporter data={data} setData={setData} />
          </div>
        </TabsContent>
      </Tabs>

      <button type="submit" hidden ref={ref} />
    </form>
  );
});

CustomerInviteForms.displayName = "CustomerInviteForms";
export default CustomerInviteForms;
