import CrossIcon from "@/components/icons/CrossIcon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type IApproveSubmissionDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CashOutSummaryDialog({
  open,
  setOpen,
}: IApproveSubmissionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button color="primary" className="rounded-[8px]">
          Submit Cashout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="px-6">
        <div className="relative flex items-center justify-start gap-4 p-6 md:justify-center">
          <h3 className="text-lg font-semibold text-default-1000">
            Cashout Summary - Main Bar
          </h3>
          <div className="absolute -right-4 top-5 md:right-0 md:top-6">
            <Button
              onClick={() => setOpen(false)}
              size="icon"
              className="border-none"
            >
              <CrossIcon className="size-6" />
            </Button>
          </div>
        </div>
        <Card className="bg-default-100 px-[18px] py-5">
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: "Total Cash On Hand", value: "$171.00" },
                { label: "Debit Terminal", value: "$520.00" },
                { label: "POS Read Amount", value: "$320.00" },
                { label: "Promos Total", value: "$20.00" },
                { label: "Spillage/Wastage", value: "$24.00" },
                { label: "Overage", value: "+$29.00" },
              ].map((item, idx, arr) => (
                <tr key={item.label}>
                  <td className="px-0 py-2 font-normal">{item.label}</td>
                  <td
                    className={`px-0 py-2 text-right ${
                      idx === arr.length - 1
                        ? "text-success"
                        : "text-default-1000"
                    }`}
                  >
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className="mt-3 bg-default-100 px-[18px] py-4">
          <h4 className="mb-2.5 text-xs font-semibold uppercase text-default-900">
            Tip Out Summary:
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-normal">Total Sales</span>
              <span className="text-default-1000">$1,000</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-normal">Total Tip Out (5%)</span>
              <span className="text-default-1000">$50</span>
            </div>
            <Card className="space-y-2 rounded-[10px] bg-[#FFFFFF05] px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-normal">- Manager on Duty (2%) :</span>
                <span className="text-default-1000">$20</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-normal">- Bar Back (2%) :</span>
                <span className="text-default-1000">$20</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-normal">- Security (1%) :</span>
                <span className="text-default-1000">$10</span>
              </div>
            </Card>
          </div>
        </Card>
        <div className="my-6 grid w-full grid-cols-2 gap-3">
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
            color="primary"
            size="lg"
            onClick={() => setOpen(false)}
          >
            Confirm
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CashOutSummaryDialog;
