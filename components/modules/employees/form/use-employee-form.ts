import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";

import useGetLoggedInUser from "@/hooks/feature/useGetLoggedInUser";
import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import { handleFormValidationErrors } from "@/lib/error/handleFormValidationErrors";
import { compareFilesAndMediaList } from "@/lib/media/compare-files-and-media-list";
import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateAEmployeeMutation,
  useGetAEmployeeQuery,
  useUpdateAEmployeeMutation,
} from "@/store/api/employees/employees-api";
import type {
  TCreateEmployeeArgs,
  TEmployeeStatus,
} from "@/store/api/employees/employees.types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import { useGetAllRolesQuery } from "@/store/api/roles/roles-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { ICreateEmployeeFormProps } from "./index";
import {
  getRolesOptionsBasedOnUser,
  initialEmployeeFormValues,
  type TEmployeeForm,
} from "./utils";
import { validationSchema } from "./validator";

const useEmployeeForm = ({ isEdit, employeeId }: ICreateEmployeeFormProps) => {
  const [uploadAMedia] = useUploadAMediaMutation();
  const [createAEmployee] = useCreateAEmployeeMutation();
  const [updateAEmployee] = useUpdateAEmployeeMutation();
  const loggedInUser = useGetLoggedInUser();

  const { data: getAllRolesRes, ...getAllRolesApiState } =
    useGetAllRolesQuery();
  const getAllRolesData = getAllRolesRes?.data;

  const { data: getAEmployeeRes, ...getAEmployeeApiState } =
    useGetAEmployeeQuery(
      {
        id: employeeId,
      },
      {
        skip: !checkIsValidId(employeeId),
      },
    );
  const getAEmployeeData = getAEmployeeRes?.data;

  const { setClose } = useDialogContext();

  const formProps = useForm<TEmployeeForm>({
    defaultValues: initialEmployeeFormValues,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<TEmployeeForm>,
  });
  const toastHookProps = useToast();

  // roles data

  const rolesOptions = getRolesOptionsBasedOnUser({
    getAllRolesData,
    loggedInUser,
  });

  useEffect(() => {
    if (isEdit && getAEmployeeData) {
      formProps.setValue("isEdit", !!employeeId);

      const fetchData = async () => {
        const formData = {
          firstName: getAEmployeeData?.firstName ?? "",
          lastName: getAEmployeeData?.lastName ?? "",
          email: getAEmployeeData?.email ?? "",
          // phone: getAEmployeeData?.phone ?? "",
          image: null as File | null,
          roles: getAEmployeeData?.roles?.map((role) => ({
            label: role?.name ?? "",
            value: role?.id ?? -1,
          })),
          status: (getAEmployeeData?.status ?? "") as TEmployeeStatus,
          password: "",
          confirmPassword: "",
        };
        const profileImage = getAEmployeeData?.media;
        if (profileImage) {
          formData.image = await urlToFile({
            url: profileImage.url ?? "",
            filename: profileImage.originalName ?? undefined,
            mimeType: profileImage.type as TMimeType,
            lastModified: new Date(
              profileImage?.updatedAt ||
                profileImage?.deletedAt ||
                profileImage?.createdAt ||
                new Date(),
            ).getTime(),
          });
        }
        formProps.reset(formData);
      };
      fetchData();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAEmployeeData, isEdit, employeeId]);

  const onSubmit =
    ({
      toastHookProps,
      setIsSubmitting,
    }: {
      toastHookProps: TUseToastReturnType;
      setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    }) =>
    async (data: TEmployeeForm) => {
      const toastId = toastHookProps.toast({
        variant: "loading",
        title: isEdit ? "Updating Employee" : "Creating Employee",
        description: isEdit
          ? "Please wait while we update the employee"
          : "Please wait while we create your employee",
      });

      try {
        setIsSubmitting?.(true);
        const finalData: TCreateEmployeeArgs = {
          ...data,
          roles: data.roles.map((role) => role.value),
          media: undefined,
        };

        // compare image

        const { categorizedFiles, isAllExistingFiles } =
          compareFilesAndMediaList({
            files: [data.image],
            mediaList: [getAEmployeeData?.media],
            options: {
              checkLastModified: true,
              normalizeMimeType: true,
            },
          });

        if (!isAllExistingFiles) {
          for (const file of categorizedFiles || []) {
            if (file?.type === "new") {
              const uploadedFileRes = await uploadAMedia({
                file: file?.file,
                tags: ["Employee"],
              }).unwrap();

              if (uploadedFileRes?.data) {
                finalData.media = {
                  id: uploadedFileRes?.data?.id,
                  isFeatured: true,
                };
              }
            }
          }
        }

        if (isEdit) {
          await updateAEmployee({
            id: employeeId,
            body: {
              firstName: finalData?.firstName,
              lastName: finalData?.lastName,
              email: finalData?.email,
              // phone: finalData?.phone,
              media: finalData?.media,
              roles: finalData?.roles,
              status: finalData?.status,
              password: finalData?.password ? finalData?.password : undefined,
              confirmPassword: finalData?.confirmPassword
                ? finalData?.confirmPassword
                : undefined,
            },
          }).unwrap();
        } else {
          await createAEmployee(finalData).unwrap();
        }

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: isEdit
            ? "Employee Updated Successfully!"
            : "Employee Created Successfully!",
          description: isEdit
            ? "The employee details have been successfully updated."
            : "Congratulations! You have successfully created an employee.",
        });

        formProps.reset();
        setClose();
      } catch (error) {
        console.error("Error creating employee:", error);
        handleFormValidationErrors(error, formProps.setError);
        toastId.update({
          id: toastId.id,
          variant: "error",
          description: getApiErrorMessage(error, "An error occurred"),
        });
      } finally {
        setIsSubmitting?.(false);
      }
    };
  return {
    formProps,
    onSubmit,
    rolesOptions,
    toastHookProps,
    getAEmployeeData,
    getAEmployeeApiState,
    getAllRolesApiState,
  };
};

export default useEmployeeForm;
