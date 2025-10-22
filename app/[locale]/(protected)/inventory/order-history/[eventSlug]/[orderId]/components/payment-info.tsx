import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function PaymentInfo() {
  const getStatusColor = (status: string) => {
    const statusText = status?.toLowerCase();

    switch (statusText) {
      case "confirmed":
        return "statusGreen";
      default:
        return "statusError";
    }
  };
  return (
    <div>
      <Card className="flex-1">
        <CardHeader className="space-y-1 !py-4">
          <CardTitle className="font-semibold">Payment Information</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-6">
          <CardDescription className="flex items-center justify-between text-default-700">
            <span>Payment Method</span>
            <span>Credit card</span>
          </CardDescription>
          <CardDescription className="flex items-center justify-between text-default-700">
            <span>Card Type</span>
            <span className="flex items-center gap-1.5">
              <Image
                src="/images/all-img/visa-card.png"
                width={25}
                height={18}
                alt="Visa card logo"
              />
              <span>Visa</span>
            </span>
          </CardDescription>
          <CardDescription className="flex items-center justify-between text-default-700">
            <span>Last 4 Digits</span>
            <span>1234</span>
          </CardDescription>
          <CardDescription className="flex items-center justify-between text-default-700">
            <span>Transaction ID</span>
            <span>ABCD5678</span>
          </CardDescription>
          <div className="flex items-center justify-between text-sm text-default-700">
            <span>Payment Status</span>
            <Badge
              className={`whitespace-nowrap border px-2 py-0.5 font-medium ${getStatusColor("confirmed")}`}
            >
              Confirmed
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentInfo;
