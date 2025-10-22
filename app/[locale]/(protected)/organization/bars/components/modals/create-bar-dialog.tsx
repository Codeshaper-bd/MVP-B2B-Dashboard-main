"use client";

import { useEffect, useRef, useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import { convertToNumber } from "@/lib/data-types/number";
import { useGetAllBarsQuery } from "@/store/api/bars/bars-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import GridIcon from "@/components/icons/GridIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { TooltipComponent } from "@/components/ui/tooltip";

import CreateBarForm from "../forms/bar-form";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();
function CreateBarDialog() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    data: getAllBarRes,
    isLoading,
    isError,
    isFetching,
  } = useGetAllBarsQuery({
    pageSize: contentPerPageOptions[5],
  });
  const getAllBarPagination = getAllBarRes?.pagination;
  const totalBarCount = convertToNumber({
    value: getAllBarPagination?.totalCount,
  });

  useEffect(() => {
    if (!isLoading && !isFetching && !isError) {
      setIsDisabled(totalBarCount >= 5);
    }
  }, [getAllBarRes, isLoading, isError, isFetching, totalBarCount]);
  return (
    <DialogContextProvider>
      <div className="flex flex-col items-end gap-3">
        <DialogTrigger asChild>
          <Button
            disabled={isDisabled}
            type="button"
            color={isDisabled ? "secondary" : "primary"}
          >
            <PlusIcon
              className={`me-1 h-3.5 w-3.5 ${isDisabled ? "text-secondary-foreground" : "text-primary-foreground"}`}
            />
            Create Bar
          </Button>
        </DialogTrigger>

        {isDisabled && (
          <div className="flex items-center gap-1.5">
            <TooltipComponent
              content="You can only create up to 5 bars."
              isArrow={true}
            >
              <InfoIcon className="size-4 shrink-0 text-default-700" />
            </TooltipComponent>
            <h5 className="text-sm font-normal text-default-700">
              You can only create up to 5 bars.
            </h5>
          </div>
        )}
      </div>

      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Create New Bar"
        description=""
        icon={<GridIcon className="size-6 text-default-700" />}
        withCloseButton
      >
        <CreateBarForm
          ref={submitButtonRef}
          setIsSubmitting={setIsSubmitting}
        />
        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            // eslint-disable-next-line react-compiler/react-compiler
            onClick={handleSubmitButtonClick(submitButtonRef)}
            disabled={isSubmitting}
          >
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent="Create Bar"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CreateBarDialog;
