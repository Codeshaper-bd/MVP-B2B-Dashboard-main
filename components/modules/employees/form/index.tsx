"use client";

import { forwardRef } from "react";
import { Controller } from "react-hook-form";
// import PhoneInput from "react-phone-input-2";
import Select, { components } from "react-select";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import FileInputButton from "@/components/form/file-input-button";
import RenderData from "@/components/render-data";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import PasswordInput from "@/components/ui/password-input";

import useEmployeeForm from "./use-employee-form";

export interface ICreateEmployeeFormProps {
  isEdit?: boolean;
  employeeId?: TIdOrSlugOrIdentifier<"id">["id"];
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateEmployeeForm = forwardRef<
  HTMLButtonElement,
  ICreateEmployeeFormProps
>(({ isEdit, employeeId, setIsSubmitting }, ref) => {
  const {
    formProps: {
      register,
      handleSubmit,
      formState: { errors },
      control,
      setValue,
      watch,
    },
    onSubmit,
    rolesOptions,
    toastHookProps,
    getAEmployeeData,
    getAEmployeeApiState,
    getAllRolesApiState,
  } = useEmployeeForm({
    isEdit,
    employeeId,
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
      <div className="space-y-4 px-1">
        <FileInputButton
          label="Profile Picture"
          value={watch("image")}
          onChange={(value) => {
            if (
              value === null ||
              value === undefined ||
              (value instanceof File && !Array.isArray(value))
            ) {
              setValue("image", value);
            }
          }}
          error={errors.image?.message}
        />

        <div className="flex flex-col gap-4 md:flex-row md:gap-3">
          <Input
            id="firstName"
            label="First Name"
            placeholder="First Name"
            {...register("firstName")}
            error={errors?.firstName?.message}
            required
          />

          <Input
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
            required
          />
        </div>
        <LabelErrorWrapper
          required
          label="Assign Role"
          error={errors.roles?.message}
        >
          <Controller
            name="roles"
            control={control}
            render={({ field }) => (
              <Select
                components={{
                  MenuList: (props) => (
                    <>
                      {components.MenuList && (
                        <components.MenuList {...props} />
                      )}
                      <div>
                        {/* <Button
                          color="secondary"
                          type="button"
                          size="default"
                          className="mb-1 w-full rounded-[6px] border-default-200 bg-default-100 text-[16px] font-medium hover:bg-default-200"
                        >
                          <PlusIcon className="me-2 size-5" /> Create Custom
                          Role
                        </Button> */}
                      </div>
                    </>
                  ),
                }}
                menuPlacement="auto"
                options={rolesOptions}
                isMulti
                onChange={field.onChange}
                className="react-select z-[99]"
                classNamePrefix="select"
                isLoading={getAllRolesApiState?.isLoading}
                placeholder="Select roles"
                value={field.value}
                isDisabled={getAllRolesApiState?.isLoading}
              />
            )}
          />
        </LabelErrorWrapper>

        {/* <LabelErrorWrapper
          required
          label={"Phone"}
          error={errors.phone?.message}
        >
          <PhoneInput
            country={"us"}
            value={watch("phone")}
            onChange={(value) => {
              setValue("phone", value);
            }}
          />
        </LabelErrorWrapper> */}

        {/* {!isEdit && (
          <> */}
        <PasswordInput
          label="Password"
          {...register("password")}
          placeholder="Enter your password"
          error={errors?.password?.message}
        />

        <PasswordInput
          label="Confirm Password"
          {...register("confirmPassword")}
          placeholder="Re-enter your password"
          error={errors?.confirmPassword?.message}
        />
        {/* </>
        )} */}
        <Input
          id="email"
          placeholder="Enter Email"
          {...register("email")}
          label="Email"
          error={errors.email?.message}
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
      data={getAEmployeeData}
      {...getAEmployeeApiState}
      expectedDataType="object"
      isModal={true}
    >
      {formComponent}
    </RenderData>
  );
});

CreateEmployeeForm.displayName = "CreateEmployeeForm";
export default CreateEmployeeForm;
