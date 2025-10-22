"use client";
import { useRef, useState, forwardRef, useCallback } from "react";
import toast from "react-hot-toast";

import useBooleanState from "@/hooks/useBooleanState";
import { cn, copyText, type TCopyFailed, type TCopySuccess } from "@/lib/utils";

import CopyIcon from "./icons/CopyIcon";
import QrCodeIcon from "./icons/QrCodeIcon";
import ViewQrCodeModal from "./qr-code-modal";
import { Input, type TInputProps } from "./ui/input";

interface CopyInputProps extends Omit<TInputProps, "onCopy"> {
  onCopy?: (copiedText: string) => void;
  className?: string;
  rightContentClass?: string;
  color?: TInputProps["color"];
  copySuccessMessage?: string;
  copyErrorMessage?: string;
  qrCode?: string;
}

const CopyInput = forwardRef<HTMLInputElement, CopyInputProps>(
  (
    {
      onCopy,
      className,
      copySuccessMessage,
      copyErrorMessage,
      qrCode,
      rightContentClass,
      ...props
    },
    ref,
  ) => {
    const {
      state: isViewQrModalOpen,
      setState: setViewQrModalState,
      setOpen: setViewQrModalOpen,
    } = useBooleanState();
    const inputRef = useRef<HTMLInputElement>(null);

    const [copyStatus, setcopyStatus] = useState<TCopySuccess | TCopyFailed>();

    const handleCopy = useCallback(
      ({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) =>
        async () => {
          const text = inputRef.current?.value;
          if (!text) {
            return;
          }
          const wasCopied = await copyText(text, {
            onCopySuccess: setcopyStatus,
            onCopyError: setcopyStatus,
          });
          if (wasCopied?.success) {
            toast.success(copySuccessMessage || "Text copied to clipboard.", {
              className:
                "bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg",
              position: "top-center",
              duration: 3000,
              style: {
                background: "#1F2937",
                color: "white",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: "500",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            });
          } else {
            toast.error(copyErrorMessage || "Failed to copy text.", {
              className:
                "bg-error-500 text-white border border-error-600 rounded-lg shadow-lg",
              position: "top-center",
              duration: 3000,
              style: {
                background: "#EF4444",
                color: "white",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: "500",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            });
          }
        },
      [copySuccessMessage, copyErrorMessage],
    );

    return (
      <>
        <Input
          ref={ref || inputRef}
          className={cn("ps-11", className)}
          {...props}
          rightContent={
            <div
              className={cn(
                "absolute end-3.5 top-1/2 flex -translate-y-1/2 items-center gap-1 px-0.5",
                rightContentClass,
              )}
            >
              <CopyIcon
                className={cn("tex-default-700 size-4 cursor-pointer", {
                  "text-[#F79009]": copyStatus?.success,
                })}
                // eslint-disable-next-line react-compiler/react-compiler
                onClick={handleCopy({ inputRef })}
              />
              {qrCode && (
                <>
                  <QrCodeIcon
                    onClick={setViewQrModalOpen()}
                    className="tex-default-700 ms-1 size-5 cursor-pointer"
                  />
                  <ViewQrCodeModal
                    open={isViewQrModalOpen}
                    onOpenChange={setViewQrModalState}
                    qrCode={qrCode}
                  />
                </>
              )}
            </div>
          }
        />
      </>
    );
  },
);

CopyInput.displayName = "CopyInput";

export { CopyInput };
