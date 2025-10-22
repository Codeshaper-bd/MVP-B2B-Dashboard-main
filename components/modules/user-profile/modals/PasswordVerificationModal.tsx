"use client";

import { useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import LockLockedIcon from "@/components/icons/LockLockedIcon";

import PasswordVerificationForm, {
  type IPasswordVerificationFormProps,
} from "../Forms/PasswordVerificationForm";

interface IPasswordVerificationModalProps
  extends Omit<IPasswordVerificationFormProps, "isLoading" | "setIsLoading"> {}

function PasswordVerificationModal({
  onVerificationSuccess,
  onVerificationFailure,
}: IPasswordVerificationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <CustomizedDialog
      maxWidth="400px"
      status="warning"
      mode="grid-bg"
      position="center"
      iconRounded="12px"
      title="Verification password"
      description="Welcome back! Please enter your details."
      descriptionPosition="center"
      descriptionClassName="pt-0 pb-5"
      icon={<LockLockedIcon className="size-5" />}
      withCloseButton
      disableInternallyClose
      onClose={({ setClose }) => {
        if (!isLoading) {
          setClose();
        }
      }}
    >
      <PasswordVerificationForm
        ref={submitButtonRef}
        onVerificationFailure={onVerificationFailure}
        onVerificationSuccess={onVerificationSuccess}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <CustomizedDialog.Buttons>
        <CustomizedDialog.Buttons.PrimaryButton
          onClick={(e, { setClose }) => {
            submitButtonRef.current?.click();
          }}
          type="button"
          disabled={isLoading}
        >
          <ButtonLoadingContent isLoading={isLoading} actionContent="Save" />
        </CustomizedDialog.Buttons.PrimaryButton>
      </CustomizedDialog.Buttons>
    </CustomizedDialog>
  );
}

export default PasswordVerificationModal;
