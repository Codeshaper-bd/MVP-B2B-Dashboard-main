"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import { Card, CardContent } from "@/components/ui/card";

import useAttachSocial from "./useAttachSocial";

export interface IAttachFormProps {
  isEditMode?: boolean;
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttachForm = forwardRef<HTMLButtonElement, IAttachFormProps>(
  (props, ref) => {
    const { isEditMode } = props;
    const {
      formProps: {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
        watch,
      },
      toastHookProps,
      onSubmit,
      onSubmitAssistProps,
    } = useAttachSocial(props);

    const formComponent = (
      <form noValidate onSubmit={handleSubmit(onSubmit(onSubmitAssistProps))}>
        <div className="space-y-4">
          <Card
            className={cn("cursor-pointer", {
              "border border-primary": watch("selectedSocial") === "facebook",
            })}
            onClick={() => {
              setValue("selectedSocial", "facebook");
            }}
          >
            <CardContent className="flex items-center gap-3.5 px-6 py-4">
              <CustomRadioGroup
                options={[
                  {
                    value: 1,
                    name: "Facebook",
                    checked: watch("selectedSocial") === "facebook",
                  },
                ]}
              />

              <div>
                <h2 className="text-base font-semibold text-default-1000">
                  Instagram Business Account
                </h2>
                <p className="text-sm text-default-600">
                  A public profile that instagram users “like”
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn("cursor-pointer", {
              "border border-primary": watch("selectedSocial") === "instagram",
            })}
            onClick={() => {
              setValue("selectedSocial", "instagram");
            }}
          >
            <CardContent className="flex items-center gap-3.5 px-6 py-4">
              <CustomRadioGroup
                options={[
                  {
                    value: 1,
                    name: "Facebook",
                    checked: watch("selectedSocial") === "instagram",
                  },
                ]}
              />

              <div>
                <h2 className="text-base font-semibold text-default-1000">
                  Instagram Business Account
                </h2>
                <p className="text-sm text-default-600">
                  A public profile that instagram users “like”
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <button type="submit" hidden ref={ref} />
      </form>
    );

    if (!isEditMode) {
      return formComponent;
    }

    return (
      //   <RenderData
      //     data={getATicketTierData}
      //     {...getATicketTiersApiState}
      //     expectedDataType="object"
      //   >
      //     {formComponent}
      //   </RenderData>
      <div>Edit Form</div>
    );
  },
);

AttachForm.displayName = "AttachForm";

export default AttachForm;
