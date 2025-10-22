"use client";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

import { cn, copyText, type TCopyFailed, type TCopySuccess } from "@/lib/utils";

interface ICopyButtonProps {
  text: string;
  className?: string;
  children: React.ReactNode;
  copySuccessMessage?: string;
  copyErrorMessage?: string;
}

function CopyButton({
  text,
  className,
  children,
  copySuccessMessage,
  copyErrorMessage,
}: ICopyButtonProps) {
  const [copyStatus, setCopyStatus] = useState<TCopySuccess | TCopyFailed>();

  const handleCopy = useCallback(async () => {
    if (!text) {
      return;
    }

    const wasCopied = await copyText(text, {
      onCopySuccess: setCopyStatus,
      onCopyError: setCopyStatus,
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
  }, [text, copySuccessMessage, copyErrorMessage]);

  return (
    <div
      className={cn("flex flex-1 cursor-pointer items-center gap-1", className)}
      onClick={handleCopy}
    >
      {children}
    </div>
  );
}

export default CopyButton;
