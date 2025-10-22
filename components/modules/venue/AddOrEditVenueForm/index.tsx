"use client";

import { forwardRef } from "react";
import PhoneInput from "react-phone-input-2";

import { getAddressParts } from "@/lib/location/getAddress";
import FileInputButton from "@/components/form/file-input-button";
import RenderData from "@/components/render-data";
import AutocompleteInput from "@/components/ui/AutocompleteInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Switch } from "@/components/ui/switch";

import type { IAddOrEditVenueProps } from "./types";
import useAddOrEditVenueForm from "./useAddOrEditVenueForm";

const AddOrEditVenueForm = forwardRef<HTMLButtonElement, IAddOrEditVenueProps>(
  (props, ref) => {
    const { slug, isEditMode } = props;
    const {
      addOrEditVenueFormProps,
      handleOnSubmit,
      mainImage,
      galleryMultipleImages,
      getAVenueData,
      getAVenueApiState,
      isPrimary,
      handleSubmitAssistProps,
    } = useAddOrEditVenueForm(props);

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      setValue,
      setError,
      watch,
      reset,
      trigger,
    } = addOrEditVenueFormProps;

    const formComponent = (
      <form noValidate>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FileInputButton
              label={"Main Image"}
              value={mainImage}
              onChange={(value) => {
                if (
                  value === null ||
                  value === undefined ||
                  (value instanceof File && !Array.isArray(value))
                ) {
                  setValue("mainImage", value);
                }
              }}
              error={errors.mainImage?.message}
            />

            <FileInputButton
              label={"Gallery/Multiple Images"}
              value={galleryMultipleImages}
              multiple
              onChange={(value) => {
                if (
                  value === null ||
                  value === undefined ||
                  Array.isArray(value)
                ) {
                  setValue("galleryMultipleImages", value);
                }
              }}
              error={errors.galleryMultipleImages?.message}
            />
          </div>

          <Input
            label="Venue Name"
            required
            id="name"
            type="text"
            size={"md"}
            placeholder="Enter venue"
            {...register("name")}
            error={errors.name?.message}
          />
          <AutocompleteInput
            label="Address"
            required
            error={errors.address?.message}
            onPlaceSelected={(place: google.maps.places.PlaceResult) => {
              const {
                city,
                state,
                postalCode,
                formattedAddress,
                latitude,
                longitude,
              } = getAddressParts(place) ?? {};

              setValue("address", formattedAddress ?? "");
              setValue("city", city ?? "");
              setValue("state", state ?? "");
              setValue("postalCode", postalCode ?? "");
              setValue("latitude", latitude ?? 0);
              setValue("longitude", longitude ?? 0);
            }}
            defaultValue={getAVenueData?.address ?? ""}
            placeholder="Enter address"
            options={{ types: ["address"] }}
          />

          <Input
            label="Capacity"
            required
            type="number"
            min={0}
            step={1}
            isPositiveOnly
            size={"md"}
            placeholder="Enter capacity"
            {...register("capacity")}
            error={errors.capacity?.message}
          />

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Input
              label="City"
              required
              type="text"
              size={"md"}
              placeholder="Enter city"
              {...register("city")}
              error={errors.city?.message}
            />

            <Input
              label="State"
              required
              type="text"
              size={"md"}
              placeholder="Enter state"
              {...register("state")}
              error={errors.state?.message}
            />

            <Input
              label="Postal Code"
              required
              type="text"
              size={"md"}
              placeholder="Enter postal code"
              {...register("postalCode")}
              error={errors.postalCode?.message}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Email"
              required
              type="email"
              size={"md"}
              placeholder="Enter email"
              {...register("email")}
              error={errors.email?.message}
            />

            <LabelErrorWrapper
              label="Phone Number"
              required
              error={errors?.phone?.message || errors?.countryCode?.message}
            >
              <PhoneInput
                onChange={async (value, countryData: { dialCode: string }) => {
                  setValue("countryCode", countryData?.dialCode ?? "");
                  setValue("phone", value);
                  await trigger("phone");
                  await trigger("countryCode");
                }}
                onBlur={async () => {
                  await trigger("phone");
                  await trigger("countryCode");
                }}
                value={watch("phone")}
                country={"ca"}
                placeholder="Your Phone Number"
              />
            </LabelErrorWrapper>
          </div>

          <LabelErrorWrapper error={errors?.isPrimary?.message}>
            <div className="flex items-center gap-2">
              <Switch
                color={"success"}
                onCheckedChange={(checked) => {
                  setValue("isPrimary", checked);
                }}
                checked={isPrimary}
                id="isPrimary"
              />
              <Label htmlFor="isPrimary" className="!mb-0">
                Mark as Main Venue
              </Label>
            </div>
          </LabelErrorWrapper>
        </div>

        <button
          type="button"
          hidden
          ref={ref}
          onClick={handleSubmit(handleOnSubmit(handleSubmitAssistProps))}
        />
      </form>
    );

    if (!isEditMode) {
      return formComponent;
    }

    return (
      <RenderData
        data={getAVenueData}
        {...getAVenueApiState}
        expectedDataType="object"
      >
        {formComponent}
      </RenderData>
    );
  },
);

AddOrEditVenueForm.displayName = "AddOrEditVenueForm";

export default AddOrEditVenueForm;
