import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAStripePaymentStatusQuery } from "@/store/api/stripe/stripe-api";
import { useGetATransactionQuery } from "@/store/api/transactions/transactions-api";
import RenderData from "@/components/render-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import ModalContent from "./ModalContent";
import type { ISelectedId } from "../../TransactionContent/table/TransactionAction";

interface IViewTransactionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: ISelectedId;
}
function ViewTransaction({
  open,
  setOpen,
  selectedId: { transactionId, gatewayReferenceId, amount },
}: IViewTransactionProps) {
  const { data: getATransactionRes, ...getATransactionApiState } =
    useGetATransactionQuery(
      { transactionId },
      { skip: !checkIsValidId(transactionId, { type: "number" }) },
    );
  const getATransactionData = getATransactionRes?.data;
  const isSkipped =
    !!amount && !checkIsValidId(transactionId, { type: "number" });

  const {
    data: getAStripePaymentStatusRes,
    ...getAStripePaymentStatusApiState
  } = useGetAStripePaymentStatusQuery(
    {
      id: gatewayReferenceId,
    },
    {
      skip: isSkipped,
    },
  );
  const getAStripePaymentStatusData = getAStripePaymentStatusRes?.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-5 md:max-w-[600px]">
        <DialogHeader className="py-3">
          <DialogTitle>Transaction History</DialogTitle>
        </DialogHeader>
        <Separator />
        <ScrollArea className="lg:min-h-[350px]">
          <RenderData
            expectedDataType="object"
            data={getATransactionData}
            {...getATransactionApiState}
          >
            <ModalContent
              getATransactionData={getATransactionData}
              getAStripePaymentStatusData={getAStripePaymentStatusData}
            />
          </RenderData>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ViewTransaction;
