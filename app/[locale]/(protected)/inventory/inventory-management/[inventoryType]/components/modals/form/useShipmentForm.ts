import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TGroupInventoryItemData,
  TSingleInventoryItemData,
} from "@/store/api/inventory-item/inventory-item.types";
import { useCreateShipmentMutation } from "@/store/api/shipment/shipment-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { TCreateShipmentFormInput } from "./types";
import { initialFormState, type TSoldByFilter } from "./utils";
import { shipmentFormSchema } from "./validator";

const useShipmentForm = () => {
  const { setClose } = useDialogContext();
  // api
  const [createShipment] = useCreateShipmentMutation();
  const toastHookProps = useToast();

  const [filterBy, setFilterBy] = useState<TSoldByFilter>("All");
  // product state
  const [selectedValue, setSelectedValue] = useState<
    TGroupInventoryItemData | TNullish
  >(undefined);

  const [selectedChildItem, setSelectedChildItem] = useState<
    TSingleInventoryItemData | TNullish
  >(undefined);

  const soldBy = useMemo(() => selectedValue?.soldBy, [selectedValue]);

  // form props
  const formProps = useForm<TCreateShipmentFormInput>({
    defaultValues: initialFormState,
    resolver: yupResolver(
      shipmentFormSchema,
    ) as unknown as Resolver<TCreateShipmentFormInput>,
    context: { soldBy },
    mode: "onChange",
  });
  // Set soldBy in form when selectedValue changes
  useEffect(() => {
    if (selectedValue?.soldBy) {
      formProps.setValue("soldBy", selectedValue.soldBy);
    }
  }, [selectedValue?.soldBy, formProps]);

  const shipment = useWatch({
    control: formProps.control,
    name: "shipments",
    defaultValue: initialFormState?.shipments,
  });
  const unitReceived = shipment?.reduce(
    (acc, curr) => acc + curr.unitReceived,
    0,
  );

  const casesReceived = shipment?.reduce(
    (acc, curr) => acc + curr.casesReceived,
    0,
  );

  // api data
  const currentStock = convertToNumber({
    value: selectedChildItem?.currentStock,
    digit: 2,
    fallback: 0,
  });

  const unitPerCases = convertToNumber({
    value: selectedChildItem?.unitPerCase,
    digit: 2,
    fallback: 0,
  });

  const currentStockInCases =
    unitPerCases > 0 ? currentStock / unitPerCases : 0;
  const newStockInCases =
    casesReceived > 0 ? currentStockInCases + casesReceived : 0;
  const calculateNewStock = casesReceived * unitPerCases;
  const newStockInUnits =
    calculateNewStock > 0 ? currentStock + calculateNewStock : 0;

  const currentStockInUnits = currentStock;

  // counter state

  // volume new stock
  const volumeNewStock = useMemo(
    () => currentStock + unitReceived,
    [currentStock, unitReceived],
  );

  // soldBy Unit

  const onSubmit =
    ({
      toastHookProps,
      setIsDisabled,
      setIsSubmitting,
    }: {
      toastHookProps: TUseToastReturnType;
      setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
      setIsDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
    }) =>
    async (data: TCreateShipmentFormInput) => {
      const toastId = toastHookProps.toast({
        variant: "loading",
        title: "Creating Shipment",
        description: "Please wait while we create your shipment.",
      });

      try {
        setIsSubmitting?.(true);
        setIsDisabled?.(true);

        if (data?.soldBy === "VOLUME") {
          await createShipment(
            data?.shipments?.map((shipment) => ({
              // id: shipment?.selectedChildItemId,
              id: selectedChildItem?.id,
              unitReceived: shipment.unitReceived,
              price: shipment.price,
            })),
          ).unwrap();
        } else {
          await createShipment(
            data?.shipments?.map((shipment) => ({
              // id: shipment?.selectedChildItemId,
              id: selectedChildItem?.id,
              casesReceived: shipment.casesReceived,
              price: shipment.price,
            })),
          ).unwrap();
        }
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Shipment Added Successfully",
          description: "The stock has been successfully adjusted.",
        });
        setClose?.();
        setIsSubmitting?.(false);
        setIsDisabled?.(false);
      } catch (error) {
        console.error("🚀 ~ create shipment api error:", error);
        toastId.update({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: "Shipment Failed",
            description: "An error occurred while creating the shipment.",
          }),
        });
        setIsSubmitting?.(false);
        setIsDisabled?.(false);
      }
    };
  return {
    formProps,
    onSubmit,
    toastHookProps,
    filterBy,
    soldBy,
    setFilterBy,
    selectedValue,
    setSelectedValue,
    selectedChildItem,
    setSelectedChildItem,
    // form values
    currentStockInUnits,
    newStockInCases,
    currentStock,
    unitPerCases,
    currentStockInCases,
    newStockInUnits,
    volumeValues: {
      volumeNewStock,
    },
  };
};

export default useShipmentForm;
