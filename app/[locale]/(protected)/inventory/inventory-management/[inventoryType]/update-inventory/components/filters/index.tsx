"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import FilterContent from "@/components/filter-content";
import FilterLinesIcon from "@/components/icons/FilterLinesIcon";
import { type IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { SelectReact } from "@/components/ui/select-react";

interface IOptionType {
  value: string;
  label: string;
}
interface IFormInputs {
  category?: string;
}
const categoryOptions: IOptionType[] = [
  { value: "wine", label: "Wine" },
  { value: "cocktail", label: "Cocktail" },
  { value: "vodka", label: "Vodka" },
  { value: "shots", label: "Shots" },
  { value: "tequila", label: "Tequila" },
  { value: "mojito", label: "Mojito" },
];
function Filters() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen(!open);
  const { handleSubmit, control, setValue } = useForm<IFormInputs>({
    defaultValues: {
      category: "",
    },
  });
  const onSubmit = (data: IFormInputs) => {
    toggleOpen();
  };

  return (
    <FilterContent
      open={open}
      onClose={toggleOpen}
      triggerContent={
        <Button
          color={open ? "primary" : "secondary"}
          onClick={toggleOpen}
          className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
        >
          <FilterLinesIcon className="me-2 h-4 w-4" />
          Filters
        </Button>
      }
      className="left-0 min-w-[320px] lg:left-auto"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <LabelErrorWrapper label="Event" className="relative">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectReact
                {...field}
                value={categoryOptions.find((c) => c.value === field.value)}
                placeholder="Select category"
                options={categoryOptions}
                onChange={(val) => field.onChange((val as IOption)?.value)}
              />
            )}
          />
        </LabelErrorWrapper>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth color="secondary">
            Cancel
          </Button>

          <Button fullWidth color="primary" type="submit">
            Apply
          </Button>
        </div>
      </form>
    </FilterContent>
  );
}

export default Filters;
