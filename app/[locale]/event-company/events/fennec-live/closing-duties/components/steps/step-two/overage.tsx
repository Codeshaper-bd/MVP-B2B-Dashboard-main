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
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Overage() {
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit } = useForm();
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
                Overage (OV)
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
              <div className="space-y-1.5">
                <Label htmlFor="overage">Amount</Label>
                <Input
                  id="overage"
                  type="number"
                  min={0}
                  step={1}
                  isPositiveOnly
                  placeholder="Amount"
                  leftContent={<DollarIcon className="size-5" />}
                  {...register("overage")}
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
                      <p>
                        Select and record the products given as promotions.
                        Costs are calculated from the cost price.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button color="primary" type="submit">
                  <ButtonLoadingContent
                    isLoading={false}
                    actionContent="Submit Overage"
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

export default Overage;
