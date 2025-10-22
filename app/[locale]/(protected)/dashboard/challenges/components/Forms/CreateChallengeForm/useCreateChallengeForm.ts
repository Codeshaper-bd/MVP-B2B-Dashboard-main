import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { type Resolver, useForm, useWatch } from "react-hook-form";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateAChallengeMutation,
  useGetAChallengeQuery,
  useUpdateAChallengeMutation,
} from "@/store/api/challenges/challenges-api";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { usePathname, useRouter } from "@/components/navigation";
import { useToast } from "@/components/ui/use-toast";

import type { TCreateChallengeFormProps } from ".";
import { type IChallengeFormData } from "./types";
import {
  getChallengeApiDataToFormData,
  getTypeOfChallengeOptions,
  initialState,
} from "./utils";
import { validationSchema } from "./validator";

const useCreateChallengeForm = (props: TCreateChallengeFormProps) => {
  const { data: getAChallengeRes, ...getAChallengeApiState } =
    useGetAChallengeQuery(
      { slug: props?.mode === "server-edit" ? props?.editItemSlug : null },
      {
        skip: !checkIsValidId(
          props?.mode === "server-edit" ? props?.editItemSlug : null,
          { type: "string" },
        ),
      },
    );
  const getAChallengeData = getAChallengeRes?.data;

  const [createChallenge] = useCreateAChallengeMutation();
  const [updateAChallenge] = useUpdateAChallengeMutation();
  const dialogHookProps = useDialogContext();
  const toastHookProps = useToast();
  const pathNameHookProps = usePathname();
  const routerHookProps = useRouter();
  const createChallengeFormProps = useForm<IChallengeFormData>({
    defaultValues: initialState,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<IChallengeFormData>,
  });
  const typeOfChallengeOptions = useMemo(() => {
    if (
      (props?.mode === "local-create" || props?.mode === "local-edit") &&
      props?.isProductMode
    ) {
      return getTypeOfChallengeOptions("PURCHASE");
    }

    return getTypeOfChallengeOptions();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.mode, (props as { isProductMode?: boolean })?.isProductMode]);

  const dateRange = useWatch({
    control: createChallengeFormProps.control,
    name: "dateRange",
    defaultValue: undefined,
  });
  // createChallengeFormProps.watch("dateRange");
  const typeOfChallengeValue = useWatch({
    control: createChallengeFormProps.control,
    name: "typeOfChallenge",
    defaultValue: undefined,
  })?.value;

  // The effect below is responsible for auto filling values for the form when the mode is server-edit
  useEffect(
    () => {
      if (
        props?.mode === "server-edit" &&
        !!getAChallengeData &&
        !!(props?.mode === "server-edit" && props?.editItemSlug) &&
        getAChallengeApiState?.isSuccess
      ) {
        /**
       |--------------------------------------------------
       | numberOfFriends: target_quantity
       | checkInTime: checkInTime
       | item: product
       | amount: target_amount
       | purchaseQuantity: target_quantity
       |--------------------------------------------------
       */

        getChallengeApiDataToFormData({
          getAChallengeData,
          callBack: (data) => createChallengeFormProps.reset(data),
        });
      }
    },

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      getAChallengeData,
      props?.mode,
      // eslint-disable-next-line react-compiler/react-compiler
      // eslint-disable-next-line react-hooks/exhaustive-deps
      (props as { editItemSlug: TIdOrSlugOrIdentifier<"slug">["slug"] })
        ?.editItemSlug,
      getAChallengeApiState?.isSuccess,
    ],
  );

  /* The effect below is responsible for setting the default values for the form when the mode is local-create and product mode, so that it can pass the validation schema. */
  useEffect(() => {
    if (props?.mode === "local-create" && props?.isProductMode) {
      createChallengeFormProps.setValue(
        "typeOfChallenge",
        getTypeOfChallengeOptions("PURCHASE")?.[0],
      );
      createChallengeFormProps.setValue("item", {
        id: -100,
        title: "Manually Add Product",
        description: "Manually Add Product",
        selectedFoodId: -100,
        category: "Alcoholic",
        currency: "$",
        price: "0",
        currentStock: 0,
        foodVolume: "0",
        image: "",
        stock: 0,
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.mode, (props as { isProductMode?: boolean })?.isProductMode]);

  /* The effect below is responsible for setting the initial values for the form when the mode is local-create */
  useEffect(() => {
    if (props?.mode === "local-edit" && props?.editItemData) {
      const newEditItemFormData = { ...props?.editItemData };

      if (props?.isProductMode) {
        newEditItemFormData.typeOfChallenge =
          getTypeOfChallengeOptions("PURCHASE")?.[0];
        newEditItemFormData.item = newEditItemFormData.item || {
          id: -100,
          title: "Manually Add Product",
          description: "Manually Add Product",
          selectedFoodId: -100,
          category: "Alcoholic",
          currency: "$",
          price: "0",
          currentStock: 0,
          foodVolume: "0",
          image: "",
          stock: 0,
        };
      } else {
        newEditItemFormData.typeOfChallenge = getTypeOfChallengeOptions()?.find(
          (option) =>
            !!option?.value &&
            !!props?.editItemData?.typeOfChallenge?.value &&
            option?.value === props?.editItemData?.typeOfChallenge?.value,
        );
      }

      createChallengeFormProps.reset(newEditItemFormData);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.mode,
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (props as { isProductMode?: boolean })?.isProductMode,
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (
      props as {
        editItemData: IChallengeFormData | TNullish;
      }
    )?.editItemData,
  ]);

  return {
    createChallenge,
    updateAChallenge,
    createChallengeFormProps,
    dialogHookProps,
    toastHookProps,
    dateRange,
    typeOfChallengeValue,
    getAChallengeData,
    getAChallengeApiState,
    typeOfChallengeOptions,
    handleOnSubmitAssistProps: {
      createChallenge,
      updateAChallenge,
      reset: createChallengeFormProps.reset,
      dialogHookProps,
      toastHookProps,
      pathNameHookProps,
      routerHookProps,
      ...props,
    },
  };
};

export default useCreateChallengeForm;
