"use client";
import { memo, useRef } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import useClickOutside from "@/hooks/use-click-outside";
import useBooleanState from "@/hooks/useBooleanState";
import FilterContent from "@/components/filter-content";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { SelectReact } from "@/components/ui/select-react";

interface IOptionType {
  value: string;
  label: string;
}

export const stockRange: IOptionType[] = [
  { value: "100", label: "1-100" },
  { value: "200", label: "< 200" },
  { value: "500", label: "< 500" },
  { value: "1000", label: "> 1000" },
];
export const priceRange: IOptionType[] = [
  { value: "10", label: "< $10" },
  { value: "20", label: "< $20" },
  { value: "50", label: "< $50" },
  { value: "100", label: "< $100" },
  { value: "100", label: "> $100" },
];
export const category: IOptionType[] = [
  {
    value: "BOTTLE_CANNED",
    label: "Bottled & Canned Goods",
  },
  {
    value: "HARD_LIQUOR",
    label: "Hard Liquor",
  },
];

interface IFormValues {
  packageType: string;
  priceRange: string;
  stockRange: string;
}

function Filters() {
  const { state: open, toggle, setClose } = useBooleanState();
  const filterRef = useRef<HTMLDivElement | null>(null);

  const { handleSubmit, control, register } = useForm<IFormValues>({
    defaultValues: {
      packageType: "",
      priceRange: "",
      stockRange: "",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    setClose()();
  };

  useClickOutside({ ref: filterRef, callback: setClose() });

  return (
    <FilterContent
      open={open}
      onClose={setClose()}
      triggerContent={
        <Button
          color={open ? "primary" : "secondary"}
          onClick={toggle()}
          size="lg"
          className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
        >
          <FilterIcon className="me-2 h-4 w-4" />
          Filters
        </Button>
      }
      className="left-0 min-w-[320px] lg:left-auto"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <LabelErrorWrapper label="Stock" className="relative">
          <Controller
            control={control}
            name="stockRange"
            render={({ field }) => (
              <SelectReact
                // name="stock"
                options={stockRange}
                placeholder="Select stock range"
                {...field}
              />
            )}
          />
        </LabelErrorWrapper>
        <LabelErrorWrapper label="Category" className="relative">
          <SelectReact
            placeholder="Select Category"
            name="category"
            options={category}
          />
        </LabelErrorWrapper>
        <LabelErrorWrapper label="Price" className="relative">
          <SelectReact
            name="price"
            options={priceRange}
            placeholder="Select price range"
          />
        </LabelErrorWrapper>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth size="lg" color="secondary">
            Cancel
          </Button>

          <Button fullWidth color="primary" size="lg" type="submit">
            Apply
          </Button>
        </div>
      </form>
    </FilterContent>
  );
}

export default memo(Filters);
