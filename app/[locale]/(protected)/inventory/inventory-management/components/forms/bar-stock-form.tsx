import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useUpdateBarInventoryItemStockMutation } from "@/store/api/inventory-item/inventory-item-api";
import type { TSingleInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import NumberInput from "@/components/ui/NumberInput";
import { useToast } from "@/components/ui/use-toast";

import type { TBarStockFormType } from "./types";
import { barStockFormSchema } from "./validator";

export interface IBarStockFormProps {
  item: TSingleInventoryItemData;
  currentStock: number;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BarStockForm = forwardRef<HTMLButtonElement, IBarStockFormProps>(
  ({ item, setIsSubmitting, currentStock }, ref) => {
    // API
    const [updateBarInventoryItemStock] =
      useUpdateBarInventoryItemStockMutation();
    // hook form
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm<TBarStockFormType>({
      defaultValues: {
        currentStock,
      },
      resolver: yupResolver(barStockFormSchema),
    });

    // toast & dialog
    const { toast } = useToast();
    const { setClose } = useDialogContext();
    // handle form submit
    const onSubmit = async (data: TBarStockFormType) => {
      setIsSubmitting?.(true);
      const toastId = toast({
        variant: "loading",
        title: "Updating Bar Stock",
        description: "Please wait while we update your bar stock",
      });
      try {
        const newStockNumber = Number(data?.currentStock);
        await updateBarInventoryItemStock({
          id: item?.id,
          body: {
            newStock: newStockNumber,
          },
        }).unwrap();

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Updated Bar Stock",
          description: "You have successfully updated your bar stock",
        });

        setClose();
        setIsSubmitting?.(false);
      } catch (error) {
        toast({
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: "Failed to Update Challenges",
            description: "Something went wrong while updating bar stock.",
          }),
        });
        setClose();
        setIsSubmitting?.(false);
      }
    };
    return (
      <div>
        <div className="mb-2 space-y-1 text-sm">
          <p>
            Category:
            <span className="ms-1 font-medium text-default-1000">
              {item?.category}
            </span>
          </p>
          <p>
            Product Name:
            <span className="ms-1 font-medium text-default-1000">
              {item?.name}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <NumberInput
            id="barStock"
            label="Bar Stock"
            size="md"
            placeholder="120"
            value={watch("currentStock")}
            onChange={(value) => {
              setValue("currentStock", Number(value));
            }}
            error={errors.currentStock?.message}
          />

          <button type="submit" hidden ref={ref} />
        </form>
      </div>
    );
  },
);

BarStockForm.displayName = "BarStockForm";
export default BarStockForm;
