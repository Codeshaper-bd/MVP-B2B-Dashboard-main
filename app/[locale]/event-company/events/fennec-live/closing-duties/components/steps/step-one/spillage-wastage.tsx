"use client";
import { Fragment } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";

import { Card } from "@/components/ui/card";

import ProductActionCollapsibleSection from "../../product-collapsible-section";

function SpillageWastage() {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <Fragment>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6 shadow-none">
          <ProductActionCollapsibleSection
            title="Spillage/Wastage"
            inputId="spillage"
            register={register}
            tooltipContent="Record damaged or spilled products. Count as inventory waste."
            submitButtonLabel="Submit Spillage"
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

export default SpillageWastage;
