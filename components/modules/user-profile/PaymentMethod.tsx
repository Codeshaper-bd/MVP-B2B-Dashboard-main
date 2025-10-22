"use client";
import { useState } from "react";

import AddBankDetailsForm from "./Forms/AddBankDetailsForm";
import AddPaymentMethodForm from "./Forms/AddPaymentMethodForm";
import PaymentMethodForm from "./Forms/PaymentMethodForm";

function PaymentMethod() {
  const [view, setView] = useState<
    "default" | "addPayment" | "addBankDetails" | "updateBankDetails"
  >("default");
  const [bankDetailsId, setBankDetailsId] = useState<number>();

  const handleAddPaymentMethod = () => {
    setView("addPayment");
  };
  const handleAddBankDetails = () => {
    setView("addBankDetails");
  };
  const handleUpdateBankDetails = (id?: number) => {
    setView("updateBankDetails");
    setBankDetailsId(id);
  };
  const handleBackToPaymentMethod = () => {
    setView("default");
  };

  return (
    <>
      {view === "default" && (
        <PaymentMethodForm
          handleAddPaymentMethod={handleAddPaymentMethod}
          handleAddBankDetails={handleAddBankDetails}
          handleUpdateBankDetails={handleUpdateBankDetails}
        />
      )}
      {view === "addPayment" && (
        <AddPaymentMethodForm
          handleBackToPaymentMethod={handleBackToPaymentMethod}
        />
      )}
      {view === "addBankDetails" && (
        <AddBankDetailsForm
          handleBackToPaymentMethod={handleBackToPaymentMethod}
        />
      )}
      {view === "updateBankDetails" && (
        <AddBankDetailsForm
          bankDetailsId={bankDetailsId}
          isEdit
          handleBackToPaymentMethod={handleBackToPaymentMethod}
        />
      )}
    </>
  );
}

export default PaymentMethod;
