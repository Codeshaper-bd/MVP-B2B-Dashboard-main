"use client";

import { forwardRef, useState } from "react";

import { getAvatarFallbackName } from "@/lib/user/get-avatar-fallback-name";
import { cn } from "@/lib/utils";
import type {
  TAddOn,
  TUpdateAnAddOnArgs,
} from "@/store/api/add-ons/add-ons.types";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import RenderData from "@/components/render-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import { Textarea } from "@/components/ui/textarea";

import useAddonForms from "./useAddonForms";

export interface IAddonFormProps {
  isEdit?: boolean;
  selectedSlug?: TUpdateAnAddOnArgs["slug"];
  onSuccess?: (data: TAddOn) => void;
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddonForm = forwardRef<HTMLButtonElement, IAddonFormProps>(
  ({ selectedSlug, isEdit, onSuccess, isSubmitting, setIsSubmitting }, ref) => {
    const [open, setOpen] = useState<boolean>(isEdit ? true : false);
    const {
      formProps: {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
      },
      onSubmit,
      onSubmitAssistProps,
      getAllMediaApiState,
      getAllMediaData,
      getAnAddonData,
      getAnAddOnApiState,
      icon,
    } = useAddonForms({
      isEdit,
      selectedSlug,
      onSuccess,
      isSubmitting,
      setIsSubmitting,
    });

    const addonsListComponent = (
      <RenderData
        data={getAllMediaData}
        {...getAllMediaApiState}
        expectedDataType="array"
      >
        <Card className="mt-6 bg-default-50">
          <CardContent className="p-0 px-2 py-3">
            <LabelErrorWrapper
              error={
                errors?.icon?.root?.message ||
                errors?.icon?.message ||
                errors?.icon?.id?.root?.message ||
                errors?.icon?.id?.message
              }
            >
              <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                  <div className="flex w-full cursor-pointer items-center justify-between">
                    <span className="text-sm font-medium text-default-700">
                      Change Icon
                    </span>

                    <ChevronDownIcon
                      className={cn("h-5 w-5 transition-all duration-300", {
                        "rotate-180": open,
                      })}
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 rounded-lg border border-default-200 bg-default-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {getAllMediaData?.map((item) => (
                      <Avatar
                        key={item?.id}
                        className={cn(
                          "size-10 cursor-pointer rounded-full border-2 border-transparent bg-default-100 p-2 hover:bg-default-200/50",
                          {
                            "border-primary": icon?.id === item?.id,
                          },
                        )}
                        onClick={() => {
                          setValue("icon", item);
                        }}
                      >
                        <AvatarImage
                          src={item?.url || ""}
                          alt="icon"
                          className="size-[22px]"
                        />
                        <AvatarFallback>
                          {getAvatarFallbackName(item?.originalName)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </LabelErrorWrapper>
          </CardContent>
        </Card>
      </RenderData>
    );

    const formComponent = (
      <form noValidate>
        <div className="space-y-6 pr-2.5">
          {getAllMediaData?.length ? (
            addonsListComponent
          ) : (
            <LabelErrorWrapper
              error={
                errors?.icon?.root?.message ||
                errors?.icon?.message ||
                errors?.icon?.id?.root?.message ||
                errors?.icon?.id?.message
              }
            >
              {addonsListComponent}
            </LabelErrorWrapper>
          )}

          <Input
            type="text"
            label="Add On Name"
            placeholder="Enter Add on name"
            {...register("name")}
            error={errors.name?.message}
            required
            maxLength={20}
          />

          <Textarea
            label="Description"
            placeholder="Enter Add on description"
            {...register("description")}
            error={errors.description?.message}
            required={!isEdit}
            maxLength={500}
            rows={4}
          />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <Input
              type="number"
              label="Price($)"
              leftContent={<DollarIcon className="size-3" />}
              placeholder="Enter Price"
              {...register("price")}
              error={errors.price?.message}
              required
              isPositiveOnly
              allowDecimal
              min={0}
              step={0.1}
            />

            <NumberInput
              id="maxQty"
              label="Max Quantity"
              required
              value={watch("maxQty")}
              onChange={(value) => {
                setValue("maxQty", Number(value));
              }}
              error={errors.maxQty?.message}
              placeholder="Enter QTY"
            />
          </div>
        </div>

        <button
          type="button"
          hidden
          ref={ref}
          onClick={handleSubmit(onSubmit(onSubmitAssistProps))}
        />
      </form>
    );

    if (!isEdit) {
      return formComponent;
    }

    return (
      <RenderData
        data={getAnAddonData}
        {...getAnAddOnApiState}
        expectedDataType="object"
      >
        {formComponent}
      </RenderData>
    );
  },
);

AddonForm.displayName = "AddonForm";

export default AddonForm;
