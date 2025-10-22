"use client";

import Image from "next/image";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

interface IViewActiveEventModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  qrCode: string | null | undefined;
  label?: string | null | undefined;
}

function ViewQrCodeModal({
  open,
  onOpenChange,
  qrCode,
  label = "QR Code",
}: IViewActiveEventModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[450px] p-5">
        <LabelErrorWrapper className="mt-3 p-2" label={label}>
          <Image
            src={qrCode || ""}
            alt="qrCode"
            width={100}
            height={100}
            className="h-full w-full rounded-lg"
          />
        </LabelErrorWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default ViewQrCodeModal;
