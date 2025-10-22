"use client";
import { memo, useCallback, useRef, useState } from "react";

import type { TInventoryItemType } from "@/store/api/inventory-item/inventory-item.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import PlusIcon from "@/components/icons/PlusIcon";
import WineIcon from "@/components/icons/WineIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CreateInventoryForm from "./forms/create-inventory-form";
import ProductTypeChoiceModalContent from "./ProductTypeChoiceModalContent";
import type { TOnClick } from "./ProductTypeChoiceOptionCard";

function CreateInventoryDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<TInventoryItemType>();
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleProductTypeClick: TOnClick = useCallback(
    (_, { value }) => setProductType(value),
    [],
  );

  return (
    <DialogContextProvider
      beforeExecute={() => {
        setProductType(undefined);
      }}
      // open
    >
      <DialogTrigger asChild>
        <Button type="button" color="primary" className="h-11">
          <PlusIcon className="me-1 size-4" /> Create Product
        </Button>
      </DialogTrigger>

      {!productType && (
        <ProductTypeChoiceModalContent
          value={productType}
          onClick={handleProductTypeClick}
        />
      )}

      {!!productType && (
        <CustomizedDialog
          maxWidth="600px"
          status="transparent-with-rounded-border"
          mode="grid-bg"
          position="left"
          title={`Add ${productType === "ALCOHOLIC" ? "Alcoholic" : "Non-Alcoholic"} Product`}
          description="Please provide the required information to complete this form."
          icon={<WineIcon className="size-6 text-default-700" />}
          withCloseButton
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose) {
              setClose();
            }
          }}
        >
          <CreateInventoryForm
            ref={submitBtnRef}
            productType={productType}
            setIsLoading={setIsLoading}
          />

          <CustomizedDialog.Buttons>
            <CustomizedDialog.Buttons.SecondaryButton
              className="h-11"
              disabled={isLoading}
            >
              Cancel
            </CustomizedDialog.Buttons.SecondaryButton>

            <CustomizedDialog.Buttons.PrimaryButton
              onClick={() => {
                submitBtnRef.current?.click();
              }}
              className="h-11"
              disabled={isLoading}
            >
              <ButtonLoadingContent
                actionContent="Add Product"
                isLoading={isLoading}
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      )}
    </DialogContextProvider>
  );
}

export default memo(CreateInventoryDialog);
