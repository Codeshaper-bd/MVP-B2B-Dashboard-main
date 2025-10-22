import { useForm, type SubmitHandler } from "react-hook-form";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type {
  TFeedbackRating,
  TGetAllFeedbackArgs,
} from "@/store/api/feedback/feedback.types";

import type { IFeedbackFilterForm } from "./filter-form";
import type { IFeedbackFilterFormType } from "./utils";

const useFilterForm = ({ setClose }: IFeedbackFilterForm) => {
  const paramsUpdater =
    useManageSearchParams<Exclude<TGetAllFeedbackArgs, void>>();
  const { updateMultipleParam } = paramsUpdater;

  const formProps = useForm<IFeedbackFilterFormType>({
    defaultValues: {
      feedbackType: [],
      rating: null,
      startDate: null,
      endDate: null,
    },
  });

  const onSubmit: SubmitHandler<IFeedbackFilterFormType> = async (data) => {
    try {
      const rating = data?.rating
        ? (Number(data?.rating) as TFeedbackRating)
        : undefined;
      const startDate = data?.startDate
        ? data?.startDate.toISOString()
        : undefined;
      const endDate = data?.endDate ? data?.endDate.toISOString() : undefined;

      updateMultipleParam({
        rating,
        startDate,
        endDate,
      });
      setClose()();
    } catch (error) {
      console.error(`Filter form error: ${error}`);
    }
  };

  return {
    formProps,
    onSubmit,
    paramsUpdater,
  };
};
export default useFilterForm;
