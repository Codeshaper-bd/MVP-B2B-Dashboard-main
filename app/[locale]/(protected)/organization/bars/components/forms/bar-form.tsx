"use client";

import { forwardRef } from "react";
import { useWatch } from "react-hook-form";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import FileInputButton from "@/components/form/file-input-button2";
import RenderData from "@/components/render-data";
import { Input } from "@/components/ui/input";

import useBarForm from "./useBarForm";
import { initialBarFormValues } from "./utils";

export interface ICreateBarFormProps {
  isEdit?: boolean;
  barSlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateBarForm = forwardRef<HTMLButtonElement, ICreateBarFormProps>(
  ({ isEdit, barSlug, setIsSubmitting }, ref) => {
    const {
      formProps: {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
      },
      onSubmit,
      toastHookProps,
      getABarData,
      getABarApiState,
    } = useBarForm({
      isEdit,
      barSlug,
    });

    const barImage = useWatch({
      control,
      name: "barImage",
      defaultValue: initialBarFormValues.barImage,
    });

    const formComponent = (
      <form
        noValidate
        onSubmit={handleSubmit(
          onSubmit({
            toastHookProps,
            setIsSubmitting,
          }),
        )}
      >
        <div className="mt-3 space-y-5">
          <FileInputButton
            value={barImage}
            onChange={(value) => {
              if (
                value === null ||
                value === undefined ||
                (value instanceof File && !Array.isArray(value))
              ) {
                setValue("barImage", value);
              }
            }}
            error={errors.barImage?.message}
            enableCropper={true}
            cropperAspectRatio={16 / 9}
            cropperShape="rect"
            maxFileSize={1024}
          />

          <Input
            id="barName"
            label="Bar Name"
            placeholder="Bar Name"
            {...register("name")}
            error={errors?.name?.message}
            required
          />

          <button type="submit" hidden ref={ref} />
        </div>
      </form>
    );
    if (!isEdit) {
      return formComponent;
    }
    return (
      <RenderData
        data={getABarData}
        {...getABarApiState}
        expectedDataType="object"
      >
        {formComponent}
      </RenderData>
    );
  },
);

CreateBarForm.displayName = "CreateBarForm";
export default CreateBarForm;
