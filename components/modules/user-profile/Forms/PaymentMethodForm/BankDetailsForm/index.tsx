"use client";

import { CategoryCard } from "@/components/category-card";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";

import BankList from "./BankList";

interface IBankDetailsFormProps {
  handleAddBankDetails?: () => void;
  handleUpdateBankDetails?: (id?: number) => void;
}

function BankDetailsForm({
  handleAddBankDetails,
  handleUpdateBankDetails,
}: IBankDetailsFormProps) {
  return (
    <CategoryCard
      title="Bank Details"
      desc="Direct Deposit Information for Event Payouts"
    >
      <BankList handleUpdateBankDetails={handleUpdateBankDetails} />

      <Button
        type="button"
        size="sm"
        variant={"ghost"}
        className="mt-4 flex items-center gap-x-2.5 px-1 text-sm font-semibold not-italic leading-5 text-default-600 md:px-1"
        onClick={handleAddBankDetails}
      >
        <PlusIcon className="size-3" />
        Add bank details
      </Button>
    </CategoryCard>
  );
}

export default BankDetailsForm;
