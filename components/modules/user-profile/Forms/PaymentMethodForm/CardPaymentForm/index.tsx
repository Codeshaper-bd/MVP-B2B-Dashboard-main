import { useState } from "react";

import { CategoryCard } from "@/components/category-card";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";

import PaymentMethodCheckbox, {
  type IPaymentMethodCheckboxProps,
} from "../PaymentMethodCheckbox";

interface ICardPaymentFormProps {
  handleAddPaymentMethod?: () => void;
}

function CardPaymentForm({ handleAddPaymentMethod }: ICardPaymentFormProps) {
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<IPaymentMethodCheckboxProps["value"]>();

  return (
    <CategoryCard title="Card details" desc="Select default payment method.">
      <PaymentMethodCheckbox
        value={paymentMethodSelected}
        onValueChange={setPaymentMethodSelected}
      />

      <Button
        type="button"
        size="sm"
        variant={"ghost"}
        className="mt-4 flex items-center gap-x-2.5 px-1 text-sm font-semibold not-italic leading-5 text-default-600 md:px-1"
        onClick={handleAddPaymentMethod}
      >
        <PlusIcon className="size-3" />
        Add new payment method
      </Button>
    </CategoryCard>
  );
}

export default CardPaymentForm;
