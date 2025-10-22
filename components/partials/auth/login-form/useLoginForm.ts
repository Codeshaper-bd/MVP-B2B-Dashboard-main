import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { type Resolver, useForm, useWatch } from "react-hook-form";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { hasValidAccess } from "@/lib/user/checkAuth";
import { getRedirectPath } from "@/lib/user/getRedirectPath";
import { useSigninMutation } from "@/store/api/auth/auth-api";
import { useToast } from "@/components/ui/use-toast";

import { initialState, type TLoginForm } from "./utils";
import { schema } from "./validation-schema";

function useLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [signin] = useSigninMutation();

  const loginFormProps = useForm<TLoginForm>({
    resolver: yupResolver(schema) as unknown as Resolver<TLoginForm>,
    mode: "all",
    defaultValues: initialState,
  });

  const userType = useWatch({
    control: loginFormProps.control,
    name: "userType",
    defaultValue: initialState.userType,
  });

  const onSubmit = async (data: TLoginForm) => {
    const toastId = toast({
      variant: "loading",
      title: "Signing In",
      description: "Please wait while we sign you in.",
    });

    try {
      const response = await signin({
        identifier: data.emailOrPhone,
        password: data.password,
        userType: data.userType,
      }).unwrap();
      const loginData = response?.data;

      if (!hasValidAccess(loginData?.user)) {
        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Sign In Failed",
          description: getApiErrorMessage(
            undefined,
            "You don't have permission to access admin panel.",
          ),
        });
        router.replace("/en");
        return;
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Signed In",
        description: response?.message || "You have successfully signed in.",
      });
      const redirectPath = getRedirectPath(loginData?.user);
      router.replace(redirectPath);
    } catch (err) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error: err,
          title: "Sign In Failed",
          description: "An error occurred while signing you in.",
        }),
      });
    }
  };

  return {
    loginFormProps,

    userType,
    onSubmit,
  };
}

export default useLoginForm;
