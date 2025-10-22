"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import FilterContent from "@/components/filter-content";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectReact } from "@/components/ui/select-react";

interface IOptionType {
  value: string;
  label: string;
}

const genders: IOptionType[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const lastPurchaseDate: IOptionType[] = [
  { value: "24hours", label: "24 hours" },
  { value: "7days", label: "Last 7 days" },
  { value: "30days", label: "Last 30 days" },
  { value: "custom", label: "Custom" },
];
function Filters() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen(!open);

  const { handleSubmit, control } = useForm<IOptionType>({});

  const onSubmit = (data: IOptionType) => {
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
          size="lg"
          className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
        >
          <FilterIcon className="me-2 h-4 w-4" />
          Filter
        </Button>
      }
      className="left-0 min-w-[320px] lg:left-auto"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="gender">Gender</Label>
          <SelectReact name="gender" options={genders} isMulti />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastPurchase">Last Purchase</Label>
          <SelectReact name="lastPurchase" options={lastPurchaseDate} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth size="lg" color="secondary">
            Cancel
          </Button>

          <Button fullWidth color="primary" size="lg" type="submit">
            <ButtonLoadingContent isLoading={false} actionContent="Apply" />
          </Button>
        </div>
      </form>
    </FilterContent>
  );
}

export default Filters;
