"use client";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import FileUploader from "@/components/form/file-uploader";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Textarea } from "@/components/ui/textarea";

import useContactForm from "./useContactForm";
import { subjectOptions } from "./utils";

function ContactForm() {
  const {
    formProps: {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
      control,
      setValue,
      watch,
    },
    onSubmit,
    toastHookProps,
  } = useContactForm();

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(
          onSubmit({
            toastHookProps,
          }),
        )}
      >
        <div className="space-y-6">
          <Input
            id="name"
            type="text"
            label="Name"
            required
            placeholder="Enter your full name"
          />
          <Input
            id="email"
            type="email"
            label="Email Address"
            required
            placeholder="Enter your email address"
          />

          <SelectInput
            label="Subject"
            required
            className="bg-default-100"
            options={subjectOptions}
            onChange={(selectedOptions) => {
              if (selectedOptions?.value) {
                setValue("subject", selectedOptions?.value);
              }
            }}
            value={watch("subject") ?? subjectOptions?.[0]?.value}
            error={errors.subject?.message}
          />

          <div>
            <Textarea
              id="description"
              {...register("description")}
              error={errors.description?.message}
              required
              label="Description"
              placeholder="Describe your issue or question in detail"
              rows={5}
            />
            <p className="mt-1.5 text-sm text-default-600">
              Please provide as much detail as possible to help us assist you
              effectively.
            </p>
          </div>

          <LabelErrorWrapper
            label="Attach Files"
            error={errors.images?.message}
          >
            <FileUploader
              files={watch("images") ?? []}
              setFiles={(newFiles) => {
                setValue("images", newFiles);
              }}
            />
          </LabelErrorWrapper>

          <div>
            <CustomRadioGroup
              required
              label="Priority Level*"
              options={[
                {
                  label: "Low",
                  value: "LOW",
                  defaultChecked: true,
                  ...register("priority"),
                },
                {
                  label: "Medium",
                  value: "MEDIUM",
                  ...register("priority"),
                },
                {
                  label: "High",
                  value: "HIGH",
                  ...register("priority"),
                },
                {
                  label: "Urgent",
                  value: "URGENT",
                  ...register("priority"),
                },
              ]}
            />

            <p className="mt-2 text-sm text-[#94969C]">
              Select the priority level of your issue.
            </p>
          </div>
        </div>
        <Button
          fullWidth
          color="primary"
          className="mt-8"
          type="submit"
          size="xl"
          disabled={isSubmitting}
        >
          <ButtonLoadingContent
            isLoading={isSubmitting}
            actionContent="Submit Request"
          />
        </Button>
      </form>
    </>
  );
}

export default ContactForm;
