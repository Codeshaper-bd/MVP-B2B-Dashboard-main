"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { ICustomerFormType } from "./types";
import validationSchema from "./validator";

interface IOptionType {
  value: string;
  label: string;
}

const genderTypes: IOptionType[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

function CustomerForm() {
  const { setClose } = useDialogContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ICustomerFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phoneNumber: "",
      gender: "male",
      address: "",
    },
  });
  const onSubmit = (data: ICustomerFormType) => {
    setClose();
  };

  return (
    <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        size="md"
        placeholder="Enter customer name"
        label="Customer Name*"
        {...register("customerName")}
        error={errors.customerName?.message}
      />
      <Input
        type="email"
        size="sm"
        placeholder="Enter email address"
        label="Email Address"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="text"
        size="sm"
        placeholder="Enter number phone"
        label="Phone number"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />
      <div className="space-y-1.5">
        <Label htmlFor="gender">Gender</Label>

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <SelectInput
              className="h-11"
              placeholder="Select gender"
              options={genderTypes}
              value={field.value}
              onChange={(value) => {
                field.onChange(value?.value);
              }}
              error={errors.gender?.message}
            />
          )}
        />
      </div>

      <Textarea
        id="address"
        className="min-h-[154px]"
        placeholder="Enter address"
        label="Address"
        {...register("address")}
        error={errors.address?.message}
      />

      <div className="grid grid-cols-2 gap-6">
        <Button type="button" onClick={setClose} size="lg">
          Cancel
        </Button>
        <Button type="submit" size="lg">
          Add Customer
        </Button>
      </div>
    </form>
  );
}

export default CustomerForm;
