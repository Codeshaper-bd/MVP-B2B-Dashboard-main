import Image from "next/image";

import DollarIcon from "@/components/icons/DollarIcon";
import DollarRoundedIcon from "@/components/icons/DollarRoundedIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type IApproveSubmissionDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DiscountAmountDialog({
  open,
  setOpen,
}: IApproveSubmissionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="icon" color="secondary">
          <DollarIcon className="size-5" />
        </Button>
      </AlertDialogTrigger>

      <StatusAlert
        status="warning"
        withCloseButton
        icon={<DollarRoundedIcon className="size-6" />}
        title="Enter Discount Amount"
      >
        <div className="w-full space-y-8">
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 rounded-[10px] bg-default-50 px-3 py-2.5">
              <Image
                src="/images/all-img/product-alcohol.png"
                alt="product image"
                width={56}
                height={40}
                className="h-[40px] w-[56px] rounded-[8px] object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-default-1000">
                  Etna Rosso Vulka
                </h4>
                <p className="text-xs font-normal text-default-700">24 oz</p>
              </div>
            </div>

            <div>
              <Input
                label="Enter Discunt ($)"
                placeholder="0"
                leftContent={<span className="text-base font-normal">$</span>}
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              fullWidth
              color="secondary"
              size="lg"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              color="secondary"
              size="lg"
              onClick={() => setOpen(false)}
              disabled
            >
              Confirm
            </Button>
          </div>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DiscountAmountDialog;
