import React, { Fragment } from "react";

import DeleteIcon from "@/components/icons/DeleteIcon";
import SignalTransmitIcon from "@/components/icons/SignalTransmitIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function OpenDeactiveModal({
  openPopup,
  setOpenPopup,
  type,
  id,
  setActionConfirm,
}: {
  openPopup: boolean;
  setOpenPopup: (open: boolean) => void;
  type: string;
  id: number | null;
  setActionConfirm: (confirmed: boolean) => void;
}) {
  const deactivationHandler = () => {
    setOpenPopup(false);
    setActionConfirm(true);
  };
  return (
    <Fragment>
      <AlertDialog open={openPopup} onOpenChange={setOpenPopup}>
        <StatusAlert
          status={type === "ping" ? "warning" : "destructive"}
          withCloseButton
          icon={
            type === "ping" ? (
              <SignalTransmitIcon className="size-5" />
            ) : (
              <DeleteIcon className="size-5" />
            )
          }
          title={
            type === "ping"
              ? "Confirm Ping Device?"
              : type === "Active"
                ? "Confirm Device Deactivation"
                : "Confirm Device Activation"
          }
          description={
            type === "ping"
              ? "Are you sure you want to ping this device? This will send a signal to the device to check its status."
              : type !== "Active"
                ? "Are you sure you want to Active this device?"
                : "Deactivating this device will restrict its access to your account. Do you want to proceed?"
          }
        >
          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              fullWidth
              color="secondary"
              className="bg-default-50"
              onClick={() => setOpenPopup(false)}
            >
              Cancel
            </Button>

            <Button fullWidth color="primary" onClick={deactivationHandler}>
              {type === "ping"
                ? "Ping"
                : type === "Active"
                  ? "Deactivate"
                  : "Active"}
            </Button>
          </div>
        </StatusAlert>
      </AlertDialog>
    </Fragment>
  );
}
