"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
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

import CategoryCollapsibleSection from "../../category-collapsible-section";
import SubmissionSummaryDialog from "../../modals/submission-summary-dialog";

interface FormData {
  cashOnHand?: string;
  debitAmount?: string;
  posAmount?: string;
}

function Category() {
  const methods = useForm<FormData>();
  const [open, setOpen] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<string | null>();
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSubmittedData(data);
    setOpen(true);
  };

  return (
    <Fragment>
      <Card className="p-6 shadow-none">
        <div className="flex flex-wrap items-center">
          <div className="flex-1">
            <CardTitle className="font-semibold leading-7 text-default-900">
              Category
            </CardTitle>
          </div>

          <div>
            <Select
              value={categoryState ?? undefined}
              onValueChange={(value) => {
                setCategoryState(value);
              }}
            >
              <SelectTrigger className="w-auto bg-default-50 md:min-w-60">
                <SelectValue
                  className="text-primary"
                  placeholder="Select category"
                />
              </SelectTrigger>
              <SelectContent className="bg-default">
                <SelectItem key={"mainbar"} value="mainbar">
                  <div className="flex gap-3">
                    <Image
                      src="/assets/all/mainbar.png"
                      alt="mainbar Image"
                      width={32}
                      height={24}
                      className="rounded-[3px]"
                    />
                    <span>Main Bar</span>
                  </div>
                </SelectItem>
                <SelectItem key={"upperbar"} value="upperbar">
                  <div className="flex gap-3">
                    <Image
                      src="/assets/all/upperbar.png"
                      alt="mainbar Image"
                      width={32}
                      height={24}
                      className="rounded-[3px]"
                    />
                    <span> Upper Bar</span>
                  </div>
                </SelectItem>
                <SelectItem key={"lowerbar"} value="lowerbar">
                  <div className="flex gap-3">
                    <Image
                      src="/assets/all/lowerbar.png"
                      alt="mainbar Image"
                      width={32}
                      height={24}
                      className="rounded-[3px]"
                    />
                    <span>Lower Bar</span>
                  </div>
                </SelectItem>
                <SelectItem key={"cover"} value="cover">
                  Cover
                </SelectItem>
                <SelectItem key={"bottleservice"} value="bottleservice">
                  Bottle Service
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent className="mt-6 space-y-6 p-0">
          <FormProvider {...methods}>
            <form
              noValidate
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <Card className="p-6 shadow-none">
                <CategoryCollapsibleSection
                  title="Cash On Hand"
                  label="Cashout Amount"
                  inputId="cashoutAmount"
                  name="cashOnHand"
                />
              </Card>
              <Card className="p-6 shadow-none">
                <CategoryCollapsibleSection
                  title="Debit Terminal Close-Out"
                  label="Amount"
                  inputId="debitAmount"
                  name="debitAmount"
                  placeholder="Amount"
                />
              </Card>
              <Card className="p-6 shadow-none">
                <CategoryCollapsibleSection
                  title="POS Read Amount"
                  label="Amount"
                  inputId="posAmount"
                  name="posAmount"
                />
              </Card>
              <div className="flex items-center justify-end gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-5 cursor-pointer text-default-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <TooltipArrow className="w-4 fill-default" />
                      <p>
                        Submit the cashout amount for this category. Ensure the
                        amount matches the cash on hand.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button className="w-20" color="primary" type="submit">
                  <ButtonLoadingContent
                    isLoading={false}
                    actionContent="Submit"
                  />
                </Button>
              </div>
            </form>
          </FormProvider>

          <SubmissionSummaryDialog
            open={open}
            setOpen={setOpen}
            data={submittedData}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default Category;
