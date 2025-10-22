"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import BankDetailsForm from "./BankDetailsForm";
import CardPaymentForm from "./CardPaymentForm";
import ContactEmail from "./ContactEmail";

interface IPaymentMethodFormProps {
  handleAddPaymentMethod?: () => void;
  handleAddBankDetails?: () => void;
  handleUpdateBankDetails?: (id?: number) => void;
}

function PaymentMethodForm({
  handleAddPaymentMethod,
  handleAddBankDetails,
  handleUpdateBankDetails,
}: IPaymentMethodFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex-1">
            <CardTitle className="mb-1 font-semibold">Payment method</CardTitle>

            <p className="pointer-events-none text-sm text-default-600">
              Update your billing details and address.
            </p>
          </div>
        </div>
      </CardHeader>

      <div className="ms-6 border border-default-100" />

      <CardContent>
        <div className="divide-y divide-default-100 pb-4">
          <ContactEmail />
          <CardPaymentForm handleAddPaymentMethod={handleAddPaymentMethod} />
          <BankDetailsForm
            handleAddBankDetails={handleAddBankDetails}
            handleUpdateBankDetails={handleUpdateBankDetails}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentMethodForm;
