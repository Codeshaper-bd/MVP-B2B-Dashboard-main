"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { CopyInput } from "@/components/copy-input";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import SquarePenIcon from "@/components/icons/SquarePenIcon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import validationSchema from "./form-validation";
import type { IFormInput, IOptionType } from "./types";

const genderTypes: IOptionType[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

function PersonalDetailsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phoneNumber: "",
      customerId: "",
      gender: "male",
      address: "",
      dateOfBirth: new Date(),
    },
  });

  const dateOfBirth = watch("dateOfBirth");
  const onSubmit = (data: IFormInput) => {};

  return (
    <div>
      <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          size="sm"
          placeholder="Name"
          label="Customer Name"
          {...register("customerName")}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Input
            type="email"
            size="sm"
            placeholder="albertneilsen@gmail.com"
            label="Email Address"
            {...register("email")}
          />
          <Input
            type="text"
            size="sm"
            placeholder="Phone number"
            label="Phone number"
            {...register("phoneNumber")}
          />
        </div>
        <CopyInput
          className="ps-3"
          size="sm"
          label="Customer ID"
          defaultValue="123456"
          {...register("customerId")}
        />
        <LabelErrorWrapper label="Gender" error={errors.gender?.message}>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {genderTypes.map((genderType) => (
                  <SelectItem key={genderType.value} value={genderType.value}>
                    {genderType.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </LabelErrorWrapper>

        <Textarea
          {...register("address")}
          id="address"
          placeholder="-"
          label="Address"
        />

        <LabelErrorWrapper
          label="Date of Birth"
          error={errors.dateOfBirth?.message}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                color="secondary"
                fullWidth
                className="justify-start text-default-500"
              >
                <CalenderIcon className="me-2 h-4 w-4 text-default-500" />
                {/*  {dateOfBirth ? (
                  dayjs(dateOfBirth).format("MMM D, YYYY")
                ) : (
                  <span>Pick a date</span>
                )} */}
                {dateOfBirth ? (
                  convertUTCToLocal({
                    utcDateTime: dateOfBirth.toUTCString(),
                    format: "MMM D, YYYY",
                  })
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                    }}
                    initialFocus
                  />
                )}
              />
            </PopoverContent>
          </Popover>
        </LabelErrorWrapper>

        <div className="flex justify-end">
          <Button type="submit" color="primary">
            <SquarePenIcon className="me-1 size-5" /> Edit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailsForm;
