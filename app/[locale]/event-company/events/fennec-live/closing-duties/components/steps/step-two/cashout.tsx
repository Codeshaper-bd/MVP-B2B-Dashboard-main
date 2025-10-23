"use client";
import { Fragment, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { DollarIcon as DollarIcon } from "@/components/icons";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { MinusIcon as MinusIcon } from "@/components/icons";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  categoryOption: Array<{
    value: string;
    label: string;
  }>;
  employeeOption: Array<{
    value: string;
    label: string;
  }>;
};

function Cashout({ categoryOption, employeeOption }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [categoryState, setCategoryState] = useState<string | null>();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <Fragment>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6 shadow-none">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-5"
          >
            <div className="flex items-center justify-between space-x-4">
              <CardTitle className="text-[16px] font-semibold leading-7 text-default-900">
                Cashout
              </CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? (
                    <MinusIcon className="size-4" />
                  ) : (
                    <PlusIcon className="size-4" />
                  )}
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Select
                    value={categoryState ?? undefined}
                    onValueChange={setCategoryState}
                  >
                    <SelectGroup>
                      <SelectLabel className="!px-0">Category</SelectLabel>
                    </SelectGroup>

                    <SelectTrigger className="w-full bg-default">
                      <SelectValue
                        placeholder="Select category"
                        className="text-[#85888E]"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-default">
                      {employeeOption.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={categoryState ?? undefined}
                    onValueChange={setCategoryState}
                  >
                    <SelectGroup>
                      <SelectLabel className="!px-0">Name</SelectLabel>
                    </SelectGroup>

                    <SelectTrigger className="w-full bg-default">
                      <SelectValue
                        placeholder="Select employe"
                        className="text-[#85888E]"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-default">
                      {categoryOption.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="amount">Cashout Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  min={0}
                  step={1}
                  isPositiveOnly
                  placeholder="Amount"
                  leftContent={<DollarIcon className="size-5" />}
                  {...register("amount")}
                />
              </div>

              <div className="flex items-center justify-end gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-5 cursor-pointer text-default-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <TooltipArrow className="w-4 fill-default" />
                      <p>Cashout infos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button color="primary" type="submit">
                  <ButtonLoadingContent
                    isLoading={isSubmitting}
                    actionContent="Submit"
                  />
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </form>
    </Fragment>
  );
}

export default Cashout;
