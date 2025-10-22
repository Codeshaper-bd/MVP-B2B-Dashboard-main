import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import {
  type UseFormReturn,
  type Resolver,
  type SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { uploadOnlyRequiredImages } from "@/lib/media/upload-only-required-images";
import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";
import type { TUserType } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import type { TUploadAMediaMutation } from "@/store/api/media/media.types";
import {
  useGetAuthenticatedUserProfileQuery,
  useUpdateAuthenticatedUserProfileMutation,
} from "@/store/api/profile/profile-api";
import type {
  TUpdateAuthenticatedUserProfileMutation,
  TUserProfile,
  TUserVerifiedData,
} from "@/store/api/profile/profile.types";
import { selectAuthUserType } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { TManageProfileInfoFormData } from "./types";
import { initialState } from "./utils";
import { validationSchema } from "./validationSchema";

type TOnSubmit = (props: {
  toastHookProps: TUseToastReturnType;
  updateAuthenticatedUserProfile: TUpdateAuthenticatedUserProfileMutation;
  uploadAMedia: TUploadAMediaMutation;
  authenticatedUserProfileData: TUserProfile | TNullish;
  manageProfileInfoFormProps: UseFormReturn<TManageProfileInfoFormData>;
  isEditMode: boolean;
  localUserVerificationData: TUserVerifiedData | null;
  authUserType: TUserType | TNullish;
  setIsEditModeOpen: (props: Partial<TExternalState> | void) => () => void;
  setIsEditModeClose: (props: Partial<TExternalState> | void) => () => void;
  removeLocalUserVerificationData: () => void;
}) => SubmitHandler<TManageProfileInfoFormData>;

function useManageProfileInfoForm() {
  const authUserType = useAppSelector(selectAuthUserType);
  const {
    state: isEditMode,
    setOpen: setIsEditModeOpen,
    setClose: setIsEditModeClose,
  } = useBooleanState({ defaultValue: false });
  const {
    data: authenticatedUserProfileRes,
    ...authenticatedUserProfileApiState
  } = useGetAuthenticatedUserProfileQuery();
  const authenticatedUserProfileData = authenticatedUserProfileRes?.data;
  const [updateAuthenticatedUserProfile] =
    useUpdateAuthenticatedUserProfileMutation();
  const [uploadAMedia] = useUploadAMediaMutation();
  const toastHookProps = useToast();
  const manageProfileInfoFormProps = useForm<TManageProfileInfoFormData>({
    defaultValues: initialState,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<TManageProfileInfoFormData>,
  });

  const media = useWatch({
    control: manageProfileInfoFormProps.control,
    name: "media",
    defaultValue: initialState.media,
  });

  const phone = useWatch({
    control: manageProfileInfoFormProps.control,
    name: "phone",
    defaultValue: initialState.phone,
  });

  const dialCode = useWatch({
    control: manageProfileInfoFormProps.control,
    name: "dialCode",
    defaultValue: initialState.dialCode,
  });

  const userVerificationTokenLocalStorageProps =
    useLocalStorage<TUserVerifiedData | null>("userVerificationToken", null);
  const {
    value: localUserVerificationData,
    removeValue: removeLocalUserVerificationData,
    setValue: setLocalUserVerificationData,
  } = userVerificationTokenLocalStorageProps;

  const onSubmit: TOnSubmit = useCallback(
    ({
      toastHookProps: { toast },
      toastHookProps,
      authenticatedUserProfileData,
      localUserVerificationData,
      authUserType,
      manageProfileInfoFormProps: { reset },
      updateAuthenticatedUserProfile,
      uploadAMedia,
      removeLocalUserVerificationData,
      setIsEditModeClose,
    }) =>
      async (formData) => {
        const toastId = toast({
          title: "Updating Profile",
          description: "Please wait...",
          variant: "loading",
        });

        try {
          const { isAllExistingFiles, finalMediaList } =
            await uploadOnlyRequiredImages({
              filesData: {
                mainImage: formData.media,
                galleryImages: [],
              },
              mediaList: [authenticatedUserProfileData?.media],
              uploadAMedia,
              toastProps: toastHookProps,
              tags: ["User"],
            });
          const getUpdateProfileRes = await updateAuthenticatedUserProfile({
            body: {
              email: formData.email ? formData.email : undefined,
              firstName: formData.firstName ? formData.firstName : undefined,
              lastName: formData.lastName ? formData.lastName : undefined,
              phone: formData.phone ? formData.phone : undefined,
              password: formData.password ? formData.password : undefined,
              token: localUserVerificationData?.token,
              type: authUserType ?? undefined,
              media: !isAllExistingFiles
                ? {
                    id: finalMediaList?.[0]?.id,
                    isFeatured: true,
                  }
                : undefined,
            },
          }).unwrap();

          if (!getUpdateProfileRes?.success) {
            throw new Error(getUpdateProfileRes?.message);
          }

          reset();
          // removeLocalUserVerificationData();
          setIsEditModeClose()();
          toastId.update({
            id: toastId.id,
            title: "Profile Updated",
            description: "Profile updated successfully",
            variant: "success",
          });
        } catch (error) {
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Error",
              description: "Failed to update profile",
            }),
          });
        }
      },
    [],
  );

  // Set form data if user profile data is available in api
  useEffect(() => {
    if (
      !authenticatedUserProfileApiState?.isLoading &&
      !authenticatedUserProfileApiState?.isFetching &&
      !authenticatedUserProfileApiState?.isError &&
      !!authenticatedUserProfileData
    ) {
      const manageProfileInfoFormData: TManageProfileInfoFormData = {
        firstName: authenticatedUserProfileData?.firstName,
        lastName: authenticatedUserProfileData?.lastName,
        email: authenticatedUserProfileData?.email,
        phone: authenticatedUserProfileData?.phone,
        password: "",
        media: null,
      };

      (async () => {
        if (!authenticatedUserProfileData?.media) {
          manageProfileInfoFormProps?.reset(manageProfileInfoFormData);
          return;
        }
        manageProfileInfoFormData.media = await urlToFile({
          url: authenticatedUserProfileData?.media?.url ?? "",
          mimeType: (authenticatedUserProfileData?.media?.type ??
            "image/jpg") as TMimeType,
          filename: authenticatedUserProfileData?.media?.originalName ?? "",
          lastModified: authenticatedUserProfileData?.media?.createdAt
            ? new Date(authenticatedUserProfileData?.media?.createdAt).getTime()
            : undefined,
        });
        manageProfileInfoFormProps?.reset(manageProfileInfoFormData);
      })();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authenticatedUserProfileData,
    authenticatedUserProfileApiState?.isLoading,
    authenticatedUserProfileApiState?.isFetching,
    authenticatedUserProfileApiState?.isError,
  ]);

  const isValidTokenData =
    !!localUserVerificationData?.token &&
    !!localUserVerificationData?.verifyUserExpiresAt &&
    compareDateTimes({
      providedDateTime: localUserVerificationData?.verifyUserExpiresAt,
    })?.status === "after";

  return {
    media,
    phone,
    dialCode,
    manageProfileInfoFormProps,
    onSubmitAssistProps: {
      toastHookProps,
      authenticatedUserProfileData,
      manageProfileInfoFormProps,
      updateAuthenticatedUserProfile,
      uploadAMedia,
      isEditMode,
      setIsEditModeOpen,
      setIsEditModeClose,
      removeLocalUserVerificationData,
      localUserVerificationData,
      authUserType,
    },
    onSubmit,
    toastHookProps,
    authenticatedUserProfileData,
    authenticatedUserProfileApiState,
    isEditMode,
    setIsEditModeOpen,
    setIsEditModeClose,
    userVerificationTokenLocalStorageProps: {
      ...userVerificationTokenLocalStorageProps,
      isValidTokenData,
    },
  };
}

export default useManageProfileInfoForm;
