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
import type { TSigninData } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import {
  useGetAuthenticatedUserOrganizationDetailsQuery,
  useUpdateOrganizationMutation,
} from "@/store/api/organization/organization-api";
import type {
  TAuthenticatedUserOrganizationDetails,
  TUpdateOrganizationDetailsData,
  TUpdateOrganizationMutation,
} from "@/store/api/organization/organization.types";
import type { TUserVerifiedData } from "@/store/api/profile/profile.types";
import { selectAuth } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { TManageOrganizationProfileFormData } from "./types";
import { initialState } from "./utils";
import { validationSchema } from "./validationSchema";

type TOnSubmit = (props: {
  toastHookProps: TUseToastReturnType;
  updateOrganization: TUpdateOrganizationMutation;
  authenticatedUserOrganizationDetailsData:
    | TAuthenticatedUserOrganizationDetails
    | TNullish;
  manageProfileInfoFormProps: UseFormReturn<TManageOrganizationProfileFormData>;
  isEditMode: boolean;
  localUserVerificationData: TUserVerifiedData | null;
  authInfo: TSigninData | TNullish;
  setIsEditModeOpen: (props: Partial<TExternalState> | void) => () => void;
  setIsEditModeClose: (props: Partial<TExternalState> | void) => () => void;
  removeLocalUserVerificationData: () => void;
}) => SubmitHandler<TManageOrganizationProfileFormData>;

function useManageOrganizationProfileForm() {
  const { authInfo } = useAppSelector(selectAuth);
  const {
    state: isEditMode,
    setOpen: setIsEditModeOpen,
    setClose: setIsEditModeClose,
  } = useBooleanState({ defaultValue: false });
  const {
    data: authenticatedUserOrganizationDetailsRes,
    ...authenticatedUserOrganizationDetailsApiState
  } = useGetAuthenticatedUserOrganizationDetailsQuery();
  const authenticatedUserOrganizationDetailsData =
    authenticatedUserOrganizationDetailsRes?.data;
  const [updateOrganization] = useUpdateOrganizationMutation();
  const [uploadAMedia] = useUploadAMediaMutation();
  const toastHookProps = useToast();
  const manageProfileInfoFormProps =
    useForm<TManageOrganizationProfileFormData>({
      defaultValues: initialState,
      resolver: yupResolver(
        validationSchema,
      ) as unknown as Resolver<TManageOrganizationProfileFormData>,
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
  const organizationLogo = useWatch({
    control: manageProfileInfoFormProps.control,
    name: "organizationLogo",
    defaultValue: initialState.organizationLogo,
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
      authenticatedUserOrganizationDetailsData,
      localUserVerificationData,
      manageProfileInfoFormProps: { reset },
      updateOrganization,
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
          const finalData: TUpdateOrganizationDetailsData = {
            name: formData.name?.trim(),
            phone: formData.phone,
            address: formData.address?.trim(),
            description: formData.description?.trim(),
            email: formData.email?.trim(),
            websiteUrl: formData.websiteUrl?.trim(),
            token: localUserVerificationData?.token as string,
            subscriptionPlan: formData.subscriptionPlan,
            isTaxEnabled: formData.isTaxEnabled,
            taxId: formData.taxId,
            taxName: formData.taxName,
            taxRate: Number(formData.taxRate),
          };

          const { isAllExistingFiles, finalMediaList } =
            await uploadOnlyRequiredImages({
              filesData: {
                mainImage: formData?.organizationLogo?.[0],
                galleryImages: [],
              },
              mediaList: [authenticatedUserOrganizationDetailsData?.media],
              uploadAMedia,
              toastProps: toastHookProps,
              tags: ["Organization", "club", "logo"],
            });
          const updateOrganizationRes = await updateOrganization({
            body: {
              address: finalData.address,
              description: finalData.description,
              email: finalData.email,
              name: finalData.name,
              phone: finalData.phone,
              websiteUrl: finalData.websiteUrl,
              subscriptionPlan: finalData.subscriptionPlan,
              media: !isAllExistingFiles
                ? {
                    id: finalMediaList?.[0]?.id,
                    isFeatured: true,
                  }
                : undefined,
              token: localUserVerificationData?.token,
              isTaxEnabled: finalData.isTaxEnabled,
              taxId: finalData.taxId,
              taxName: finalData.taxName,
              taxRate: finalData.taxRate,
            },
          }).unwrap();

          if (!updateOrganizationRes?.success) {
            throw new Error(updateOrganizationRes?.message);
          }

          reset();
          // removeLocalUserVerificationData();
          setIsEditModeClose()();
          toastId.update({
            id: toastId.id,
            title: "Organization Updated",
            description: "Organization updated successfully",
            variant: "success",
          });
        } catch (error) {
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Organization Update Failed",
              description: "Failed to update organization",
            }),
          });
        }
      },
    [uploadAMedia, toastHookProps],
  );

  // Set form data if user profile data is available in api
  useEffect(() => {
    if (
      !authenticatedUserOrganizationDetailsApiState?.isLoading &&
      !authenticatedUserOrganizationDetailsApiState?.isError &&
      !authenticatedUserOrganizationDetailsApiState?.isFetching &&
      !!authenticatedUserOrganizationDetailsData
    ) {
      const fetchData = async () => {
        const manageProfileInfoFormData: TManageOrganizationProfileFormData = {
          name: authenticatedUserOrganizationDetailsData?.name,
          email: authenticatedUserOrganizationDetailsData?.email,
          phone: authenticatedUserOrganizationDetailsData?.phone,
          description: authenticatedUserOrganizationDetailsData?.description,
          address: authenticatedUserOrganizationDetailsData?.address,
          websiteUrl: authenticatedUserOrganizationDetailsData?.websiteUrl,
          totalEmployees:
            authenticatedUserOrganizationDetailsData?.totalEmployee,
          subscriptionPlan:
            authenticatedUserOrganizationDetailsData?.subscriptionPlan,
          dialCode: "",
          code: authenticatedUserOrganizationDetailsData?.code,
          isTaxEnabled:
            authenticatedUserOrganizationDetailsData?.isTaxEnabled ?? false,
          taxId: authenticatedUserOrganizationDetailsData?.taxId,
          taxName: authenticatedUserOrganizationDetailsData?.taxName,
          taxRate: authenticatedUserOrganizationDetailsData?.taxRate,
        };
        const profileImage = authenticatedUserOrganizationDetailsData?.media;
        if (profileImage) {
          const image = await urlToFile({
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
          if (image) {
            manageProfileInfoFormData.organizationLogo = [image];
          }
        }

        manageProfileInfoFormProps?.reset(manageProfileInfoFormData);
      };

      fetchData();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authenticatedUserOrganizationDetailsData,
    authenticatedUserOrganizationDetailsApiState?.isLoading,
    authenticatedUserOrganizationDetailsApiState?.isFetching,
    authenticatedUserOrganizationDetailsApiState?.isError,
  ]);

  const isValidTokenData =
    !!localUserVerificationData?.token &&
    !!localUserVerificationData?.verifyUserExpiresAt &&
    compareDateTimes({
      providedDateTime: localUserVerificationData?.verifyUserExpiresAt,
    })?.status === "after";

  return {
    phone,
    dialCode,
    organizationLogo,
    manageProfileInfoFormProps,
    onSubmitAssistProps: {
      toastHookProps,
      authenticatedUserOrganizationDetailsData,
      manageProfileInfoFormProps,
      isEditMode,
      setIsEditModeOpen,
      setIsEditModeClose,
      removeLocalUserVerificationData,
      localUserVerificationData,
      authInfo,
      updateOrganization,
    },
    onSubmit,
    toastHookProps,
    authenticatedUserOrganizationDetailsData,
    authenticatedUserOrganizationDetailsApiState,
    isEditMode,
    setIsEditModeOpen,
    setIsEditModeClose,
    userVerificationTokenLocalStorageProps: {
      ...userVerificationTokenLocalStorageProps,
      isValidTokenData,
    },
  };
}

export default useManageOrganizationProfileForm;
