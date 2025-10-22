"use client";

import { useForm } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useUpdateABarMenuMutation } from "@/store/api/bar-menu/bar-menu-api";
import type { TBarMenu } from "@/store/api/bar-menu/bar-menu.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import type { IFormInput } from "./utils";

function RenameForm({ item }: { item: TBarMenu }) {
  const { setClose } = useDialogContext();
  const { toast } = useToast();

  const [updateABarMenu] = useUpdateABarMenuMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      name: item?.name || "",
    },
  });
  const onSubmit = async (data: IFormInput) => {
    const toastId = toast({
      variant: "loading",
      title: "Updating Category Name",
      description: "Please wait while we update your category name",
    });
    try {
      const result = await updateABarMenu({
        slug: item?.slug,
        body: {
          name: data.name,
        },
      }).unwrap();

      if (!result?.success) {
        throw new Error(result?.message || "Failed to Update Category Name!");
      }

      toastId?.update({
        id: toastId.id,
        variant: "success",
        title: "Category Name Updated Successfully!",
        description: "The category name has been successfully changed",
      });
      setClose();
    } catch (error) {
      toast({
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to Update Category Name!",
          description: "Please try again later.",
        }),
      });
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="custom-scrollbar max-h-[50vh] space-y-4"
    >
      <Input
        type="text"
        placeholder="Enter Name"
        label="Name"
        {...register("name", {
          required: "Category name is required",
        })}
        error={errors.name?.message}
        rightContent={
          errors.name && <InfoIcon className="me-2 h-4 w-4 text-[#F97066]" />
        }
        size="md"
        required
      />

      <div className="grid grid-cols-2 gap-4 pt-4">
        <Button
          color="secondary"
          fullWidth
          type="button"
          onClick={setClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button color="primary" fullWidth type="submit" disabled={isSubmitting}>
          <ButtonLoadingContent
            isLoading={isSubmitting}
            actionContent="Rename"
          />
        </Button>
      </div>
    </form>
  );
}

export default RenameForm;
