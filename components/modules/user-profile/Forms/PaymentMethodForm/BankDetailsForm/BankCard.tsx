"use client";

import { useState } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { cn } from "@/lib/utils";
import { useUpdateBankDetailsMutation } from "@/store/api/bank-details/bank-details-api";
import type { TGetBankDetails } from "@/store/api/bank-details/bank-details.types";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import DeleteConfirmationDialog from "@/components/features/alert-dialog/DeleteConfirmationDialog";
import BankIcon from "@/components/icons/BankIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export interface IBankCardProps {
  bank: TGetBankDetails;
  handleUpdateBankDetails?: (id?: number) => void;
}

function BankCard({ bank, handleUpdateBankDetails }: IBankCardProps) {
  const [updateBankDetails, { isLoading: isUpdating }] =
    useUpdateBankDetailsMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSetAsDefault = async (value?: number) => {
    const toastId = toast({
      variant: "loading",
      title: "Setting as default",
      description: "Please wait while we set this bank as default.",
    });

    try {
      await updateBankDetails({
        id: value,
        body: { isDefault: true },
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Set as default",
        description: "You have successfully set this bank as default.",
      });
    } catch (error) {
      console.error("🚀 ~ handleSetAsDefault ~ error:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Set as default",
          description: "Failed to set this bank as default.",
        }),
      });
    }
  };

  return (
    <>
      <label
        htmlFor={`${bank.id}-${bank.bankName}`}
        className={cn(
          "flex w-full rounded-xl border border-border p-4 transition-all duration-300 ease-linear",
          {
            "border-primary": bank?.isDefault,
          },
        )}
      >
        <div className="flex flex-1 gap-3">
          <div className="flex h-9 w-[46px] items-center justify-center rounded-md bg-[#4183E7]">
            <BankIcon className="size-5 text-white" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-default-700">
              {bank.bankName} - {bank.bankAccountNumber}
            </h3>

            <div className="mt-1 flex gap-3">
              <button
                type="button"
                className={cn(
                  "text-sm font-semibold text-default-600 hover:text-primary",
                  {
                    "text-default-1000 hover:text-default-800": bank?.isDefault,
                  },
                )}
                onClick={() => {
                  setIsOpen(true);
                  setSelectedBankId(bank.id);
                }}
                disabled={bank?.isDefault}
              >
                {bank?.isDefault ? "Default" : "Set as default"}
              </button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => handleUpdateBankDetails?.(bank.id)}
                className="!p-0 text-sm font-semibold text-default-700"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-none">
          <CustomRadioGroup
            options={[
              {
                value: bank?.isDefault ? "default" : "not-default",
                id: `${bank.id}-${bank.bankName}`,
                radioProps: {
                  mode: "label-left",
                  ringColor: "primary",
                },
                checked: bank?.isDefault ? true : false,
              },
            ]}
          />
        </div>
      </label>
      <DeleteConfirmationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirmClick={() => handleSetAsDefault(selectedBankId ?? undefined)}
        isLoading={isUpdating}
        title="Set as default"
        description="Are you sure you want to set this bank account as default?"
        confirmText="Confirm"
        statusColor="warning"
        icon={<InfoIcon className="size-5" />}
      />
    </>
  );
}

export default BankCard;
