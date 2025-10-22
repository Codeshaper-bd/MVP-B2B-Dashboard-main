import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";

import type { IFormTypes } from "./types";
import { validationSchema } from "./validation-schema";

const useChecklistForm = () => {
  const { setClose } = useDialogContext();
  const formProps = useForm<IFormTypes>({
    defaultValues: {
      taskName: "",
      variableName: "",
      responseTime: "",
      descriptions: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: IFormTypes) => {
    setClose();
  };

  return {
    formProps,
    onSubmit,
  };
};
export default useChecklistForm;
