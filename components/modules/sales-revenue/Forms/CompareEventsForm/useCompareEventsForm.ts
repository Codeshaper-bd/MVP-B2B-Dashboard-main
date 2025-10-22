import { yupResolver } from "@hookform/resolvers/yup";
import { type Resolver, useForm } from "react-hook-form";

import { useGetAllEventQuery } from "@/store/api/events/events-api";

import type { IEventsCompareState } from "./type";
import { initialState } from "./utils";
import { validationSchema } from "./validator";

const useCompareEventsForm = () => {
  // get api data
  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    type: "past",
  });
  const getAllEventData = getAllEventRes?.data || [];

  const compareEventsFormProps = useForm<IEventsCompareState>({
    defaultValues: initialState,
    reValidateMode: "onChange",
    mode: "onBlur",
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<IEventsCompareState>,
  });

  return {
    compareEventsFormProps,
    initialValue: initialState,
    getAllEventData,
    getAllEventApiState,
  };
};

export default useCompareEventsForm;
