import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, type Resolver } from "react-hook-form";

import { useFormProgress } from "@/hooks/useFormProgress";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { usePromoterRegisterMutation } from "@/store/api/auth/auth-api";
import type { TPromoterRegisterArgs } from "@/store/api/auth/auth.types";
import { useRouter } from "@/components/navigation";
import { useToast } from "@/components/ui/use-toast";

import type { IPromoterRegisterForm } from "./types";
import { initialPromoterFormValues } from "./utils";
import { promoterRegisterValidationSchema } from "./validation-schema";

export const usePromoterRegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [promoterRegister, { isLoading }] = usePromoterRegisterMutation();
  // get params from url
  const { getAllParamValue } = useManageSearchParams<
    TPromoterRegisterArgs & { code: string }
  >();
  const { phone: PhoneParam, code: codeParam } = getAllParamValue();

  // form props
  const formProps = useForm<IPromoterRegisterForm>({
    defaultValues: initialPromoterFormValues,
    resolver: yupResolver(
      promoterRegisterValidationSchema,
    ) as unknown as Resolver<IPromoterRegisterForm>,
    mode: "onChange",
  });

  const phone = useWatch({
    control: formProps.control,
    name: "phone",
    defaultValue: PhoneParam,
  });
  const code = useWatch({
    control: formProps.control,
    name: "invitationCode",
    defaultValue: codeParam,
  });
  const profilePicture = useWatch({
    control: formProps.control,
    name: "profilePicture",
  });

  // Use the reusable form progress hook
  const { progress } = useFormProgress({
    fields: [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      // "profilePicture",
    ],
    control: formProps.control,
    errors: formProps.formState.errors,
  });

  // handle submit
  const onSubmit = async (data: IPromoterRegisterForm) => {
    const toastId = toast({
      variant: "loading",
      title: "Registering Promoter",
      description: "Please wait while we register you as a promoter.",
    });

    try {
      const formData = new FormData();
      formData.append("email", data?.email);
      formData.append("firstName", data?.firstName);
      formData.append("lastName", data?.lastName);
      formData.append("password", data?.password);
      formData.append("invitationCode", code);
      formData.append("phone", phone?.toString());

      if (data?.profilePicture) {
        formData.append("avatar", data.profilePicture);
      }
      await promoterRegister(formData).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Promoter Registered",
        description: "You have successfully registered as a promoter.",
      });
      router.push("/en");
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Register Failed",
          description: "An error occurred while registering you as a promoter.",
        }),
      });
    }
  };

  return {
    formProps,
    watchValues: {
      phone,
      code,
      profilePicture,
    },
    onSubmit,
    isLoading,
    progress,
  };
};
