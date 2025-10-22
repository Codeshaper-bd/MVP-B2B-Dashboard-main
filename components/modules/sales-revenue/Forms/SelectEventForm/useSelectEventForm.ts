import { useForm } from "react-hook-form";

import { useGetAllEventQuery } from "@/store/api/events/events-api";

import type { IEventSelectState } from "./type";

const useSelectEventForm = () => {
  // get api data
  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    type: "past",
    status: "Completed",
  });
  const getAllEventData = getAllEventRes?.data || [];
  const selectEventFormProps = useForm<IEventSelectState>({
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  return {
    selectEventFormProps,
    getAllEventData,
    getAllEventApiState,
  };
};

export default useSelectEventForm;
