"use client";

import { memo, useRef, useState } from "react";

import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import CreditCardRefreshIcon from "@/components/icons/CreditCardRefreshIcon";
import SeparatorLabel from "@/components/separator-label";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import AddonForm from "./../forms";
import AddonsList, { type TAddonsListProps } from "./list/addons-list";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

type TCreateAddonDialogProps = Pick<
  TAddonsListProps,
  "selectedAddons" | "onToggleAddon" | "onDeleteAddonSuccess"
> & {
  onCreateOrEditSuccess?: (data: TAddOn) => void;
  triggerClassName?: string;
  triggerText?: string;
};

function CreateAddonDialog(props: TCreateAddonDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const triggerText = props?.triggerText || "Create Add on";
  return (
    <div>
      <DialogContextProvider>
        <DialogTrigger asChild>
          <Button
            color="secondary"
            type="button"
            size="sm"
            className={props?.triggerClassName}
          >
            {triggerText}
          </Button>
        </DialogTrigger>

        <CustomizedDialog
          maxWidth="480px"
          status="transparent-with-rounded-border"
          mode="ring-bg"
          title="Add Ons"
          description="You can add from add on history or add new"
          descriptionClassName="pt-0"
          icon={<CreditCardRefreshIcon className="size-6 text-default-700" />}
          withCloseButton
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose || !isSubmitting) {
              setClose();
            }
          }}
          childrenContainerClassName="!pr-1"
        >
          <ScrollArea className="h-[calc(100vh-23rem)] pr-2.5">
            <div className="w-full">
              <AddonsList {...props} />

              <SeparatorLabel className="pr-2.5">Add New</SeparatorLabel>
            </div>

            <AddonForm
              ref={submitButtonRef}
              onSuccess={props?.onCreateOrEditSuccess}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </ScrollArea>

          <CustomizedDialog.Buttons className="pr-5">
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
                actionContent="Create"
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </DialogContextProvider>
    </div>
  );
}

export default memo(CreateAddonDialog);
