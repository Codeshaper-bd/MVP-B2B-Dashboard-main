"use client";
import { Fragment } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";

import { Card } from "@/components/ui/card";

import ProductActionCollapsibleSection from "../../product-collapsible-section";

function Promos() {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <Fragment>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6 shadow-none">
          <ProductActionCollapsibleSection
            title="Promos"
            inputId="promos"
            register={register}
            tooltipContent="Select and record the products given as promotions. Costs are calculated from the cost price."
            submitButtonLabel="Submit Promo"
            productOptions={[
              {
                value: "product1",
                label: "Dummy Product",
                imageSrc: "/assets/all/mainbar.png",
              },
            ]}
          />
        </Card>
      </form>
    </Fragment>
  );
}

export default Promos;
